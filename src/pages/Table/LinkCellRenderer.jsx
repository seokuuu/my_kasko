import styled from 'styled-components'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LinkCellRenderer({ data }) {
  // const current = window.location.href
  const navigate = useNavigate()
  // const handleClick = () => {}
  return (
    <LinkCell
      as={'button'}
      onClick={(e) => {
        navigate(`${data?.고유값}`, { state: { data: data } })
      }}
      style={{ color: 'blue' }}
    >
      {data?.작성일자}
    </LinkCell>
  )
}

const LinkCell = styled.div`
  color: #4c83d6;
  outline: none;
  text-decoration: underline;
  background: inherit;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  padding: 0;
`
