import { apiClient } from "@/libs/api/apiClient";

export const groupService = {

  /**
   * 그룹명 목록 조회
   */
  async getGroupNames(request: {}): Promise<void> {
    await apiClient.get("/api/groups/v1/names", request);
  },

  /**
   * 그룹 목록 조회
   */
  async getGroups(request: {}): Promise<void> {
    await apiClient.get("/api/groups/v1", request);
  },

  /**
   * 그룹 등록
   */
  async createGroup(request: {}): Promise<void> {
    await apiClient.post("/api/groups/v1", request);
  },

  /**
   * 그룹 수정
   */
  async updateGroup(groupSn: string, request: {}): Promise<void> {
    await apiClient.patch(`/api/groups/v1/${groupSn}`, request);
  },

  /**
   * 그룹 삭제
   */
  async deleteGroup(groupSn: string): Promise<void> {
    await apiClient.delete(`/api/groups/v1/${groupSn}`);
  },

  /**
   * 그룹 사용자 목록 조회
   */
  async getGroupUsers(request: {}): Promise<void> {
    await apiClient.get("/api/groups/v1/users", request);
  },

  /**
   * 그룹 사용자 지정
   */
  async assignGroupUsers(request: {}): Promise<void> {
    await apiClient.post("/api/groups/v1/users", request);
  },

  /**
   * 그룹 운영자 목록 조회
   */
  async getGroupOperators(request: {}): Promise<void> {
    await apiClient.get("/api/groups/v1/operators", request);
  },

  /**
   * 그룹 운영자 지정
   */
  async assignGroupOperators(request: {}): Promise<void> {
    await apiClient.post("/api/groups/v1/operators", request);
  },
};