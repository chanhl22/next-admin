import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useGetAdminInfoAuth } from '@/hooks/common/useGetAdminInfoAuth';

interface MyInfoEditDialogProps {
  visible: boolean;
  onHide: () => void;
  adminNo?: number;
  onOpenPasswordChange: () => void;
}

// 🔧 필드 설정 - 나중에 수정 기능 추가 시 required 사용
const FIELD_CONFIG = {
  name: { label: '관리자 이름', required: true },
  email: { label: '아이디(이메일)', required: false },
  phone: { label: '연락처', required: false },
  gender: { label: '성별', required: false },
  birthDate: { label: '생년월일', required: false },
  authGroupName: { label: '권한 그룹', required: false },
  lastLoginDatetime: { label: '마지막 로그인', required: false },
  lastChangePwdDatetime: { label: '마지막 비밀번호 변경', required: false },
};

export default function MyInfoEditDialog({
                                           visible,
                                           onHide,
                                           adminNo,
                                           onOpenPasswordChange
                                         }: MyInfoEditDialogProps) {

  // 관리자 정보 조회 - visible일 때만 활성화
  const { data: adminInfo, isLoading } = useGetAdminInfoAuth(
    { adminNo },
    { enabled: visible && !!adminNo }
  );

  return (
    <Dialog
      header="내 정보"
      visible={visible}
      className="dialog-w-lg"
      onHide={onHide}
      closeOnEscape={false}
      footer={
        <div className="flex justify-content-between">
          <Button
            label="비밀번호 변경"
            className="p-button-text"
            onClick={onOpenPasswordChange}
          />
          <Button
            label="닫기"
            className="p-button-secondary"
            onClick={onHide}
          />
        </div>
      }
    >
      <div className="p-fluid">
        {isLoading ? (
          <div className="text-center py-4">
            <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
            <p className="mt-2">정보를 불러오는 중...</p>
          </div>
        ) : adminInfo ? (
          <>
            {/* 관리자 이름 */}
            <ReadOnlyField
              label={FIELD_CONFIG.name.label}
              value={adminInfo.name}
            />

            {/* 아이디(이메일) */}
            <ReadOnlyField
              label={FIELD_CONFIG.email.label}
              value={adminInfo.email}
            />

            {/* 연락처 */}
            <ReadOnlyField
              label={FIELD_CONFIG.phone.label}
              value={adminInfo.phone}
            />

            {/* 성별 */}
            <ReadOnlyField
              label={FIELD_CONFIG.gender.label}
              value={adminInfo.gender === 'M' ? '남성' : adminInfo.gender === 'F' ? '여성' : adminInfo.gender}
            />

            {/* 생년월일 */}
            <ReadOnlyField
              label={FIELD_CONFIG.birthDate.label}
              value={adminInfo.birthDate}
            />

            {/* 권한 그룹 */}
            <ReadOnlyField
              label={FIELD_CONFIG.authGroupName.label}
              value={adminInfo.authGroupName}
            />

            {/* 마지막 로그인 */}
            <ReadOnlyField
              label={FIELD_CONFIG.lastLoginDatetime.label}
              value={adminInfo.lastLoginDatetime}
            />

            {/* 마지막 비밀번호 변경 */}
            <ReadOnlyField
              label={FIELD_CONFIG.lastChangePwdDatetime.label}
              value={adminInfo.lastChangePwdDatetime}
            />
          </>
        ) : (
          <div className="text-center py-4 text-500">
            정보를 불러올 수 없습니다.
          </div>
        )}
      </div>
    </Dialog>
  );
}

// 읽기 전용 필드 컴포넌트 (나중에 수정 가능 필드로 전환 용이)
interface ReadOnlyFieldProps {
  label: string;
  value: string | number | null | undefined;
}

function ReadOnlyField({ label, value }: ReadOnlyFieldProps) {
  return (
    <div className="field grid">
      <label className="col-12 mb-2 md:col-3 md:mb-0 font-semibold">
        {label}
      </label>
      <div className="col-12 md:col-9">
        <div className="p-inputtext p-component p-filled border-0 bg-gray-50">
          {value || '-'}
        </div>
      </div>
    </div>
  );
}

// todo
// 나중에 수정 기능 추가 시 사용할 컴포넌트 예시 (주석 처리)
/*
interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  isInvalid?: boolean;
  invalidMsg?: string;
  disabled?: boolean;
}

function EditableField({
  label,
  value,
  onChange,
  required = false,
  isInvalid = false,
  invalidMsg = '',
  disabled = false
}: EditableFieldProps) {
  return (
    <>
      <div className="field grid mb-0">
        <label className="col-12 mb-2 md:col-3 md:mb-0">
          {label}
          {required && <span className="p-error ml-1">*</span>}
        </label>
        <div className="col-12 md:col-9">
          <InputText
            type="text"
            className={isInvalid ? 'w-full p-invalid' : 'w-full'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>
      {isInvalid && invalidMsg && (
        <div className="field grid">
          <div className="col-12 mb-2 md:col-3 md:mb-0"></div>
          <div className="col-12 md:col-9">
            <small className="p-error">{invalidMsg}</small>
          </div>
        </div>
      )}
    </>
  );
}
*/