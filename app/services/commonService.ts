import { apiClient } from '@/libs/api/apiClient'
import {
  CreateActivityLogRequest,
  InquiryStatusCodeResponse,
  IntakeCalorieStatusCodeResponse,
  MealCodeResponse,
  MemberCustomerResponse,
  OperatorMsgSendStatusCodeResponse,
  OperatorRoleCodeResponse,
  PeriodCodeResponse,
  RoutineCategoryCodeResponse,
  RoutineProgressStatusCodeResponse,
  UserStatusCodeResponse,
} from '@/libs/types/commons.types'

export const commonService = {
  /**
   * 운영자 활동 로그 저장
   */
  async createActivityLog(request: CreateActivityLogRequest): Promise<void> {
    await apiClient.post('/api/commons/v1/activity-logs', request)
  },

  /**
   * 운영자 권한 목록 조회
   */
  async getOperatorRoleCodes(): Promise<OperatorRoleCodeResponse[]> {
    return await apiClient.get('/api/commons/v1/operator-roles')
  },

  /**
   * 회원 고객 목록 조회
   */
  async getMemberCustomerCodes(): Promise<MemberCustomerResponse[]> {
    return await apiClient.get('/api/commons/v1/member-customers')
  },

  /**
   * 루틴 진행 상태 구분코드 목록 조회
   */
  async getRoutineProgressStatusCodes(): Promise<RoutineProgressStatusCodeResponse[]> {
    return await apiClient.get('/api/commons/v1/routine-progress-status-codes')
  },

  /**
   * 메시지 발송 상태 구분코드 목록 조회
   */
  async getOperatorMsgSendStatusCodes(): Promise<OperatorMsgSendStatusCodeResponse[]> {
    return await apiClient.get('/api/commons/v1/operator-msg-send-status-codes')
  },

  /**
   * 사용자 상태 구분코드 목록 조회
   */
  async getUserStatusCodes(): Promise<UserStatusCodeResponse[]> {
    return await apiClient.get('/api/commons/v1/user-status-codes')
  },

  /**
   * 루틴 카테고리 구분코드 목록 조회
   */
  async getRoutineCategoryCodes(): Promise<RoutineCategoryCodeResponse[]> {
    return await apiClient.get('/api/commons/v1/routine-category-codes')
  },

  /**
   * 식사 구분 코드 목록 조회
   */
  async getMealCodes(): Promise<MealCodeResponse[]> {
    return await apiClient.get('/api/commons/v1/meal-codes')
  },

  /**
   * 섭취 칼로리 상태 구분코드 목록 조회
   */
  async getIntakeCalorieCodes(): Promise<IntakeCalorieStatusCodeResponse[]> {
    return await apiClient.get('/api/commons/v1/intake-calorie-status-codes')
  },

  /**
   * 기간 구분코드 목록 조회
   */
  async getPeriodCodes(): Promise<PeriodCodeResponse[]> {
    return await apiClient.get('/api/commons/v1/period-codes')
  },

  /**
   * 문의 상태 구분코드 목록 조회
   */
  async getInquiryStatusCode(): Promise<InquiryStatusCodeResponse[]> {
    return await apiClient.get('/api/commons/v1/inquiry-status-codes')
  },
}
