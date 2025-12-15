import type { AppTopbarRef } from '@/types';
import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
import { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import AppBreadcrumb from './AppBreadCrumb';
import { LayoutContext } from './context/layoutcontext';

// import { usePathname, useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
  const { onMenuToggle, showProfileSidebar, showConfigSidebar, layoutConfig } = useContext(LayoutContext);
  const menubuttonRef = useRef(null);

  // const onConfigButtonClick = () => {
  //   showConfigSidebar();
  // };

  const pathname = usePathname();

  //화살표 표시할 url 모음
  const arrowBtnArr = [
    '/appMenuEdit',       // 사용자 앱 관리 수정
    '/brandMenuEdit',     // 브랜든 앱 수정
    '/appVersionEdit',    // 앱 버전관리 수정
    '/faqEdit',           // 자주 묻는 질문 수정
    '/faqDetail',         // 자주 묻는 질문 상세
    '/csEdit',            // 1:1문의 수정
    '/csDetail',          // 1:1문의 상세
    '/termEdit',          // 약관 수정
    '/adminEdit',         // 관리자계정 수정
    '/adminReg',          // 관리자계정 등록
    '/homeBannerEdit',    // 홈배너 수정
    '/adminBannerEdit',   // 관리자 추천배너 수정
    '/logicBannerEdit',   // 추천로직배너 수정
    '/playBannerEdit',    // 플레이앱배너 수정
    '/newsEdit',          // 새소식 수정
    '/newsDetail',        // 새소식 상세
    '/eventEdit',         // 이벤트 등록
    '/eventDetail',       // 이벤트 상세
    '/businessDetail',    // 비즈니스 상세
    '/appNoticeEdit',     // 앱 공지사항 수정
    '/appNoticeDetail',   // 앱 공지사항 상세
    '/curationEdit',      // 큐레이션 수정
    '/contentsDetail',    // 콘텐츠 상세
    '/surveyEdit',        // 문진 문항 수정
    '/msgSendEdit',       // 메시지발송 수정
    '/extraSurveyDetail', // 추가 문진 상세
    '/pmCpnDetail',       // 판매 이력 상세
    '/pmItemEdit',        // 포인트 상품 수정
    '/pmItemDetail'       // 포인트 상품 상세
  ];

  //arrowBtnArr에 포함되는지 확인여부에 따라 화살표 Btn표시
  const showArrow = arrowBtnArr?.includes(pathname);

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
  }));

  return (
      <div className="layout-topbar">
        <div className="topbar-start">
          <button
              ref={menubuttonRef}
              type="button"
              className="topbar-menubutton p-link p-trigger"
              onClick={onMenuToggle}
          >
            <i className="pi pi-bars"></i>
          </button>
          <div className="w-3rem">
            {showArrow && (
                <Button
                    icon="pi pi-arrow-left"
                    rounded
                    text
                    severity="secondary"
                    onClick={() => window.history.back()}
                />
            )}
          </div>
          <AppBreadcrumb className="topbar-breadcrumb"></AppBreadcrumb>
        </div>

        <div className="topbar-end">
          <ul className="topbar-menu">
            <li>
              <button
                  type="button"
                  className="p-link"
                  onClick={showProfileSidebar}
              >
                <strong>{layoutConfig.adminName}</strong> 님
              </button>
            </li>
          </ul>
        </div>
      </div>
  );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;