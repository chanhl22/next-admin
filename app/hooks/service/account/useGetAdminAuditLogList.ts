import { useGetQuery } from '@/app/api/utility/api';

interface AdminAuditLogDto {
    startAuditDatetime?: string;
    endAuditDatetime?: string;
    adminName?: string;
    authGroupName?: string;
    accessTypeName?: string;
}
export const useGetAdminAuditLogList = (param: AdminAuditLogDto = {}) => {
    return useGetQuery(
        ['getAdminAuditLogList', param],
        '/account/getAdminAuditLogList',
        param,
        {
            // staleTime: 1000 * 60,    // 1분
            // cacheTime: 1000 * 60 * 5,   // 5분
            staleTime: 0, // fresh 관리X
            cacheTime: 0,
        }
    );
};

