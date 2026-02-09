import { apiClient } from "@/libs/api/apiClient";
import {
  CheckDuplicationLoginIdRequest, CheckDuplicationLoginIdResponse, CheckDuplicationUserTelRequest,
  CheckDuplicationUserTelResponse,
  CreateOperatorRequest,
  CreateOperatorResponse, OperatorDetailResponse,
  OperatorsRequest,
  OperatorsResponse, SaveOperatorProfileRequest, UpdateOperatorProfileRequest,
  UpdateOperatorRequest, UpdateOperatorStatusRequest,
  WithdrawOperatorRequest
} from "@/libs/types/operators.types";
import { Page } from "@/libs/types/paging.types";

export const operatorService = {

  /**
   * 운영자 목록 조회
   */
  async getOperators(request: OperatorsRequest): Promise<Page<OperatorsResponse>> {
    const response = await apiClient.get<{
      items: OperatorsResponse[];
      totalCount: number;
      totalPage: number;
      pageSize: number;
      page: number;
    }>("/api/operators/v1", { params: request });

    return {
      content: response.items,
      totalCount: response.totalCount,
      totalPage: response.totalPage,
      pageSize: response.pageSize,
      page: response.page,
    };
  },

  /**
   * 운영자 계정 상태 수정
   */
  async updateOperatorStatus(request: UpdateOperatorStatusRequest): Promise<void> {
    return await apiClient.patch("/api/users/v1/account/status", request);
  },

  /**
   * 운영자 계정 생성
   */
  async createOperator(request: CreateOperatorRequest): Promise<CreateOperatorResponse> {
    return await apiClient.post("/api/users/v1/account/operator", request);
  },

  /**
   * 운영자 계정 수정
   */
  async updateOperator(request: UpdateOperatorRequest): Promise<void> {
    return await apiClient.patch("/api/users/v1/account/operator/modify", request);
  },

  /**
   * 사용자 프로필 저장
   */
  async saveOperatorProfile(request: SaveOperatorProfileRequest): Promise<void> {
    return await apiClient.post("/api/users/v1/profile", request);
  },

  /**
   * 로그인 ID 중복확인
   */
  async checkDuplicationLoginId(request: CheckDuplicationLoginIdRequest): Promise<CheckDuplicationLoginIdResponse> {
    return await apiClient.get("/api/users/v1/check-login-id", { params: request });
  },

  /**
   * 클라이언트 별 사용자 전화번호 중복확인
   */
  async checkDuplicationUserTel(request: CheckDuplicationUserTelRequest): Promise<CheckDuplicationUserTelResponse> {
    return await apiClient.get("/api/users/v1/check-client-by-user-tel", { params: request });
  },

  /**
   * 운영자 조회
   */
  async getOperator(userId: string): Promise<OperatorDetailResponse> {
    return await apiClient.get(`/api/operators/v1/${userId}`);
  },

  /**
   * 사용자 프로필 수정
   */
  async updateOperatorProfile(request: UpdateOperatorProfileRequest): Promise<void> {
    return await apiClient.patch("/api/users/v1/profile", request);
  },

  /**
   * 사용자 계정 탈퇴
   */
  async withdrawOperator(request: WithdrawOperatorRequest): Promise<void> {
    return await apiClient.post("/api/users/v1/account/withdraw", request);
  }
}