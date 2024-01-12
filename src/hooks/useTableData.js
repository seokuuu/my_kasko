import { useMemo } from "react";
import { add_element_field } from "../lib/tableHelpers";

/**
 * 
 * @param {object} param.tableField 테이블 필드 - add_element_field의 두번째 인자로 넘기는 값
 * @param {object} param.serverData 서버 데이터 - { pagination, list } 형식의 데이터
 * @returns tableRowData 테이블 데이터
 * @returns paginationData 페이지네이션 데이터
 * @returns totalWeight 총 중량
 */
export default function useTableData({ tableField, serverData }) {

    /**
     * 테이블 데이터
     * @description 테이블 컴포넌트에 PROPS로 전달하는 값
     */
    const tableRowData = useMemo(() => {
      if(!serverData || !serverData.list) {
        return [];
      }
      const rowData = serverData.list;
      const displayData = add_element_field(rowData.map((v, idx) => ({...v, index: idx + 1})), tableField);
      return displayData;
    }, [serverData]); // 테이블 노출 데이터

    /**
     * 페이지 데이터
     * @description 커스텀페이지네이션 컴포넌트에 PROPS로 전달하는 값
     */
    const paginationData = useMemo(() => {
      let initialData = { pageNum: 1, startPage: 1, endPage: 1, maxPage: 1, listCount: 0 };
      if(serverData && serverData.pagination) {
        initialData = serverData.pagination;
        initialData.endPage = Math.max(serverData.pagination.endPage, 1);
      }
      return initialData;
    }, [serverData]);

    // 총 중량 데이터
    const totalWeight = useMemo(() => (serverData && serverData.pagination)? serverData.pagination.totalWeight || 0 : 0 , [serverData]); 
    // 총 갯수 데이터

    return ({
      tableRowData,
      paginationData,
      totalWeight,
      totalCount: paginationData.listCount.toLocaleString()
    })
}