import { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function TextCellRenderer({ data, value }) {
  const [fixed, setFixed] = useState(false)

  useEffect(() => {
    data.순번 === '고정' ? setFixed(true) : setFixed(false)
  }, [data.순번])
  return <FixTitle cellValue={fixed}>{data.제목}</FixTitle>
}

const FixTitle = styled.div`
  color: ${(props) => (props.cellValue ? '#B02525' : '')};
  font-weight: ${(props) => (props.cellValue ? 'bold' : '')};
`
