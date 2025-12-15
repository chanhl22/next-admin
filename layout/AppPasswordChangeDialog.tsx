import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { useModPw } from '@/hooks/service/account/useModPw';
import { ComAlert } from '@/components/ui/comMsgDialog';

interface PasswordChangeDialogProps {
  visible: boolean;
  onHide: () => void;
  adminNo?: number;
  initialMessage?: string;
}

export default function PasswordChangeDialog({
                                               visible,
                                               onHide,
                                               adminNo,
                                               initialMessage = '※ 비밀번호를 변경하시려면 아래를 입력해주세요.'
                                             }: PasswordChangeDialogProps) {
  const [pwChgMsg, setPwChgMsg] = useState(initialMessage);

  const [pwNewData, setPwNewData] = useState({
    itPwNew: '',
    isInvalid: false,
    invalidMsg: ''
  });

  const [pwRptData, setPwRptData] = useState({
    itPwRpt: '',
    isInvalid: false,
    invalidMsg: ''
  });

  // 다이얼로그 열릴 때 초기화
  useEffect(() => {
    if (visible) {
      setPwNewData({ itPwNew: '', isInvalid: false, invalidMsg: '' });
      setPwRptData({ itPwRpt: '', isInvalid: false, invalidMsg: '' });
      setPwChgMsg(initialMessage);
    }
  }, [visible, initialMessage]);

  // 유효성 검증 초기화
  useEffect(() => {
    setPwNewData({ ...pwNewData, isInvalid: false, invalidMsg: '' });
  }, [pwNewData.itPwNew]);

  useEffect(() => {
    setPwRptData({ ...pwRptData, isInvalid: false, invalidMsg: '' });
  }, [pwRptData.itPwRpt]);

  // 비밀번호 변경
  const { mutate: mutationModPw } = useModPw();

  const modPw = () => {
    if (!adminNo) {
      ComAlert({ msgJsx: <span>관리자 정보가 없습니다.</span> });
      return;
    }

    let doSave = true;
    const pwPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}[\]|\\:;"'<>,.?/])[A-Za-z\d~!@#$%^&*()_+`\-={}[\]|\\:;"'<>,.?/]{8,15}$/;

    if (!pwNewData.itPwNew) {
      setPwNewData({
        ...pwNewData,
        isInvalid: true,
        invalidMsg: '비밀번호를 입력해주세요.'
      });
      doSave = false;
    } else if (!pwPattern.test(pwNewData.itPwNew)) {
      setPwNewData({
        ...pwNewData,
        isInvalid: true,
        invalidMsg: '비밀번호를 확인해주세요.(영문, 숫자, 특수문자 8~15자)'
      });
      doSave = false;
    }

    if (!pwRptData.itPwRpt) {
      setPwRptData({
        ...pwRptData,
        isInvalid: true,
        invalidMsg: '비밀번호를 입력해주세요.'
      });
      doSave = false;
    } else if (pwNewData.itPwNew !== pwRptData.itPwRpt) {
      setPwRptData({
        ...pwRptData,
        isInvalid: true,
        invalidMsg: '비밀번호가 일치하지 않습니다. 동일한 비밀번호를 입력하세요.'
      });
      doSave = false;
    }

    if (doSave) {
      let modPwParam = {
        adminNo: adminNo,
        password: pwNewData.itPwNew
      };

      mutationModPw(modPwParam, {
        onSuccess: (data) => {
          if (data.message === 'SUCCESS') {
            ComAlert({
              msgJsx: <span>정상 처리되었습니다.</span>,
              acceptFnc: () => {
                onHide();
                setPwChgMsg('※ 비밀번호를 변경하시려면 아래를 입력해주세요.');
              }
            });
          } else {
            ComAlert({ msgJsx: <span>{data.message}</span> });
          }
        },
        onError: (error) => {
          console.log(error);
          ComAlert({ msgJsx: <span>잠시 후 재시도 해주세요.</span> });
        }
      });
    }
  };

  return (
    <Dialog
      header="비밀번호 변경"
      visible={visible}
      className="dialog-w-lg"
      onHide={onHide}
      footer={
        <div className="flex justify-content-end">
          <Button label="취소" className="p-button-secondary" onClick={onHide} />
          <Button label="변경" onClick={modPw} />
        </div>
      }
    >
      <div className="p-fluid">
        <p className="text-sm mb-0 font-semibold">{pwChgMsg}</p>
        <p className="text-sm">
          비밀번호 조건은 영문, 숫자, 특수문자 8~15자 입니다.
        </p>

        <div className="field grid mb-0">
          <label htmlFor="ipt0201" className="col-12 mb-2 md:col-3 md:mb-0">
            새 비밀번호 <span className="p-error ml-1">*</span>
          </label>
          <div className="col-12 md:col-6">
            <Password
              inputId="ipt0201"
              type="text"
              className={pwNewData.isInvalid ? 'w-full p-invalid' : 'w-full'}
              toggleMask
              feedback={false}
              value={pwNewData.itPwNew}
              onChange={(e) =>
                setPwNewData({ ...pwNewData, itPwNew: e.target.value })
              }
            />
          </div>
        </div>
        <div className="field grid">
          <div className="col-12 mb-2 md:col-3 md:mb-0"></div>
          <div className="col-12 md:col-9">
            {pwNewData.isInvalid && (
              <small className="p-error">{pwNewData.invalidMsg}</small>
            )}
          </div>
        </div>

        <div className="field grid mb-0">
          <label htmlFor="ipt0202" className="col-12 mb-2 md:col-3 md:mb-0">
            새 비밀번호 확인 <span className="p-error ml-1">*</span>
          </label>
          <div className="col-12 md:col-6">
            <Password
              inputId="ipt0202"
              type="text"
              className={pwRptData.isInvalid ? 'w-full p-invalid' : 'w-full'}
              toggleMask
              feedback={false}
              value={pwRptData.itPwRpt}
              onChange={(e) =>
                setPwRptData({ ...pwRptData, itPwRpt: e.target.value })
              }
            />
          </div>
        </div>
        <div className="field grid">
          <div className="col-12 mb-2 md:col-3 md:mb-0"></div>
          <div className="col-12 md:col-9">
            {pwRptData.isInvalid && (
              <small className="p-error">{pwRptData.invalidMsg}</small>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}