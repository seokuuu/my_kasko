import React from 'react'
import { PageSelect } from '../../modal/External/ExternalFilter'

const PageDropdown = ({ handleDropdown }) => {
  return (
    <PageSelect name="pagenation" onChange={handleDropdown}>
      <option value="50">50개씩</option>
      <option value="100">100개씩</option>
      <option value="500">500개씩</option>
      <option value="1000">1000개씩</option>
      <option value="10000">10000개씩</option>
    </PageSelect>
  )
}

export default PageDropdown
