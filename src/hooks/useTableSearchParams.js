import { useState } from "react";

/**
 * 목록 조회 파라미터 HOOK
 * @description 검색필터, 페이지사이즈, 페이지번호 값을 처리할 때 사용합니다.
 * 
 * @param {object} initialParams 초기 검색 파라미터 값
 * @param {number} initialParams.pageNum 페이지 번호
 * @param {number} initialParams.pageSize 페이지 사이즈
 * 
 * @returns searchParams 전체 검색 파라미터
 * @returns handleParamsChange 검색 파라미터 변경 핸들러 - 검색필터/페이지번호 변경
 * @returns handlePageSizeChange 페이지 사이즈 변경 핸들러
 * @returns handleParamsReset 파라미터 초기화 함수
 */
export default function useTableSearchParams(initialParams) {
  // PARAMETER
  const [searchParams, setSearchParams] = useState(initialParams);

  /**
   * 필터 핸들러
   * @param {object} param 파라미터 객체
   * @description 페이지 제외 항목 변경시, 페이지를 초기화합니다.
   */
  function handleParamsChange(newParam) {
    setSearchParams(prevParam => ({
      ...prevParam,
      ...newParam,
      ...(!newParam['page']&& { page: 1 })
    }));
  }
  
  /**
   * 조회갯수 변경 핸들러
   * @param {number} e : Select Element Event
   */
  function handlePageSizeChange(e) {
    const newSize = e.target.value;

    if(newSize !== searchParams.pageSize && !isNaN(newSize)) {
      handleParamsChange({ pageSize: newSize });
    }
  }

  /**
   * 파라미터 초기화 함수
   */
  function handleParamsReset() {
    setSearchParams(initialParams);
  }

  return ({
    searchParams,          // 전체 검색 파라미터
    handleParamsChange,    // 전체 검색 파라미터 변경 핸들러
    handlePageSizeChange,  // 페이지 사이즈 변경 핸들러
    handleParamsReset      // 전체 검색 파라미터 초기화 함수
  })
}