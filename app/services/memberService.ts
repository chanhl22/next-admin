import { apiClient } from '@/libs/api/apiClient'
import {
  DailyFeedbacksDetailRequest,
  DailyFeedbacksDetailResponse,
  DailyFeedbacksResponse,
  IntakeCalorieGraphRequest,
  IntakeCalorieGraphResponse,
  MealAnalysisHistoryResponse,
  MealAnalysisHistorysRequest,
  MemberResponse,
  MembersRequest,
  MembersResponse,
  RoutineProgressDetailRequest,
  RoutineProgressDetailResponse,
  RoutineProgressRequest,
  RoutineProgressResponse,
  RoutineProgressTrendGraphRequest,
  TodayRoutineProgressResponse,
} from '@/libs/types/members.types'
import type {
  MemosResponse,
  MemosRequest,
  CreateMemoRequest,
} from '@/features/user/profile/type'
import { Page } from '@/libs/types/paging.types'

export const memberService = {
  /**
   * 회원 목록 조회
   */
  async getMembers(request: MembersRequest): Promise<Page<MembersResponse>> {
    const response = await apiClient.get<{
      items: MembersResponse[]
      totalCount: number
      totalPage: number
      pageSize: number
      page: number
    }>('/api/members/v1', { params: request })
    return {
      content: response.items,
      totalCount: response.totalCount,
      totalPage: response.totalPage,
      pageSize: response.pageSize,
      page: response.page,
    }
  },

  /**
   * 회원 정보 조회
   */
  async getMember(userId: string): Promise<MemberResponse> {
    return await apiClient.get(`/api/members/v1/${userId}`)
  },

  /**
   * 오늘 루틴 진행 상황 조회
   */
  async getTodayRoutineProgress(userId: string): Promise<TodayRoutineProgressResponse> {
    return await apiClient.get(`/api/members/v1/${userId}/today-Routine-progress`)
  },

  /**
   * 루틴 수행 추이 그래프 조회
   */
  async getRoutineProgressTrendGraph(
    userId: string,
    request: RoutineProgressTrendGraphRequest,
  ): Promise<void> {
    return await apiClient.get(`/api/members/v1/${userId}/Routine-progress-trend-graph`, {
      params: request,
    })
  },

  /**
   * 루틴 수행 목록 조회
   */
  async getRoutineProgress(
    userId: string,
    request: RoutineProgressRequest,
  ): Promise<Page<RoutineProgressResponse>> {
    const response = await apiClient.get<{
      items: RoutineProgressResponse[]
      totalCount: number
      totalPage: number
      pageSize: number
      page: number
    }>(`/api/members/v1/${userId}/Routine-progress`, { params: request })
    return {
      content: response.items,
      totalCount: response.totalCount,
      totalPage: response.totalPage,
      pageSize: response.pageSize,
      page: response.page,
    }
  },

  /**
   * 루틴 수행 상세 조회
   */
  async getRoutineProgressDetail(
    userId: string,
    request: RoutineProgressDetailRequest,
  ): Promise<Page<RoutineProgressDetailResponse>> {
    const response = await apiClient.get<{
      items: RoutineProgressDetailResponse[]
      totalCount: number
      totalPage: number
      pageSize: number
      page: number
    }>(`/api/members/v1/${userId}/Routine-progress/detail`, { params: request })
    return {
      content: response.items,
      totalCount: response.totalCount,
      totalPage: response.totalPage,
      pageSize: response.pageSize,
      page: response.page,
    }
  },

  /**
   * 일일 피드백 목록 조회
   */
  async getDailyFeedbacks(userId: string): Promise<DailyFeedbacksResponse> {
    return await apiClient.get(`/api/members/v1/${userId}/daily-feedbacks`)
  },

  /**
   * 일일 피드백 상세 조회
   */
  async getDailyFeedbacksDetail(
    userId: string,
    request: DailyFeedbacksDetailRequest,
  ): Promise<Page<DailyFeedbacksDetailResponse>> {
    const response = await apiClient.get<{
      items: DailyFeedbacksDetailResponse[]
      totalCount: number
      totalPage: number
      pageSize: number
      page: number
    }>(`/api/members/v1/${userId}/daily-feedbacks/detail`, { params: request })
    return {
      content: response.items,
      totalCount: response.totalCount,
      totalPage: response.totalPage,
      pageSize: response.pageSize,
      page: response.page,
    }
  },

  /**
   * 섭취 칼로리 그래프 조회
   */
  async getIntakeCalorieGraph(
    userId: string,
    request: IntakeCalorieGraphRequest,
  ): Promise<IntakeCalorieGraphResponse> {
    return await apiClient.get(`/api/members/v1/${userId}/intake-calorie-graph`, {
      params: request,
    })
  },

  /**
   * 식사 분석 내역 목록 조회
   */
  async getMealAnalysisHistorys(
    userId: string,
    request: MealAnalysisHistorysRequest,
  ): Promise<void> {
    return await apiClient.get(`/api/members/v1/${userId}/meal-analysis-historys`, {
      params: request,
    })
  },

  /**
   * 식사 분석 상세 조회
   */
  async getMealAnalysisHistory(
    userId: string,
    mealSn: string,
  ): Promise<MealAnalysisHistoryResponse> {
    return await apiClient.get(
      `/api/members/v1/${userId}/meal-analysis-historys/${mealSn}`,
    )
  },

  /**
   * 메모 이력 목록 조회
   */
  async getMemos(request: MemosRequest): Promise<MemosResponse[]> {
    return await apiClient.get(`/api/members/v1/memos`, { params: request })
  },

  /**
   * 메모 등록
   */
  async createMemo(request: CreateMemoRequest): Promise<void> {
    return await apiClient.post(`/api/members/v1/memo`, request)
  },
}
