import { apiClient } from '@/libs/api/apiClient'
import {
  ChangeLoginPasswordRequest,
  getProfileResponse,
  updateOperatorSettings,
} from '@/libs/types/profile.types'
import { UpdateOperatorProfileRequest } from '@/libs/types/profile.types'

export const profileService = {
  /**
   * 로그인 비밀번호 변경
   */
  async changeLoginPassword(request: ChangeLoginPasswordRequest): Promise<void> {
    return await apiClient.patch('/api/users/v1/change-login-password', request)
  },

  /**
   * 사용자 프로필 조회
   */
  async getProfile(): Promise<getProfileResponse> {
    return apiClient.get<getProfileResponse>('/api/users/v1/profile')
  },

  /**
   * 운영자 설정 저장
   */
  async updateOperatorSettings(request: updateOperatorSettings) {
    await apiClient.put('/api/operators/v1/settings', request)
  },

  /**
   * 사용자 프로필 수정
   */
  async updateOperatorProfile(request: UpdateOperatorProfileRequest): Promise<void> {
    // FormData 직접 생성
    const formData = new FormData()

    // JSON 데이터를 Blob으로 변환하여 'request' part에 추가
    const requestDto = {
      operatorName: request.operatorName,
      operatorProfileCn: request.operatorProfileCn,
    }

    formData.append(
      'request',
      new Blob([JSON.stringify(requestDto)], {
        type: 'application/json',
      }),
    )

    // 파일 추가
    if (request.operatorProfileImg) {
      formData.append('operatorProfileImg', request.operatorProfileImg)
    }

    return await apiClient.put('/api/operators/v1/profile', formData)
  },
}
