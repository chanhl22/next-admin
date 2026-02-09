import { NextRequest } from "next/server";
import { STORAGE_KEYS } from "@/libs/constants/storage";

export const tokenService = {

  /**
   * Authorization 헤더 값 반환
   */
  getAuthorizationHeader(request: NextRequest): string | undefined {
    const token = this.getAccessToken(request);
    return token ? `Bearer ${token}` : undefined;
  },

  /**
   * 저장된 액세스 토큰 조회
   */
  getAccessToken(request: NextRequest): string | undefined {
    return request.cookies.get(STORAGE_KEYS.ACCESS_TOKEN)?.value;
  },

}
