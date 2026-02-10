# JWT 인증 시스템 완벽 가이드

#### 목차

1. [기본 개념](#1-기본-개념)
2. [HttpOnly 쿠키 기반 인증](#2-httponly-쿠키-기반-인증)
3. [Spring Boot 백엔드 구현](#3-spring-boot-백엔드-구현)
4. [React 프론트엔드 구현](#4-react-프론트엔드-구현)
5. [Refresh Token 관리 전략](#5-refresh-token-관리-전략)
6. [활동 기반 세션 관리](#6-활동-기반-세션-관리)
7. [보안 고려사항](#7-보안-고려사항)
8. [실무 권장 사항](#8-실무-권장-사항)


## 1. 기본 개념

### 1.1 토큰 종류

#### Access Token

- **용도**: API 요청 인증
- **만료 시간**: 짧음 (15분 ~ 1시간)
- **저장 위치**: HttpOnly 쿠키
- **특징**: 자주 갱신됨

#### Refresh Token

- **용도**: Access Token 재발급
- **만료 시간**: 김 (7일 ~ 30일)
- **저장 위치**: HttpOnly 쿠키
- **특징**: 일회용 또는 재사용

### 1.2 HttpOnly 쿠키를 사용하는 이유

```
✅ XSS 공격 방지 (JavaScript로 접근 불가)
✅ 자동으로 HTTP 요청에 포함
✅ Secure 플래그로 HTTPS에서만 전송
✅ SameSite 속성으로 CSRF 방지`
```

## 2. HttpOnly 쿠키 기반 인증

### 2.1 쿠키 자동 포함 메커니즘

브라우저는 다음 조건을 만족하면 쿠키를 자동으로 요청에 포함합니다:

```
1. 도메인 매칭
2. Path 매칭
3. Secure 플래그 (HTTPS)
4. withCredentials: true 설정 (Cross-Origin)`
```

### 2.2 서버 응답 예시

```http
HTTP/1.1 200 OK
Set-Cookie: accessToken=eyJhbGc...; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=1800
Set-Cookie: refreshToken=eyJhbGc...; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`
```

### 2.3 이후 요청 예시

```http
GET /api/users HTTP/1.1
Host: localhost:8080
Cookie: accessToken=eyJhbGc...; refreshToken=eyJhbGc...`
```

**브라우저가 자동으로 쿠키를 추가합니다!**

# 3. Spring Boot 백엔드 구현
## 3.1 의존성 설정
   gradledependencies {
   implementation 'org.springframework.boot:spring-boot-starter-web'
   implementation 'org.springframework.boot:spring-boot-starter-security'
   implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
   implementation 'org.springframework.boot:spring-boot-starter-data-redis'
   implementation 'io.jsonwebtoken:jjwt-api:0.11.5'
   runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.11.5'
   runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.11.5'
   }
   
## 3.2 JWT 토큰 제공자
   java@Component
   public class JwtTokenProvider {

   @Value("${jwt.secret}")
   private String secretKey;

   @Value("${jwt.access-token-validity}")
   private long accessTokenValidity; // 30분

   @Value("${jwt.refresh-token-validity}")
   private long refreshTokenValidity; // 7일

   private Key getSigningKey() {
   byte[] keyBytes = Decoders.BASE64.decode(secretKey);
   return Keys.hmacShaKeyFor(keyBytes);
   }

   // Access Token 생성
   public String generateAccessToken(String username, List<String> roles) {
   Date now = new Date();
   Date validity = new Date(now.getTime() + accessTokenValidity);

        return Jwts.builder()
                .setSubject(username)
                .claim("roles", roles)
                .claim("type", "access")
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
   }

   // Refresh Token 생성
   public String generateRefreshToken(String username) {
   Date now = new Date();
   Date validity = new Date(now.getTime() + refreshTokenValidity);

        return Jwts.builder()
                .setSubject(username)
                .claim("type", "refresh")
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
   }

   // 토큰 검증
   public boolean validateToken(String token) {
   try {
   Jwts.parserBuilder()
   .setSigningKey(getSigningKey())
   .build()
   .parseClaimsJws(token);
   return true;
   } catch (JwtException | IllegalArgumentException e) {
   return false;
   }
   }

   // 사용자명 추출
   public String getUsername(String token) {
   return Jwts.parserBuilder()
   .setSigningKey(getSigningKey())
   .build()
   .parseClaimsJws(token)
   .getBody()
   .getSubject();
   }
   }

## 3.3 쿠키 유틸리티
   java@Component
   public class CookieUtil {

   // HttpOnly 쿠키 생성
   public ResponseCookie createCookie(String name, String value, long maxAge) {
   return ResponseCookie.from(name, value)
   .httpOnly(true)
   .secure(true) // HTTPS에서만 전송
   .path("/")
   .maxAge(maxAge)
   .sameSite("Strict") // CSRF 보호
   .build();
   }

   // 쿠키 삭제
   public ResponseCookie deleteCookie(String name) {
   return ResponseCookie.from(name, "")
   .httpOnly(true)
   .secure(true)
   .path("/")
   .maxAge(0)
   .build();
   }

   // 쿠키 값 가져오기
   public String getCookieValue(HttpServletRequest request, String name) {
   Cookie[] cookies = request.getCookies();
   if (cookies != null) {
   for (Cookie cookie : cookies) {
   if (cookie.getName().equals(name)) {
   return cookie.getValue();
   }
   }
   }
   return null;
   }
   }


## 3.4 인증 컨트롤러
   java@RestController
   @RequestMapping("/api/auth")
   @RequiredArgsConstructor
   public class AuthController {

   private final AuthenticationManager authenticationManager;
   private final JwtTokenProvider jwtTokenProvider;
   private final CookieUtil cookieUtil;
   private final RefreshTokenService refreshTokenService;
   private final UserActivityService activityService;

   // 로그인
   @PostMapping("/login")
   public ResponseEntity<?> login(
   @RequestBody LoginRequest loginRequest,
   HttpServletResponse response) {

        try {
            // 사용자 인증
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
                )
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());
            
            // Access Token 생성 및 쿠키 설정
            String accessToken = jwtTokenProvider.generateAccessToken(
                userDetails.getUsername(), roles);
            ResponseCookie accessTokenCookie = cookieUtil.createCookie(
                "accessToken", accessToken, 30 * 60);
            response.addHeader(HttpHeaders.SET_COOKIE, 
                accessTokenCookie.toString());
            
            // Refresh Token 생성 및 쿠키 설정
            String refreshToken = jwtTokenProvider.generateRefreshToken(
                userDetails.getUsername());
            ResponseCookie refreshTokenCookie = cookieUtil.createCookie(
                "refreshToken", refreshToken, 7 * 24 * 60 * 60);
            response.addHeader(HttpHeaders.SET_COOKIE, 
                refreshTokenCookie.toString());
            
            // Refresh Token DB 저장
            refreshTokenService.saveRefreshToken(
                userDetails.getUsername(), refreshToken);
            
            // 활동 시간 기록
            activityService.recordActivity(userDetails.getUsername());
            
            return ResponseEntity.ok(new AuthResponse(
                "로그인 성공",
                userDetails.getUsername(),
                roles
            ));
            
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("잘못된 인증 정보"));
        }
   }

   // Access Token 갱신
   @PostMapping("/refresh")
   public ResponseEntity<?> refresh(
   HttpServletRequest request,
   HttpServletResponse response) {

        String refreshToken = cookieUtil.getCookieValue(request, "refreshToken");
        
        if (refreshToken == null || !jwtTokenProvider.validateToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("유효하지 않은 Refresh Token"));
        }
        
        String username = jwtTokenProvider.getUsername(refreshToken);
        
        // 마지막 활동이 30분 이내인지 체크
        if (!activityService.isActivityValid(username)) {
            activityService.clearActivity(username);
            refreshTokenService.deleteRefreshToken(username);
            
            response.addHeader(HttpHeaders.SET_COOKIE, 
                cookieUtil.deleteCookie("accessToken").toString());
            response.addHeader(HttpHeaders.SET_COOKIE, 
                cookieUtil.deleteCookie("refreshToken").toString());
            
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("30분 동안 활동이 없어 세션이 만료되었습니다"));
        }
        
        // Refresh Token 검증 및 갱신
        TokenPair newTokens = refreshTokenService.refreshTokens(
            refreshToken, username);
        
        // 새 Access Token 쿠키 설정
        response.addHeader(HttpHeaders.SET_COOKIE,
            cookieUtil.createCookie(
                "accessToken", 
                newTokens.getAccessToken(), 
                30 * 60
            ).toString());
        
        // 새 Refresh Token 쿠키 설정
        response.addHeader(HttpHeaders.SET_COOKIE,
            cookieUtil.createCookie(
                "refreshToken", 
                newTokens.getRefreshToken(), 
                7 * 24 * 60 * 60
            ).toString());
        
        // 활동 시간 갱신
        activityService.recordActivity(username);
        
        return ResponseEntity.ok(new AuthResponse("토큰 갱신 성공", username, null));
   }

   // 로그아웃
   @PostMapping("/logout")
   public ResponseEntity<?> logout(
   HttpServletRequest request,
   HttpServletResponse response) {

        String refreshToken = cookieUtil.getCookieValue(request, "refreshToken");
        if (refreshToken != null) {
            String username = jwtTokenProvider.getUsername(refreshToken);
            refreshTokenService.deleteRefreshToken(username);
            activityService.clearActivity(username);
        }
        
        response.addHeader(HttpHeaders.SET_COOKIE, 
            cookieUtil.deleteCookie("accessToken").toString());
        response.addHeader(HttpHeaders.SET_COOKIE, 
            cookieUtil.deleteCookie("refreshToken").toString());
        
        SecurityContextHolder.clearContext();
        
        return ResponseEntity.ok(new MessageResponse("로그아웃 성공"));
   }

   // 현재 사용자 정보
   @GetMapping("/me")
   public ResponseEntity<?> getCurrentUser(
   @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("인증되지 않은 사용자"));
        }
        
        return ResponseEntity.ok(new UserInfoResponse(
            userDetails.getUsername(),
            userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList())
        ));
   }
   }

