'use client';

import type { AppTopbarRef, ChildContainerProps } from '@/types';
import { usePathname, useSearchParams } from 'next/navigation';
import PrimeReact from 'primereact/api';
import {
  useEventListener,
  useMountEffect,
  useResizeListener,
  useUnmountEffect,
} from 'primereact/hooks';
import { DomHandler, classNames } from 'primereact/utils';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import AppBreadCrumb from './AppBreadCrumb';
import AppProfileSidebar from './AppProfileSidebar';
import PubAppSidebar from './PubAppSidebar';
import AppTopbar from './AppTopbar';
import { LayoutContext } from './context/layoutcontext';
import { useGetLogout } from "@/hooks/common/useGetLogout";

const pubLayout = (props: ChildContainerProps) => {
  const {
    layoutConfig,
    setLayoutConfig,
    layoutState,
    setLayoutState,
    isSlim,
    isSlimPlus,
    isHorizontal,
    isDesktop,
  } = useContext(LayoutContext);

  const topbarRef = useRef<AppTopbarRef>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] =
    useEventListener({
      type: 'click',
      listener: (event) => {
        const isOutsideClicked = !(
          sidebarRef.current?.isSameNode(event.target as Node) ||
          sidebarRef.current?.contains(event.target as Node) ||
          topbarRef.current?.menubutton?.isSameNode(event.target as Node) ||
          topbarRef.current?.menubutton?.contains(event.target as Node)
        );

        if (isOutsideClicked) {
          hideMenu();
        }
      },
    });

  const [bindDocumentResizeListener, unbindDocumentResizeListener] =
    useResizeListener({
      listener: () => {
        if (isDesktop() && !DomHandler.isTouchDevice()) {
          hideMenu();
        }
      },
    });

  let timeout: ReturnType<typeof setTimeout> | null = null;

  const onMouseEnter = () => {
    if (!layoutState.anchored) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        sidebarActive: true,
      }));
    }
  };

  const onMouseLeave = () => {
    if (!layoutState.anchored) {
      if (!timeout) {
        timeout = setTimeout(
          () =>
            setLayoutState((prevLayoutState) => ({
              ...prevLayoutState,
              sidebarActive: false,
            })),
          300
        );
      }
    }
  };

  const hideMenu = useCallback(() => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      overlayMenuActive: false,
      overlaySubmenuActive: false,
      staticMenuMobileActive: false,
      menuHoverActive: false,
      resetMenu: (isSlim() || isSlimPlus() || isHorizontal()) && isDesktop(),
    }));
  }, [isSlim, isSlimPlus, isHorizontal, isDesktop, setLayoutState]);

  const blockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  };

  const unblockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
    }
  };

  useMountEffect(() => {
    PrimeReact.ripple = true;
  });

  useEffect(() => {
    if (
      layoutState.overlayMenuActive ||
      layoutState.staticMenuMobileActive ||
      layoutState.overlaySubmenuActive
    ) {
      bindMenuOutsideClickListener();
    }

    if (layoutState.staticMenuMobileActive) {
      blockBodyScroll();
      (isSlim() || isSlimPlus() || isHorizontal()) &&
      bindDocumentResizeListener();
    }

    return () => {
      unbindMenuOutsideClickListener();
      unbindDocumentResizeListener();
      unblockBodyScroll();
    };
  }, [
    layoutState.overlayMenuActive,
    layoutState.staticMenuMobileActive,
    layoutState.overlaySubmenuActive,
  ]);

  useEffect(() => {
    const onRouteChange = () => {
      hideMenu();
    };
    onRouteChange();
  }, [pathname, searchParams]);

  useUnmountEffect(() => {
    unbindMenuOutsideClickListener();
  });

  const containerClass = classNames({
    'layout-light': layoutConfig.colorScheme === 'light',
    'layout-dim': layoutConfig.colorScheme === 'dim',
    'layout-dark': layoutConfig.colorScheme === 'dark',
    'layout-colorscheme-menu': layoutConfig.menuTheme === 'colorScheme',
    'layout-primarycolor-menu': layoutConfig.menuTheme === 'primaryColor',
    'layout-transparent-menu': layoutConfig.menuTheme === 'transparent',
    'layout-overlay': layoutConfig.menuMode === 'overlay',
    'layout-static': layoutConfig.menuMode === 'static',
    'layout-slim': layoutConfig.menuMode === 'slim',
    'layout-slim-plus': layoutConfig.menuMode === 'slim-plus',
    'layout-horizontal': layoutConfig.menuMode === 'horizontal',
    'layout-reveal': layoutConfig.menuMode === 'reveal',
    'layout-drawer': layoutConfig.menuMode === 'drawer',
    'layout-static-inactive':
      layoutState.staticMenuDesktopInactive &&
      layoutConfig.menuMode === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive,
    'layout-mobile-active': layoutState.staticMenuMobileActive,
    'p-input-filled': layoutConfig.inputStyle === 'filled',
    'p-ripple-disabled': !layoutConfig.ripple,
    'layout-sidebar-active': layoutState.sidebarActive,
    'layout-sidebar-anchored': layoutState.anchored,
  });

  // UserActivity 체크 시작 ============================
  const [logOutTimerId, setLogOutTimerId] = useState<NodeJS.Timeout | null>(null);
  // timer
  const resetTimer = useCallback(() => {
    if (logOutTimerId) {
      clearTimeout(logOutTimerId);
    }

    const newTimerId = setTimeout(() => {
      doLogout();
    }, 3600000); // 60분(3600 000ms)
    setLogOutTimerId(newTimerId);
  }, [logOutTimerId]);

  const { mutate: mutationLogout } = useGetLogout();
  const doLogout = () => {
    mutationLogout(
      null,
      {
        onSettled: () => {
          // 모두 삭제
          document.cookie = 'ICHMS-LOGIN=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
          document.cookie = 'ICHMS-AT=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
          document.cookie = 'ICHMS-RT=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
          window.location.href = '/login'; // 로그인 페이지로 리디렉션
        }
      }
    );
  }

  const handleUserActivity = useCallback(() => {
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    // 이벤트 리스너 등록
    // window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('click', handleUserActivity);
    // 클린업
    return () => {
      // window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      if (logOutTimerId) clearTimeout(logOutTimerId);
    };
  }, [handleUserActivity, resetTimer]);
  // UserActivity 체크 종료 ============================

  // 로그인 사용자 이름 세팅
  useEffect(() => {
    const setUserName = () => {
      let icmsInfo = null;
      let icmsCookie = document.cookie.split('; ').find(row => row.startsWith('ICHMS-LOGIN='));
      if (icmsCookie?.split('=').length === 2 && icmsCookie?.split('=')[1]) {
        icmsInfo = JSON.parse(icmsCookie.split('=')[1]);
        let adminNo = icmsInfo.adminNo;
        let adminName = decodeURIComponent(icmsInfo.name);
        setLayoutConfig((prev) => ({ ...prev, adminNo: adminNo, adminName: adminName }));
      }
    };
    setUserName();
  }, [pathname]);

  return (
    <React.Fragment>
      <div className={classNames('layout-container', containerClass)}>

        {pathname !== "/" && pathname !== "/login" && (
          <div
            ref={sidebarRef}
            className="layout-sidebar"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <PubAppSidebar/>
          </div>
        )}

        {pathname !== "/" && pathname !== "/login"
          ?
          <div className="layout-content-wrapper">
            <AppTopbar ref={topbarRef}/>
            <AppBreadCrumb className="content-breadcrumb"></AppBreadCrumb>
            <div className="layout-content">{props.children}</div>
          </div>
          :
          <div className="layout-content">{props.children}</div>
        }

        {pathname !== "/" && pathname !== "/login" && (
          <AppProfileSidebar/>
        )}

        <div className="layout-mask"></div>
      </div>
    </React.Fragment>
  );
};

export default pubLayout;
