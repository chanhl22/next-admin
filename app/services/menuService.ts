import { apiClient } from "@/libs/api/apiClient";
import { MenuResponse, MenuSettingsResponse, SaveMenuSettingsRequest } from "@/libs/types/menu.types";

export const menuService = {

  /**
   * 메뉴 목록 조회
   */
  async getMenus(): Promise<MenuResponse[]> {
    return await apiClient.get("/api/menus/v1");
  },

  /**
   * 운영자 메뉴별 권한 목록 조회
   */
  async getMenuSettings(): Promise<MenuSettingsResponse> {
    return await apiClient.get("/api/menus/v1/settings");
  },

  /**
   * 운영자 메뉴별 권한 저장
   */
  async createMenuSettings(request: SaveMenuSettingsRequest): Promise<void> {
    return await apiClient.put("/api/menus/v1/settings", request);
  },

}