## 3.5 JWT 인증 필터
   java@Component
   @RequiredArgsConstructor
   public class JwtAuthenticationFilter extends OncePerRequestFilter {

   private final JwtTokenProvider jwtTokenProvider;
   private final CookieUtil cookieUtil;
   private final UserDetailsService userDetailsService;
   private final UserActivityService activityService;

   @Override
   protected void doFilterInternal(
   HttpServletRequest request,
   HttpServletResponse response,
   FilterChain filterChain) throws ServletException, IOException {

        try {
            // 쿠키에서 Access Token 가져오기
            String token = cookieUtil.getCookieValue(request, "accessToken");
            
            if (token != null && jwtTokenProvider.validateToken(token)) {
                String username = jwtTokenProvider.getUsername(token);
                
                // 모든 요청마다 사용자 활동 기록
                activityService.recordActivity(username);
                
                UserDetails userDetails = userDetailsService
                    .loadUserByUsername(username);
                
                UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                    );
                
                authentication.setDetails(
                    new WebAuthenticationDetailsSource()
                        .buildDetails(request)
                );
                
                SecurityContextHolder.getContext()
                    .setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("인증 설정 실패", e);
        }
        
        filterChain.doFilter(request, response);
   }
   }

## 3.6 Spring Security 설정
   java@Configuration
   @EnableWebSecurity
   @RequiredArgsConstructor
   public class SecurityConfig {

   private final JwtAuthenticationFilter jwtAuthenticationFilter;

   @Bean
   public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
   http
   .csrf(csrf -> csrf.disable())
   .cors(cors -> cors.configurationSource(corsConfigurationSource()))
   .sessionManagement(session ->
   session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
   .authorizeHttpRequests(auth -> auth
   .requestMatchers("/api/auth/login", "/api/auth/refresh").permitAll()
   .requestMatchers("/api/admin/**").hasRole("ADMIN")
   .anyRequest().authenticated()
   )
   .addFilterBefore(jwtAuthenticationFilter,
   UsernamePasswordAuthenticationFilter.class);

        return http.build();
   }

   @Bean
   public CorsConfigurationSource corsConfigurationSource() {
   CorsConfiguration configuration = new CorsConfiguration();
   configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
   configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
   configuration.setAllowedHeaders(Arrays.asList("*"));
   configuration.setAllowCredentials(true); // 쿠키 전송 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
   }

   @Bean
   public AuthenticationManager authenticationManager(
   AuthenticationConfiguration authConfig) throws Exception {
   return authConfig.getAuthenticationManager();
   }
   }

