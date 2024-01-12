import { useEffect, useState } from "react";

/**
 * 목록 조회 파라미터 HOOK
 * @description 검색필터, 페이지사이즈, 페이지번호 값을 처리할 때 사용합니다.
 * 
 * @param {object} initialParams 초기 검색 파라미터 값
 * @param {number} initialParams.pageNum 페이지 번호
 * @param {number} initialParams.pageSize 페이지 사이즈
 * 
 * @returns searchParams 전체 검색 파라미터
 * @returns handleParamsChange 검색 파라미터 변경 핸들러 - 검색카테고리/페이지번호 변경
 * @returns handlePageSizeChange 페이지 사이즈 변경 핸들러
 * @returns handleParamsReset 파라미터 초기화 함수
 * @returns tempSearchParams 임시 검색 파라미터 
 * @returns setTempSearchParams 임시 검색 파라미터 변경 핸들러
 * @returns handleSearch 검색 핸들러
 */
export default function useTableSearchParams(initialParams) {
  // PARAMETER
  const [searchParams, setSearchParams] = useState(getParamsObjWithValue(initialParams));
  // NEW PARAMETER
  const [tempSearchParams, setTempSearchParams] = useState(initialParams);

  /**
   * 필터 핸들러
   * @param {object} newParam 파라미터 객체
   * @description 실제 페이지 조회 함수에 인자로 들어가는 파라미터 핸들러입니다.
   * - 페이지넘버 변경, 탭 카테고리 변경시 사용합니다.(값 변경 시 바로 검색)
   * - 이 외, 서치필터값 변경시에는 하단 handleTempParamsChange 핸들러를 사용합니다.
   * - 이 외, 페이지 사이즈 변경시에는 하단 handlePageSizeChange 핸들러를 사용합니다.
   */
  function handleParamsChange(newParam) {
    const newSearchParams = getParamsObjWithValue({...searchParams, ...newParam, ...(!newParam['pageNum']&& { pageNum: 1 })});
    setSearchParams(newSearchParams);
  }
  
  /**
   * 페이지 사이즈 변경 핸들러
   * @param {number} e : Select Element Event
   * @description 페이지사이즈 드롭다운 컴포넌트의 이벤트를 받아 처리하는 핸들러입니다.
   */
  function handlePageSizeChange(e) {
    const newSize = e.target.value;

    if(newSize !== searchParams.pageSize && !isNaN(newSize)) {
      handleParamsChange({ pageSize: newSize });
    }
  }

  /**
   * 임시 검색필터 핸들러
   * @param {object} newParam 파라미터 객체
   * @description [검색] 버튼 클릭 전 필터 값을 처리하는 핸들러입니다.
   * - 검색 필터 변경시 사용합니다.
   */
  function handleTempParamsChange(newParam) {
    setTempSearchParams(prevParam => ({...prevParam, ...newParam}));
  }

  /**
   * 검색 핸들러
   * @description 임시 검색 필터값을 실제 검색 필터에 할당하여 검색하도록 하는 핸들러입니다.
   */
  function handleSearch() {
    handleParamsChange({...tempSearchParams});
  }

  useEffect(() => {
    const newTempSearchParams = {...searchParams};
    if(newTempSearchParams) {
      delete newTempSearchParams.pageNum;
    }
    setTempSearchParams(newTempSearchParams);
  }, [searchParams])

  /**
   * 파라미터 초기화 함수
   */
  function handleParamsReset() {
    setSearchParams(getParamsObjWithValue(initialParams));
  }

  return ({
    searchParams,          // 전체 검색 파라미터
    handleParamsChange,    // 전체 검색 파라미터 변경 핸들러
    handlePageSizeChange,  // 페이지 사이즈 변경 핸들러
    handleParamsReset,     // 전체 검색 파라미터 초기화 함수
    tempSearchParams,      // 임시 검색 파라미터 
    handleTempParamsChange,// 임시 검색 파라미터 변경 핸들러
    handleSearch           // 검색 핸들러
  })
}

/**
 * 파라미터 객체 반환 함수
 * @param {object} paramsObj 파라미터 객체
 * @returns {object} 파라미터 객체(값 없는 키는 삭제)
 */
function getParamsObjWithValue(paramsObj) {
  const newParamsObj = {...paramsObj};
  for(const key in newParamsObj) {
    if(newParamsObj[key] === undefined || newParamsObj[key] === '') {
      delete newParamsObj[key];
    }
  }
  return newParamsObj;
}