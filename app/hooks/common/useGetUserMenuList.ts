import { useGetQuery } from '@/app/api/utility/api';

export const useGetUserMenuList = (param: any = {}) => {

  // 🔥 개발 모드에서 Mock 데이터 사용
  const USE_MOCK = true; // true면 모킹, false면 실제 API

  if (USE_MOCK) {
    console.log('🎭 [Mock] 메뉴 데이터 사용 중');
    return {
      data: MOCK_MENU_DATA,
      isSuccess: true,
      isLoading: false,
      isError: false,
      error: null,
    };
  }

  return useGetQuery(
    ['getUserMenuList', param],
    '/adminMenu/getUserMenuList',
    param,
    {
      staleTime: 1000 * 60 * 10,   // 10분
      cacheTime: 1000 * 60 * 21,   // 21분
    }
  );
};

// 🔥 Mock 데이터 - PubAppMenu의 makeMenuNode() 로직에 맞게 구성
const MOCK_MENU_DATA = [
  // ============================================
  // 1depth: 대시보드 (pmenuNo: 0, showYn: Y)
  // ============================================
  {
    menuNo: 1000,
    menuName: "대시보드",
    url: null,
    pmenuNo: 0,
    dmenuNo: 0,
    showYn: "Y",
    iconName: null,
  },
  // 2depth: 대시보드 홈
  {
    menuNo: 1001,
    menuName: "대시보드 홈",
    url: "/dashboard",
    pmenuNo: 1000,  // 부모: 대시보드
    dmenuNo: 0,
    showYn: "Y",
    iconName: "pi pi-home",
  },

  // ============================================
  // 1depth: 사용자 관리
  // ============================================
  {
    menuNo: 2000,
    menuName: "사용자 관리",
    url: null,
    pmenuNo: 0,
    dmenuNo: 0,
    showYn: "Y",
    iconName: null,
  },
  // 2depth: 사용자 목록
  {
    menuNo: 2011,
    menuName: "사용자 목록",
    url: "/userList",
    pmenuNo: 2000,
    dmenuNo: 0,
    showYn: "Y",
    iconName: "pi pi-users",
  },
  // 종속 메뉴: 사용자 상세
  {
    menuNo: 2012,
    menuName: "사용자 상세",
    url: "/userDetail",
    pmenuNo: 2000,
    dmenuNo: 2011, // 사용자 목록에 종속
    showYn: "N",
    iconName: null,
  },
  // 종속 메뉴: 사용자 등록
  {
    menuNo: 2013,
    menuName: "사용자 등록",
    url: "/userRegister",
    pmenuNo: 2000,
    dmenuNo: 2011, // 사용자 목록에 종속
    showYn: "N",
    iconName: null,
  },

  // ============================================
  // 1depth: 운영자 관리
  // ============================================
  {
    menuNo: 3000,
    menuName: "운영자 관리",
    url: null,
    pmenuNo: 0,
    dmenuNo: 0,
    showYn: "Y",
    iconName: null,
  },
  // 2depth: 운영자 계정
  {
    menuNo: 3011,
    menuName: "운영자 계정",
    url: "/adminList",
    pmenuNo: 3000,
    dmenuNo: 0,
    showYn: "Y",
    iconName: "pi pi-id-card",
  },
  // 종속 메뉴: 운영자 상세
  {
    menuNo: 3012,
    menuName: "운영자 상세",
    url: "/adminDetail",
    pmenuNo: 3000,
    dmenuNo: 3011, // 운영자 계정에 종속
    showYn: "N",
    iconName: null,
  },
  // 종속 메뉴: 운영자 등록
  {
    menuNo: 3013,
    menuName: "운영자 등록",
    url: "/adminRegister",
    pmenuNo: 3000,
    dmenuNo: 3011, // 운영자 계정에 종속
    showYn: "N",
    iconName: null,
  },

  // ============================================
  // 1depth: 시스템 관리
  // ============================================
  {
    menuNo: 4000,
    menuName: "시스템 관리",
    url: null,
    pmenuNo: 0,
    dmenuNo: 0,
    showYn: "Y",
    iconName: null,
  },
  // 2depth: 접속 이력 관리
  {
    menuNo: 4011,
    menuName: "접속 이력 관리",
    url: "/accessLogList",
    pmenuNo: 4000,
    dmenuNo: 0,
    showYn: "Y",
    iconName: "pi pi-history",
  },
  // 종속 메뉴: 접속 이력 상세
  {
    menuNo: 4012,
    menuName: "접속 이력 상세",
    url: "/accessLogDetail",
    pmenuNo: 4000,
    dmenuNo: 4011, // 접속 이력 관리에 종속
    showYn: "N",
    iconName: null,
  },
];