# 4. React 프론트엔드 구현
## 4.1 Axios 인스턴스 설정
   javascript// api/axios.js
   import axios from 'axios';

const api = axios.create({
baseURL: 'http://localhost:8080/api',
withCredentials: true, // 쿠키 전송 허용
headers: {
'Content-Type': 'application/json',
},
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
failedQueue.forEach(prom => {
if (error) {
prom.reject(error);
} else {
prom.resolve();
}
});
failedQueue = [];
};

// 응답 인터셉터
api.interceptors.response.use(
(response) => response,
async (error) => {
const originalRequest = error.config;

    // Access Token 만료 시 (401 에러)
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // Refresh 요청 자체가 실패한 경우
      if (originalRequest.url === '/auth/refresh') {
        isRefreshing = false;
        processQueue(error);
        
        const errorMessage = error.response?.data?.message;
        if (errorMessage?.includes('세션이 만료')) {
          alert('30분 동안 활동이 없어 자동 로그아웃되었습니다.');
        }
        
        window.location.href = '/login';
        return Promise.reject(error);
      }
      
      // 이미 refresh 중인 경우 큐에 추가
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return api(originalRequest);
        }).catch((err) => {
          return Promise.reject(err);
        });
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        await api.post('/auth/refresh');
        
        isRefreshing = false;
        processQueue(null);
        
        // 원래 요청 재시도
        return api(originalRequest);
        
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError);
        
        const errorMessage = refreshError.response?.data?.message;
        if (errorMessage?.includes('세션이 만료')) {
          alert('30분 동안 활동이 없어 자동 로그아웃되었습니다.');
        }
        
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
}
);

