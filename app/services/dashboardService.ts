import { apiClient } from "@/libs/api/apiClient";

export const dashboardService = {

  /**
   * 대시보드 루틴 현황 그래프 조회
   */
  async getRoutineOverviewStat(request: {}): Promise<void> {
    await apiClient.get("/api/dashboard/v1/routine-overview-stat", request);
  },

  /**
   * 대시보드 사용자 루틴 현황 목록 조회
   */
  async getUserRoutineOverviews(request: {}): Promise<void> {
    await apiClient.get("/api/dashboard/v1/user-routine-overviews", request);
  },

  /**
   * 대시보드 사용자 중도 포기 그래프 조회
   */
  async getDropoutUserGraph(request: {}): Promise<void> {
    await apiClient.get("/api/dashboard/v1/dropout-user-graph", request);
  },

  /**
   * 대시보드 사용자 중도 포기 목록 조회
   */
  async getDropoutUsers(request: {}): Promise<void> {
    await apiClient.get("/api/dashboard/v1/dropout-users", request);
  },
};