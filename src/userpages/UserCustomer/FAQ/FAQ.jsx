import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { add_element_field } from '../../../lib/tableHelpers'
import {
  FilterContianer,
  FilterHeader,
  SubTitle,
  TableContianer,
  TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import Table from '../../../pages/Table/Table'
import { categories, corLabels, responseToTableRowMap } from './faqTableSetup'
import { formatDateString } from '../../../utils/utils'

const FAQ = ({ faqList }) => {
  const [faqListData, setFaqListData] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('경매')
  const navigate = useNavigate()

  useEffect(() => {
    setFaqListData(formatTableRowData(faqList))
  }, [faqList, selectedCategory])

  const formatDate = (date) => {
    return formatDateString(date, '/')
  }

  const formatTableRowData = (faqList) => {
    if (!faqList || faqList.length === 0) return null

    const filteredList = faqList
      .map((e) => {
        e.createDate = formatDate(e.createDate)
        return e
      })
      .filter((faq) => faq.category === selectedCategory)

    return add_element_field(filteredList, responseToTableRowMap)
  }

  const getCategoryStyle = (category) => ({
    color: selectedCategory === category ? 'black' : 'grey',
    fontWeight: selectedCategory === category ? 'bold' : 'normal',
  })

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
  }

  const handleOnRowClicked = (row) => {
    const faqUid = row.data.uid
    navigate(`/userpage/userfaq/${faqUid}`)
  }

  return (
    <FilterContianer>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>FAQ</h1>
          <SubTitle>
            {categories.map((category, index) => (
              <button key={index} style={getCategoryStyle(category)} onClick={() => handleCategoryClick(category)}>
                {category}
              </button>
            ))}
          </SubTitle>
        </div>
      </FilterHeader>
      <TableContianer>
        <TCSubContainer bor>
          <div>게시글 목록 (123개 )</div>
          <div style={{ display: 'flex', gap: '10px' }}></div>
        </TCSubContainer>
        <Table getCol={corLabels} getRow={faqListData} isRowClickable={true} handleOnRowClicked={handleOnRowClicked} />
      </TableContianer>
    </FilterContianer>
  )
}

FAQ.propTypes = {
  faqList: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      count: PropTypes.number,
      createDate: PropTypes.string,
      title: PropTypes.string,
      uid: PropTypes.number,
    }),
  ),
}

export default FAQ