export default api;

## 4.2 인증 Context
javascript// context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

// 페이지 로드 시 사용자 정보 확인
useEffect(() => {
checkAuth();
}, []);

const checkAuth = async () => {
try {
const response = await api.get('/auth/me');
setUser(response.data);
} catch (error) {
setUser(null);
} finally {
setLoading(false);
}
};

const login = async (username, password) => {
try {
const response = await api.post('/auth/login', {
username,
password,
});
setUser(response.data);
return { success: true };
} catch (error) {
return {
success: false,
error: error.response?.data?.message || '로그인 실패',
};
}
};

const logout = async () => {
try {
await api.post('/auth/logout');
setUser(null);
} catch (error) {
console.error('로그아웃 실패', error);
}
};

const value = {
user,
loading,
login,
logout,
checkAuth,
};

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
const context = useContext(AuthContext);
if (!context) {
throw new Error('useAuth는 AuthProvider 내에서 사용해야 합니다');
}
return context;
};

## 4.3 로그인 컴포넌트
javascript// components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

const { login } = useAuth();
const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();
setError('');
setLoading(true);

    const result = await login(username, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
};

return (
<div className="login-container">
<h2>로그인</h2>
<form onSubmit={handleSubmit}>
<div>
<label>사용자명:</label>
<input
type="text"
value={username}
onChange={(e) => setUsername(e.target.value)}
required
/>
</div>
<div>
<label>비밀번호:</label>
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
</div>
{error && <div className="error">{error}</div>}
<button type="submit" disabled={loading}>
{loading ? '로그인 중...' : '로그인'}
</button>
</form>
</div>
);
};

export default Login;

## 4.4 보호된 라우트
javascript// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
const { user, loading } = useAuth();

if (loading) {
return <div>로딩 중...</div>;
}

if (!user) {
return <Navigate to="/login" replace />;
}

return children;
};

export default ProtectedRoute;

## 4.5 App 구조
javascript// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
return (
<AuthProvider>
<BrowserRouter>
<Routes>
<Route path="/login" element={<Login />} />
<Route
path="/dashboard"
element={
<ProtectedRoute>
<Dashboard />
</ProtectedRoute>
}
/>
</Routes>
</BrowserRouter>
</AuthProvider>
);
}

export default App;

# 5. Refresh Token 관리 전략
## 5.1 Non-Rotation vs Rotation
   Non-Rotation (재사용)
   java@PostMapping("/refresh")
   public ResponseEntity<?> refresh(String refreshToken) {

   if (!jwtTokenProvider.validateToken(refreshToken)) {
   return error("유효하지 않은 토큰");
   }

   // Access Token만 새로 발급
   String newAccessToken = jwtTokenProvider.generateAccessToken(username);

   // Refresh Token은 그대로 유지
   return ok(newAccessToken);
   }
   특징:

같은 Refresh Token을 계속 사용
구현 간단
탈취 감지 불가능 ❌

