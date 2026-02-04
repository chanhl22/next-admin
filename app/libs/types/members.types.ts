// ============================================================================
// 회원 목록 조회
// ============================================================================

/**
 * 회원 목록 조회 요청
 */
export interface MembersRequest {
  /** 그룹 일련번호 */
  groupSn?: number;
  /** 루틴 진행 상태 구분코드 */
  routineProgressStatusSeCd?: string;
  /** 검색구분 */
  searchTp: string;
  /** 검색어 */
  searchWd?: string;
  /** 정렬 컬럼 */
  dtOrderCol?: string;
  /** 정렬 순서 (ASC, DESC) */
  dtOrderDir?: string;
  /** 페이지 번호 (default 1) */
  page?: number;
  /** 페이지 크기 (default 10) */
  pageSize?: number;
}

/**
 * 회원 목록 조회 응답
 */
export interface MembersResponse {
  /** 번호 */
  rowNum: number;
  /** 사용자 ID */
  userId: string;
  /** 루틴 진행 상태 구분코드명 */
  routineProgressStatusSeCdNm: string;
  /** 사용자 명 */
  userName: string;
  /** 사용자 전화번호 */
  userTel: string;
  /** 사용자 출생년도 */
  userBirthYear: string;
  /** 성별 구분코드명 (10101301 남성, 10101302 여성, 10101303 기타) */
  genderSeCdNm: string;
  /** 그룹명 목록 */
  groupNames: string[];
  /** 그룹수 */
  groupCount: number;
  /** 루틴 응답률 */
  routineRate: string;
  /** 마지막 루틴 수행 일시 (YYYY-MM-DD HH:mm) */
  lastRoutineProgressDateTime: string;
  /** 건강정보 수집수 */
  healthInfoCollectCount: number;
  /** 건강 정보 수집 목록 */
  healthInfoCollects: HealthInfoCollect;
}

// ============================================================================
// 회원 정보 조회
// ============================================================================

/**
 * 회원 정보 조회 응답
 */
export interface MemberResponse {
  /** 사용자 ID */
  userId: string;
  /** 사용자 명 */
  userName: string;
  /** 사용자 전화번호 */
  userTel: string;
  /** 성별 구분코드명 (10101301 남성, 10101302 여성, 10101303 기타) */
  genderSeCdNm: string;
  /** 사용자 생년월일 (19991231) */
  userBirth: string;
  /** 사용자 나이 */
  userAge: string;
  /** 사용자 프로필 이미지 URL */
  userProfileImgUrl: string;
  /** 그룹명 목록 */
  groupNames: string[];
  /** 건강 정보 수집 목록 */
  healthInfoCollects: HealthInfoCollect;
}

// ============================================================================
// 오늘 루틴 진행 상황 조회
// ============================================================================

/**
 * 오늘 루틴 진행 상황 조회 응답
 */
export interface TodayRoutineProgressResponse {
  /** 전체 루틴수 */
  totalCount: string;
  /** 전체 완료 루틴수 */
  completedCount: string;
  /** 필수 루틴수 */
  requireCount: string;
  /** 필수 루틴 완료수 */
  requiredCompletedCount: string;
  /** 권장 루틴수 */
  recommendedCount: string;
  /** 권장 루틴 완료수 */
  recommendedCompletedCount: string;
}

// ============================================================================
// 루틴 수행 추이 그래프 조회
// ============================================================================

/**
 * 루틴 수행 추이 그래프 조회 요청
 */
export interface RoutineProgressTrendGraphRequest {
  /** 기간 구분코드 */
  periodSeCd: string;
}

/**
 * 루틴 수행 추이 그래프 조회 응답
 */
export interface RoutineProgressTrendGraphResponse {
  /** 데이터 */
  data: RoutineProgressTrendData[];
}

/**
 * 루틴 수행 추이 데이터
 */
export interface RoutineProgressTrendData {
  /** 날짜 */
  date: string;
  /** 루틴율 */
  routineRate: number;
}

// ============================================================================
// 루틴 수행 목록 조회
// ============================================================================

/**
 * 루틴 수행 목록 조회 요청
 */
export interface RoutineProgressRequest {
  /** 정렬 컬럼 */
  dtOrderCol?: string;
  /** 정렬 순서 (ASC, DESC) */
  dtOrderDir?: string;
  /** 페이지 번호 */
  page?: number;
  /** 페이지 크기 */
  size?: number;
}

/**
 * 루틴 수행 목록 조회 응답
 */
export interface RoutineProgressResponse {
  /** 날짜 */
  date: string;
  /** 전체 루틴 수 */
  totalCount: string;
  /** 전체 완료 루틴수 */
  completedCount: string;
  /** 필수 루틴 수 */
  requireCount: string;
  /** 권장 루틴 수 */
  recommendedCount: string;
}

// ============================================================================
// 루틴 수행 상세 조회
// ============================================================================

/**
 * 루틴 수행 상세 조회 요청
 */
export interface RoutineProgressDetailRequest {
  /** 시작 날짜 */
  startDate: string;
  /** 종료 날짜 */
  endDate: string;
  /** 필수여부 */
  필수여부?: string;
  /** 루틴 카테고리 구분코드 */
  routineCategorySeCd?: string;
  /** 검색구분 */
  searchTp?: string;
  /** 검색어 */
  searchWd?: string;
  /** 정렬 컬럼 */
  dtOrderCol?: string;
  /** 정렬 순서 (ASC, DESC) */
  dtOrderDir?: string;
  /** 페이지 번호 */
  page?: number;
  /** 페이지 크기 */
  size?: number;
}

