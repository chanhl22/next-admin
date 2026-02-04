// ============================================================================
// 메뉴 목록 조회
// ============================================================================

/**
 * 메뉴 목록 조회 응답
 */
export interface MenuResponse {
  /** 운영자 Web 메뉴 일련번호 */
  operWebMenuSn: number;
  /** 메뉴명 */
  menuName: string;
  /** 표시 레벨 */
  displayLevel: number;
  /** 상위 메뉴 일련번호 */
  upperMenuSn: number;
  /** 상위 메뉴명 */
  upperMenuName: string;
  /** 상위 표시 레벨 */
  upperDisplayLevel: number;
}

// ============================================================================
// 운영자 메뉴별 권한 목록 조회
// ============================================================================

/**
 * 운영자 메뉴별 권한 목록 조회 응답
 */
export interface MenuSettingsResponse {
  /** 역할 목록 */
  roles: RoleInfo[];
  /** 메뉴 트리 목록 */
  menus: MenuTreeInfo[];
  /** 권한 목록 */
  permissions: PermissionInfo[];
}

/**
 * 역할 정보
 */
export interface RoleInfo {
  /** 역할 ID */
  roleId: string;
  /** 권한 레벨 */
  roleLevel: number;
  /** 운영자 권한 구분코드명 */
  operatorRoleSeCdNm: string;
}

/**
 * 메뉴 트리 정보
 */
export interface MenuTreeInfo {
  /** 운영자 Web 메뉴 일련번호 */
  operWebMenuSn: number;
  /** 상위 메뉴 일련번호 */
  upperMenuSn: number;
  /** 메뉴명 */
  menuName: string;
  /** 표시 레벨 */
  displayLevel: number;
  /** 하위 메뉴 목록 (menus[i]와 동일한 구조 가지며, 하위 메뉴가 없는 경우 빈 배열([]) 반환) */
  children: MenuTreeInfo[];
}

/**
 * 권한 정보
 */
export interface PermissionInfo {
  /** 운영자 Web 메뉴 일련번호 */
  operWebMenuSn: number;
  /** 역할 ID */
  roleId: string;
  /** 권한 보유 여부 */
  allowed: boolean;
}

// ============================================================================
// 운영자 메뉴별 권한 저장
// ============================================================================

/**
 * 운영자 메뉴별 권한 저장 요청
 */
export interface SaveMenuSettingsRequest {
  /** 권한 변경 목록 */
  changes: OperatorRoleSeCd[];
}

/**
 * 운영자 권한 구분 코드
 */
export interface OperatorRoleSeCd {
  /** 운영자 권한 구분코드 */
  roleId: string;
  /** 운영자 Web 메뉴 일련번호 */
  operWebMenuSn: number;
  /** 권한 보유 여부 */
  allowed: boolean;
}