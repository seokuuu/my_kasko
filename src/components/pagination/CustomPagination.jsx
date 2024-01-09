import styled from 'styled-components'

const PageContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const PageNum = styled.div`
  padding: 12px;
  color: ${(props) => (props.isPage ? '#333' : '#ACACAC')};
  font-size: 15px;
  font-weight: ${(props) => (props.isPage ? 'bold' : 'normal')};
  cursor: pointer;
`

/**
 * TODO pagination components
 * @param onPageChange 페이지 체인지 이벤트
 * @param pagination 서버에서 전달받은 페이지 데이터
 */
const CustomPagination = ({ pagination, onPageChange }) => {
  const pageNumbers = []
  /**
   * 페이지 정보
   * @param pageNum 현재 페이지
   * @param startPage 시작페이지
   * @param endPage 끝 페이지
   * @param maxPage 최대 페이지 수
   * @param listCount 총 개수
   */
  const { pageNum: currentPage, startPage, endPage, maxPage, listCount } = pagination

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    listCount > 0 && (
      <PageContainer>
        {startPage > pageNumbers.length && (
          <button style={{ backgroundColor: 'transparent' }} onClick={() => onPageChange(startPage - 1)}>
            <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M14 3h-2L7 8l5 5h2L9 8z" />
              <path fill="currentColor" d="M9 3H7L2 8l5 5h2L4 8z" />
            </svg>
          </button>
        )}
        {currentPage > 1 && (
          <button style={{ backgroundColor: 'transparent' }} onClick={() => onPageChange(currentPage - 1)}>
            <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M12 13h-2L5 8l5-5h2L7 8z" />
            </svg>
          </button>
        )}
        {pageNumbers.map((page) => (
          <PageNum isPage={page === currentPage} onClick={() => onPageChange(page)}>
            {page}
          </PageNum>
        ))}
        {currentPage < maxPage && (
          <button style={{ backgroundColor: 'transparent' }} onClick={() => onPageChange(currentPage + 1)}>
            <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path fill="#000000" d="M4 13h2l5-5l-5-5H4l5 5z" />
            </svg>
          </button>
        )}
        {maxPage > endPage && (
          <button style={{ backgroundColor: 'transparent' }} onClick={() => onPageChange(endPage + 1)}>
            <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path fill="#000000" d="M2 13h2l5-5l-5-5H2l5 5z" />
              <path fill="#000000" d="M7 13h2l5-5l-5-5H7l5 5z" />
            </svg>
          </button>
        )}
      </PageContainer>
    )
  )
}

export default CustomPagination