Rotation (일회용)
java@Entity
public class RefreshToken {
@Id
private Long id;
private String username;
private String token;
private LocalDateTime absoluteExpiryDate;  // 절대 만료 시간
private boolean used = false;              // 사용 여부
private LocalDateTime usedAt;
private Long previousTokenId;              // 이전 토큰 (체인)
}

@Transactional
public TokenPair refreshTokens(String oldRefreshToken) {

    RefreshToken oldToken = repository.findByToken(oldRefreshToken)
        .orElseThrow(() -> new InvalidTokenException("유효하지 않은 토큰"));
    
    // 재사용 감지
    if (oldToken.isUsed()) {
        log.error("🚨 토큰 재사용 감지! 사용자: {}", oldToken.getUsername());
        repository.deleteByUsername(oldToken.getUsername());
        throw new SecurityException("토큰 재사용 감지");
    }
    
    // 절대 만료 시간 체크
    if (oldToken.getAbsoluteExpiryDate().isBefore(LocalDateTime.now())) {
        repository.deleteByUsername(oldToken.getUsername());
        throw new TokenExpiredException("최대 세션 기간 만료");
    }
    
    // 기존 토큰 폐기
    oldToken.setUsed(true);
    oldToken.setUsedAt(LocalDateTime.now());
    repository.save(oldToken);
    
    // 새 토큰 쌍 생성
    String newAccessToken = jwtTokenProvider.generateAccessToken(username);
    String newRefreshToken = jwtTokenProvider.generateRefreshToken(username);
    
    // 새 Refresh Token 저장 (같은 절대 만료 시간)
    RefreshToken newToken = RefreshToken.builder()
        .username(username)
        .token(newRefreshToken)
        .absoluteExpiryDate(oldToken.getAbsoluteExpiryDate())  // 유지
        .used(false)
        .previousTokenId(oldToken.getId())
        .build();
    
    repository.save(newToken);
    
    return new TokenPair(newAccessToken, newRefreshToken);
}
특징:

한 번 사용하면 폐기
Access Token + Refresh Token 둘 다 재발급
탈취 감지 가능 ✅
절대 만료 시간으로 무한 로그인 방지

## 5.2 저장 위치별 전략
Redis (추천) ⭐⭐⭐
java@Service
@RequiredArgsConstructor
public class RefreshTokenRedisService {

    private final RedisTemplate<String, String> redisTemplate;
    private static final String REFRESH_TOKEN_PREFIX = "refresh:";
    private static final long REFRESH_TOKEN_VALIDITY = 7 * 24 * 60 * 60;
    
    public void saveRefreshToken(String username, String token) {
        String key = REFRESH_TOKEN_PREFIX + username;
        
        RefreshTokenInfo info = RefreshTokenInfo.builder()
            .token(token)
            .createdAt(System.currentTimeMillis())
            .build();
        
        redisTemplate.opsForValue().set(
            key, 
            new ObjectMapper().writeValueAsString(info),
            REFRESH_TOKEN_VALIDITY, 
            TimeUnit.SECONDS
        );
    }
    
    public boolean validateRefreshToken(String username, String token) {
        String key = REFRESH_TOKEN_PREFIX + username;
        String storedTokenJson = redisTemplate.opsForValue().get(key);
        
        if (storedTokenJson == null) {
            return false;
        }
        
        try {
            RefreshTokenInfo info = new ObjectMapper()
                .readValue(storedTokenJson, RefreshTokenInfo.class);
            return info.getToken().equals(token);
        } catch (Exception e) {
            return false;
        }
    }
}
장점:

빠른 조회 속도
자동 만료 (TTL)
수평 확장 가능

단점:

Redis 인프라 필요
Redis 장애 시 문제

DB (PostgreSQL, MySQL)
java@Service
@RequiredArgsConstructor
public class RefreshTokenDBService {

    private final RefreshTokenRepository repository;
    
    public void saveRefreshToken(String username, String token) {
        // 기존 토큰 삭제 (단일 세션)
        repository.deleteByUsername(username);
        
        RefreshToken refreshToken = RefreshToken.builder()
            .username(username)
            .token(token)
            .expiryDate(LocalDateTime.now().plusDays(7))
            .build();
        
        repository.save(refreshToken);
    }
    
