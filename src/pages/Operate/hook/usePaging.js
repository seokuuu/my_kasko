import { useMemo } from 'react'

/**
 * @description
 * 페이지네이션값과 핸들러를 반환해줍니다.
 * @param data 테이블 목록 데이터를 넣어주시면 됩니다.
 * @param setState 유동적으로 변경되는 검색 필터 관련 setState를 넣어주시면 됩니다.
 */
const usePaging = (data, setState) => {
  const pagination = useMemo(() => data && data.pagination, [data])

  function onPageChanage(page) {
    setState((p) => ({ ...p, pageNum: Number(page) }))
  }

  return { pagination, onPageChanage }
}

export default usePaging
