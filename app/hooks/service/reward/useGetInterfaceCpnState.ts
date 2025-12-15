import { useGetQuery } from "@/app/api/utility/api";

interface PointItemCpnDtoRequest {
    pointItemCpnNo?: number;
}

export const useGetInterfaceCpnState  = (param: PointItemCpnDtoRequest = {}) => {
    return useGetQuery(
        ['getInterfaceCpnState', param],
        '/reward/getInterfaceCpnState',
        param,
        {
            staleTime: 0,   // fresh 관리X
            cacheTime: 0,   // fresh 관리X
            enabled: false,
        }
    );
};