    @Scheduled(cron = "0 0 2 * * ?") // 매일 새벽 2시
    public void cleanupExpiredTokens() {
        repository.deleteByExpiryDateBefore(LocalDateTime.now());
    }
}
장점:

별도 인프라 불필요
영구 저장
감사 로그 활용

단점:

느린 속도
DB 부하 증가

## 5.3 다중 디바이스 지원
java@Entity
@Table(name = "refresh_tokens")
public class RefreshToken {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

    private String username;
    private String token;
    private String deviceId;      // 디바이스 식별자
    private String deviceName;    // "iPhone 13", "Chrome on Windows"
    private String ipAddress;
    private LocalDateTime expiryDate;
}

@Service
public class MultiDeviceRefreshTokenService {

    // 디바이스별로 토큰 저장
    public void saveRefreshToken(String username, String token, 
                                  String deviceId, String deviceName) {
        // 같은 디바이스의 기존 토큰만 삭제
        repository.deleteByUsernameAndDeviceId(username, deviceId);
        
        RefreshToken refreshToken = RefreshToken.builder()
            .username(username)
            .token(token)
            .deviceId(deviceId)
            .deviceName(deviceName)
            .expiryDate(LocalDateTime.now().plusDays(7))
            .build();
        
        repository.save(refreshToken);
    }
    
    // 특정 디바이스만 로그아웃
    public void deleteRefreshToken(String username, String deviceId) {
        repository.deleteByUsernameAndDeviceId(username, deviceId);
    }
    
    // 모든 디바이스 로그아웃
    public void deleteAllRefreshTokens(String username) {
        repository.deleteByUsername(username);
    }
}

# 6. 활동 기반 세션 관리
   6.1 30분 무활동 감지
   Redis 구현 (추천)
   java@Service
   @RequiredArgsConstructor
   public class UserActivityService {

   private final RedisTemplate<String, String> redisTemplate;

   private static final String ACTIVITY_KEY_PREFIX = "activity:";
   private static final long ACTIVITY_TIMEOUT_MINUTES = 30;

   // 사용자 활동 기록
   public void recordActivity(String username) {
   String key = ACTIVITY_KEY_PREFIX + username;
   String timestamp = String.valueOf(System.currentTimeMillis());

        // 30분 TTL로 자동 삭제
        redisTemplate.opsForValue().set(
            key, 
            timestamp, 
            ACTIVITY_TIMEOUT_MINUTES, 
            TimeUnit.MINUTES
        );
   }

   // 활동이 유효한지 확인 (30분 이내)
   public boolean isActivityValid(String username) {
   String key = ACTIVITY_KEY_PREFIX + username;
   String timestamp = redisTemplate.opsForValue().get(key);

        if (timestamp == null) {
            return false; // TTL 만료
        }
        
        long lastActivityTime = Long.parseLong(timestamp);
        long currentTime = System.currentTimeMillis();
        long timeDiff = currentTime - lastActivityTime;
        long thirtyMinutesInMillis = ACTIVITY_TIMEOUT_MINUTES * 60 * 1000;
        
        return timeDiff <= thirtyMinutesInMillis;
   }

   // 활동 정보 삭제
   public void clearActivity(String username) {
   String key = ACTIVITY_KEY_PREFIX + username;
   redisTemplate.delete(key);
   }
   }
   Caffeine Cache 구현 (단일 서버)
   java@Configuration
   public class CacheConfig {

   @Bean
   public Cache<String, Long> activityCache() {
   return Caffeine.newBuilder()
   .expireAfterWrite(30, TimeUnit.MINUTES)
   .maximumSize(10_000)
   .build();
   }
   }

@Service
@RequiredArgsConstructor
public class CaffeineActivityService {

    private final Cache<String, Long> activityCache;
    
    public void recordActivity(String username) {
        activityCache.put(username, System.currentTimeMillis());
    }
    
    public boolean isActivityValid(String username) {
        Long lastActivity = activityCache.getIfPresent(username);
        return lastActivity != null;
    }
}

## 6.2 JWT 필터에서 활동 기록
java@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final UserActivityService activityService;
    
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        
        String token = getCookieValue(request, "accessToken");
        
        if (token != null && jwtTokenProvider.validateToken(token)) {
            String username = jwtTokenProvider.getUsername(token);
            
            // ⭐ 모든 요청마다 활동 기록
            activityService.recordActivity(username);
            
            // 인증 처리...
        }
        
        filterChain.doFilter(request, response);
    }
}

