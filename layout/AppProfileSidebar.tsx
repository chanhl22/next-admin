'use client';

import { Sidebar } from 'primereact/sidebar';
import React, { useContext, useEffect, useState } from 'react';
import { LayoutContext } from './context/layoutcontext';
import { useGetLogout } from '@/hooks/common/useGetLogout';
import { ComConfirm } from '@/components/ui/comMsgDialog';
import AppMyInfoEditDialog from '@/layout/AppMyInfoEditDialog';
import AppPasswordChangeDialog from '@/layout/AppPasswordChangeDialog';
import ProfileMenuItem from "@/layout/AppProfileMenuItem";

export default function AppProfileSidebar() {
  const { layoutState, setLayoutState, layoutConfig, setLayoutConfig } = useContext(LayoutContext);
  const [dialogMyInfo, setDialogMyInfo] = useState(false);
  const [dialogPw, setDialogPw] = useState(false); // 비밀번호 변경 dialog open
  const [pwChgMsg, setPwChgMsg] = useState(
    '※ 비밀번호를 변경하시려면 아래를 입력해주세요.'
  );

  const onProfileSidebarHide = () => {
    setLayoutState((prevState) => ({
      ...prevState,
      profileSidebarVisible: false
    }));
  };

  // 90일 경과 체크
  useEffect(() => {
    let icmsInfo = null;
    let icmsCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('ICHMS-LOGIN='));
    if (icmsCookie?.split('=').length === 2 && icmsCookie?.split('=')[1]) {
      icmsInfo = JSON.parse(icmsCookie.split('=')[1]);
      if (icmsInfo && icmsInfo.expirePwYn === 'Y') {
        setPwChgMsg(
          '※ 비밀번호를 변경한지 90일이 경과되어 비밀번호 변경이 필요합니다.'
        );
        setDialogPw(true);
        icmsInfo.expirePwYn = 'N';
        document.cookie =
          'ICHMS-LOGIN=' +
          JSON.stringify(icmsInfo) +
          '; path=/; sameSite=strict;';
      }
    }
  }, []);

  // 로그아웃
  const handleLogout = () => {
    ComConfirm({
      msgJsx: <span>로그아웃 하시겠습니까?</span>,
      acceptFnc: doLogout
    });
  };

  const { mutate: mutationLogout } = useGetLogout();
  const doLogout = () => {
    mutationLogout(null, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
      onSettled: () => {
        // 쿠키 만료처리
        document.cookie =
          'ICHMS-LOGIN=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        document.cookie =
          'ICHMS-AT=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        document.cookie =
          'ICHMS-RT=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

        onProfileSidebarHide();
        window.location.href = '/';
      }
    });
  };

  return (
    <>
      <Sidebar
        visible={layoutState.profileSidebarVisible}
        onHide={onProfileSidebarHide}
        position="right"
        className="layout-profile-sidebar w-full sm:w-25rem"
      >
        <div className="flex flex-column mx-auto md:mx-0">
          <span className="mb-2 font-semibold">안녕하세요!</span>
          <span className="text-color-secondary font-medium mb-5">
            <strong>{layoutConfig.adminName}</strong> 님
          </span>

          <ul className="list-none m-0 p-0">
            <ProfileMenuItem
              icon="pi pi-user"
              label="내 정보 수정"
              onClick={() => setDialogMyInfo(true)}
            />

            <ProfileMenuItem
              icon="pi pi-power-off"
              label="로그아웃"
              onClick={handleLogout}
            />
          </ul>
        </div>
      </Sidebar>

      {/* 내 정보 수정 다이얼로그 */}
      <AppMyInfoEditDialog
        visible={dialogMyInfo}
        onHide={() => setDialogMyInfo(false)}
        adminNo={layoutConfig.adminNo}
        onOpenPasswordChange={() => setDialogPw(true)}
      />

      {/* 비밀번호 변경 다이얼로그 */}
      <AppPasswordChangeDialog
        visible={dialogPw}
        onHide={() => setDialogPw(false)}
        adminNo={layoutConfig.adminNo}
        initialMessage={pwChgMsg}
      />
    </>
  );
}