/**
 * 루틴 수행 상세 조회 응답
 */
export interface RoutineProgressDetailResponse {
  /** 날짜 */
  date: string;
  /** 필수여부 */
  필수여부: string;
  /** 루틴 카테고리 구분코드명 */
  routinCategorySeCdNm: string;
  /** 내용 */
  content: string;
  /** 수행여부 */
  수행여부: string;
}

// ============================================================================
// 일일 피드백 목록 조회
// ============================================================================

/**
 * 일일 피드백 목록 조회 응답
 */
export interface DailyFeedbacksResponse {
  /** 날짜 */
  date: string;
  /** 피드백 수 */
  totalCount: string;
  /** 응답 여부 */
  completed: string;
}

// ============================================================================
// 일일 피드백 상세 조회
// ============================================================================

/**
 * 일일 피드백 상세 조회 요청
 */
export interface DailyFeedbacksDetailRequest {
  /** 시작 날짜 */
  startDate: string;
  /** 종료 날짜 */
  endDate: string;
  /** 정렬 컬럼 */
  dtOrderCol?: string;
  /** 정렬 순서 (ASC, DESC) */
  dtOrderDir?: string;
  /** 페이지 번호 */
  page?: number;
  /** 페이지 크기 */
  size?: number;
}

/**
 * 일일 피드백 상세 조회 응답
 */
export interface DailyFeedbacksDetailResponse {
  /** 날짜 */
  date: string;
  /** 내용 */
  content: string;
}

// ============================================================================
// 섭취 칼로리 그래프 조회
// ============================================================================

/**
 * 섭취 칼로리 그래프 조회 요청
 */
export interface IntakeCalorieGraphRequest {
  /** 기간 구분코드 */
  periodSeCd: string;
}

/**
 * 섭취 칼로리 그래프 조회 응답
 */
export interface IntakeCalorieGraphResponse {
  /** 일일 권장 칼로리 */
  dailyCalorie: string;
  /** 데이터 */
  data: IntakeCalorieData[];
}

/**
 * 섭취 칼로리 데이터
 */
export interface IntakeCalorieData {
  /** 날짜 */
  date: string;
  /** 칼로리 */
  calorie: number;
}

// ============================================================================
// 식사 분석 내역 목록 조회
// ============================================================================

/**
 * 식사 분석 내역 목록 조회 요청
 */
export interface MealAnalysisHistorysRequest {
  /** 식사 구분코드 */
  mealSeCd?: string;
  /** 섭취 칼로리 상태 구분코드 */
  intakeCalorieStatusSeCd?: string;
  /** 검색구분 */
  searchTp?: string;
  /** 검색어 */
  searchWd?: string;
  /** 정렬 컬럼 */
  dtOrderCol?: string;
  /** 정렬 순서 (ASC, DESC) */
  dtOrderDir?: string;
  /** 페이지 번호 */
  page?: number;
  /** 페이지 크기 */
  size?: number;
}

// ============================================================================
// 식사 분석 상세 조회
// ============================================================================

/**
 * 식사 분석 상세 조회 응답
 */
export interface MealAnalysisHistoryResponse {
  /** 식사 칼로리 */
  eatCalories: number;
  /** 목표 일일 칼로리 */
  dailyCalories: number;
  /** 음식명 목록 (ex) ["잼", "라면"] */
  foodNames: string[];
  /** 이미지 Base64 */
  imageBase64: string;
  /** 이미지 너비 */
  imageWidth: number;
  /** 이미지 높이 */
  imageHeight: number;
  /** 식사 타입명 (ex) "아침", "점심", "저녁", "간식" */
  mealTypeNm: string;
  /** 측정 일시 (ex) yyyy.mm.dd 월요일 오후 5:20 */
  measuredDt: string;
  /** SiBC 분석 결과 데이터 (응답실패로 인한 분석 결과 데이터 이외 데이터는 반환안드릅 함) */
  analysisResult: AnalysisResult;
}

/**
 * 분석 결과
 */
export interface AnalysisResult {
  /** 한줄요약 */
  oneLineSummary: string;
  /** AI 식사분석 */
  aiAnalysis: string;
  /** 다음식사팁 (ex) ["다음에는 건강하게 드세요", "미네랄 위주로 드세요"] */
  nextMealTips: string[];
}

// ============================================================================
// 메모 이력 목록 조회
// ============================================================================

/**
 * 메모 이력 목록 조회 요청
 */
export interface MemosRequest {
  /** 대상 사용자 ID */
  targetUserId: string;
}

/**
 * 메모 이력 목록 조회 응답
 */
export interface MemosResponse {
  /** 내용 */
  memoCn: string;
  /** 등록일시 */
  registDt: string;
  /** 등록자명 */
  registerNm: string;
}

// ============================================================================
// 메모 등록
// ============================================================================

/**
 * 메모 등록 요청
 */
export interface CreateMemoRequest {
  /** 대상 사용자 ID */
  targetUserId: string;
  /** 내용 */
  memoCn: string;
}

// ============================================================================
// 공통
// ============================================================================

/**
 * 건강 정보 수집
 */
export interface HealthInfoCollect {
  /** 항목 */
  item: string;
  /** 최근수집일 */
  recentCollectDt: string;
}