## 6.3 Refresh 시 활동 체크
java@PostMapping("/refresh")
public ResponseEntity<?> refresh(HttpServletRequest request) {

    String refreshToken = getCookieValue(request, "refreshToken");
    String username = jwtTokenProvider.getUsername(refreshToken);
    
    // ⭐ 30분 무활동 체크
    if (!activityService.isActivityValid(username)) {
        activityService.clearActivity(username);
        refreshTokenService.deleteRefreshToken(username);
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(new ErrorResponse("30분 동안 활동이 없어 세션이 만료되었습니다"));
    }
    
    // 토큰 갱신
    TokenPair newTokens = refreshTokenService.refreshTokens(refreshToken, username);
    
    // 활동 시간 갱신
    activityService.recordActivity(username);
    
    return ResponseEntity.ok(newTokens);
}

## 6.4 시나리오별 플로우

#### 시나리오 1: 계속 작업하는 경우
00:00 - 로그인
Access Token: 만료 00:30
Refresh Token: 만료 7일 후
마지막 활동: 00:00

00:29 - API 요청
마지막 활동: 00:29 (갱신)

00:31 - API 요청
Access Token 만료 → 401 에러
→ Refresh 시도
→ 활동 체크: 00:29 (2분 전) ✅
→ 새 Access Token 발급
→ 원래 요청 재시도 성공
→ 마지막 활동: 00:31 (갱신)

01:00 - API 요청
마지막 활동: 00:31 (29분 전) ✅
→ 계속 작업 가능


#### 시나리오 2: 29분까지 작업 후 1시간 방치
00:00 - 로그인
마지막 활동: 00:00

00:29 - 마지막 API 요청
마지막 활동: 00:29

00:59 - (30분 TTL 만료)
Redis에서 활동 기록 자동 삭제

01:30 - 사용자 복귀, API 요청
Access Token 만료 → 401 에러
→ Refresh 시도
→ 활동 체크: null (Redis에 없음) ❌
→ "30분 동안 활동이 없어 세션이 만료되었습니다"
→ 로그인 페이지로 이동

# 7. 보안 고려사항
## 7.1 쿠키 보안 설정
   javaResponseCookie cookie = ResponseCookie.from("refreshToken", token)
   .httpOnly(true)      // JavaScript 접근 차단
   .secure(true)        // HTTPS에서만 전송
   .sameSite("Strict")  // CSRF 방지
   .path("/")
   .maxAge(7 * 24 * 60 * 60)
   .build();
   7.2 Refresh Token 탈취 대응
   문제

Refresh Token이 탈취되면 장기간 사용 가능
Access Token보다 훨씬 위험

대응책
1. Rotation (재사용 감지)
   javaif (token.isUsed()) {
   // 🚨 탈취 감지!
   log.error("토큰 재사용 감지! 사용자: {}, IP: {}",
   token.getUsername(), getClientIP());

   // 모든 세션 강제 종료
   deleteAllSessions(username);

   // 사용자에게 알림
   notificationService.sendSecurityAlert(username,
   "토큰 재사용이 감지되었습니다. 비밀번호를 변경해주세요.");

   throw new SecurityException("보안 위협 감지");
   }
2. IP 주소 검증
   javaif (!token.getIpAddress().equals(request.getRemoteAddr())) {
   log.warn("IP 불일치 감지: {} vs {}",
   token.getIpAddress(), request.getRemoteAddr());
   requireReauthentication();
   }
3. Device Fingerprint
   javaString deviceFingerprint = generateFingerprint(
   request.getHeader("User-Agent"),
   request.getHeader("Accept-Language")
   );

if (!token.getDeviceFingerprint().equals(deviceFingerprint)) {
requireReauthentication();
}

## 7.3 왜 클라이언트 시간 체크는 안 되는가?
문제점
1. 클라이언트는 조작 가능
   javascript// 공격자가 개발자 도구에서:
   lastActivity = Date.now(); // 언제든지 조작 가능!
2. 브라우저 탭 슬립
   javascript// setInterval이 백그라운드에서 느려지거나 멈춤
   setInterval(() => {
   checkExpiry(); // 제대로 작동 안 함
   }, 60000);
