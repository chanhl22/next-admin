import { apiClient } from "@/libs/api/apiClient";

export const questionService = {

  /**
   * 문의 목록 조회
   */
  async getQuestions(request: {}): Promise<void> {
    await apiClient.get("/api/questions/v1", request);
  },

  /**
   * 문의 상세 조회
   */
  async getQuestion(questionSn: string): Promise<void> {
    await apiClient.get(`/api/questions/v1/${questionSn}`);
  },

  /**
   * 문의 등록
   */
  async createQuestion(request: {}): Promise<void> {
    await apiClient.post("/api/questions/v1", request);
  },

  /**
   * 문의 수정
   */
  async updateQuestion(questionSn: string, request: {}): Promise<void> {
    await apiClient.patch(`/api/questions/v1/${questionSn}`, request);
  },

  /**
   * 문의 삭제
   */
  async deleteQuestion(questionSn: string): Promise<void> {
    await apiClient.delete(`/api/questions/v1/${questionSn}`);
  },

  /**
   * 댓글 등록
   */
  async createReply(questionSn: string, request: {}): Promise<void> {
    await apiClient.post(`/api/questions/v1/${questionSn}/reply`, request);
  },

  /**
   * 댓글 수정
   */
  async updateReply(questionSn: string, replySn: string, request: {}): Promise<void> {
    await apiClient.patch(`/api/questions/v1/${questionSn}/reply/${replySn}`, request);
  },

  /**
   * 댓글 삭제
   */
  async deleteReply(questionSn: string, replySn: string): Promise<void> {
    await apiClient.delete(`/api/questions/v1/${questionSn}/reply/${replySn}`);
  },
};