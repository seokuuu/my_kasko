const PagingComp = ({
  currentPage,
  totalPage,
  onPageChange,
  goToNextPage,
  goToPreviousPage,
  goToLastPage,
  goToStartOfRange,
}) => {
  return (
    <>
      {totalPage ? (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ backgroundColor: 'transparent' }} onClick={goToStartOfRange}>
            <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M14 3h-2L7 8l5 5h2L9 8z" />
              <path fill="currentColor" d="M9 3H7L2 8l5 5h2L4 8z" />
            </svg>
          </button>
          <button style={{ backgroundColor: 'transparent' }} onClick={goToPreviousPage}>
            <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M12 13h-2L5 8l5-5h2L7 8z" />
            </svg>
          </button>

          <CustomPagination currentPage={currentPage} totalPage={totalPage} onPageChange={onPageChange} />
          <button style={{ backgroundColor: 'transparent' }} onClick={goToNextPage}>
            <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path fill="#000000" d="M4 13h2l5-5l-5-5H4l5 5z" />
            </svg>
          </button>
          <button style={{ backgroundColor: 'transparent' }} onClick={goToLastPage}>
            <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path fill="#000000" d="M2 13h2l5-5l-5-5H2l5 5z" />
              <path fill="#000000" d="M7 13h2l5-5l-5-5H7l5 5z" />
            </svg>
          </button>
        </div>
      ) : (
        <div style={{ display: 'none' }}></div>
      )}
    </>
  )
}
export default PagingComp

/**
 * @내장_Component :페이지네이션 컴포넌트
 */
const CustomPagination = ({ currentPage, totalPage, onPageChange }) => {
  const pageNumbers = []
  const pagesPerGroup = 5
  const currentGroup = Math.ceil(currentPage / pagesPerGroup)
  const startPage = (currentGroup - 1) * pagesPerGroup + 1
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPage)

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <div style={{ gap: '15px', display: 'flex' }}>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          disabled={currentPage === number}
          style={{
            fontSize: '15px',
            color: currentPage === number ? '#202020' : '#ACACAC',
            backgroundColor: 'transparent',
          }}
        >
          {number}
        </button>
      ))}
    </div>
  )
}