3. 불필요한 갱신
   javascript// 사용자가 활동 안 해도 계속 갱신
   setInterval(() => {
   refresh(); // 서버 부하 증가
   }, 25 * 60 * 1000);
   올바른 방식: 401 기반 자동 갱신 (추천)
   javascriptapi.interceptors.response.use(
   response => response,
   async error => {
   if (error.response?.status === 401 && !error.config._retry) {
   error.config._retry = true;

            // 필요할 때만 자동 갱신
            await api.post('/auth/refresh');
            return api(error.config);
        }
        return Promise.reject(error);
   }
   );


**장점:**
- 서버 시간 기준으로 정확
- 필요할 때만 갱신 (효율적)
- 브라우저 슬립 문제 없음

---

# 8. 실무 권장 사항

## 8.1 프로젝트 규모별 추천

#### 소규모 (개인 프로젝트, MVP)
```
Non-Rotation + Caffeine Cache + 활동 기반
- 구현 간단
- 별도 인프라 불필요
- 빠른 개발
```

#### 중규모 (일반 웹 서비스)
```
Rotation + Redis + 절대 만료 (7~30일) ⭐
- 보안: 탈취 감지
- 성능: Redis 캐싱
- 세션 제한: 명확한 기한
```

#### 대규모 (엔터프라이즈, 금융)
```
Rotation + Redis + DB + 절대 만료 + 활동 기반
- 다층 보안
- Redis: 빠른 검증
- DB: 영구 저장, 감사 로그
- 강력한 세션 관리
```

## 8.2 최종 추천 조합
```
✅ HttpOnly 쿠키 (보안)
✅ Rotation (탈취 감지)
✅ 절대 만료 시간 (무한 로그인 방지)
✅ 활동 기반 제한 (30분 무활동 차단)
✅ 401 기반 자동 갱신 (UX)
✅ Redis (성능)
```

## 8.3 전체 인증 플로우
```
1. 로그인
   ├─ Access Token (30분)
   ├─ Refresh Token (7일, 절대 만료)
   └─ 활동 시간 기록

2. API 요청
   ├─ Access Token 검증
   ├─ 활동 시간 갱신
   └─ 요청 처리

3. Access Token 만료 (401)
   ├─ Axios 인터셉터 동작
   ├─ /refresh 호출
   ├─ 활동 체크 (30분 이내?)
   │   ├─ Yes → 토큰 갱신
   │   └─ No → 로그아웃
   ├─ 절대 만료 체크 (7일 이내?)
   │   ├─ Yes → 토큰 갱신
   │   └─ No → 로그아웃
   ├─ 재사용 체크
   │   ├─ No → 토큰 갱신
   │   └─ Yes → 보안 위협 (모든 세션 종료)
   └─ 원래 요청 재시도

4. 로그아웃
   ├─ Refresh Token 삭제
   ├─ 활동 기록 삭제
   ├─ 쿠키 삭제
   └─ SecurityContext 초기화
   8.4 application.yml 설정
   yamlspring:
   redis:
   host: localhost
   port: 6379

datasource:
url: jdbc:postgresql://localhost:5432/mydb
username: user
password: pass

jwt:
secret: your-secret-key-here-make-it-long-and-secure-at-least-256-bits
access-token-validity: 1800000  # 30분 (밀리초)
refresh-token-validity: 604800000  # 7일 (밀리초)
```

---

## 요약

### 핵심 개념

1. **HttpOnly 쿠키**: JavaScript 접근 차단, 자동 전송
2. **Access Token**: 짧은 만료 (30분), 자주 갱신
3. **Refresh Token**: 긴 만료 (7일), 일회용 (Rotation)
4. **활동 기반**: 30분 무활동 시 세션 종료
5. **401 자동 갱신**: 서버 시간 기준, 끊김 없는 UX

### 보안 체크리스트

- [x] HttpOnly + Secure + SameSite 쿠키
- [x] Rotation으로 재사용 감지
- [x] 절대 만료 시간으로 무한 로그인 방지
- [x] 활동 기반으로 무활동 차단
- [x] 서버에서만 활동 시간 기록 (Redis)
- [x] 401 기반 자동 갱신 (클라이언트 시간 체크 ❌)
- [x] CORS allowCredentials 설정

### 가장 중요한 것
```
클라이언트는 신뢰할 수 없다
→ 모든 보안 로직은 서버에서 처리
→ Redis로 활동 시간 관리
→ 401 에러로 자동 갱신
→ Rotation으로 탈취 감지