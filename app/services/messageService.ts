import { apiClient } from '@/libs/api/apiClient'
import {
  GetOperatorMessageSendTargetHistorysRequest,
  OperatorMessageSendTargetHistorysResponse,
  SendMessageRequest,
  SendTargetsRequest,
  SendTargetsResponse,
} from '@/libs/types/message.types'
import { Page } from '@/libs/types/paging.types'
import type {
  MessageManagementRequest,
  MessageManagementResponse,
} from '@/features/message/list/type'
import {
  MessageSendHistoriesRequest,
  MsgListResponse,
} from '@/features/user/profile/type'
export const messageService = {
  /**
   * 메시지 발송 이력 목록 조회
   */
  async getSendHistorys(
    request: MessageManagementRequest,
  ): Promise<Page<MessageManagementResponse>> {
    const response = await apiClient.get<{
      items: MessageManagementResponse[]
      totalCount: number
      totalPage: number
      pageSize: number
      page: number
    }>('/api/messages/v1/send-historys', { params: request })

    return {
      content: response.items,
      totalCount: response.totalCount,
      totalPage: response.totalPage,
      pageSize: response.pageSize,
      page: response.page,
    }
  },

  /**
   * 메시지 발송 대상자 이력 목록 조회
   */
  async getSendTargetHistorys(
    operMsgSn: string,
    request: GetOperatorMessageSendTargetHistorysRequest,
  ): Promise<Page<OperatorMessageSendTargetHistorysResponse>> {
    const response = await apiClient.get<{
      items: OperatorMessageSendTargetHistorysResponse[]
      totalCount: number
      totalPage: number
      pageSize: number
      page: number
    }>(`/api/messages/v1/${operMsgSn}/send-target-historys`, {
      params: request,
    })

    return {
      content: response.items,
      totalCount: response.totalCount,
      totalPage: response.totalPage,
      pageSize: response.pageSize,
      page: response.page,
    }
  },

  /**
   * 메시지 예약 발송 취소
   */
  async cancelResvSend(operMsgSn: string): Promise<void> {
    await apiClient.patch(`/api/messages/v1/${operMsgSn}/resv-send-cancel`)
  },

  /**
   * 메시지 발송 대상자 목록 조회
   */
  async getSendTargets(request: SendTargetsRequest): Promise<Page<SendTargetsResponse>> {
    const response = await apiClient.get<{
      items: SendTargetsResponse[]
      totalCount: number
      totalPage: number
      pageSize: number
      page: number
    }>('/api/messages/v1/send-targets', { params: request })

    return {
      content: response.items,
      totalCount: response.totalCount,
      totalPage: response.totalPage,
      pageSize: response.pageSize,
      page: response.page,
    }
  },

  /**
   * 메시지 발송 등록
   */
  async sendMessage(request: SendMessageRequest): Promise<void> {
    await apiClient.post('/api/messages/v1/send', request)
  },

  /**
   * 회원 메세지 이력 목록 조회
   */
  async getMessageSendHistories(
    request: MessageSendHistoriesRequest,
  ): Promise<MsgListResponse[]> {
    return await apiClient.get(`/api/messages/v1/send-historys/${request.targetUserId}`, {
      params: request,
    })
  },
}
