import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import { requestSingleModify } from '../../store/Layout/Layout'
export default function InputCellRenderer({ data, uidFieldName, valueName, type }) {
  const [request, setRequest] = useAtom(requestSingleModify)

  const handleChange = (e) => {
    setRequest((p) => ({ [valueName]: e.currentTarget.value }))
    console.log('DATA', request)
  }
  // useEffect(() => {
  //   setRequest((p) => ({ [valueName]: data[uidFieldName] }))
  // }, [data])

  return (
    <>
      {type === 'select' ? (
        <Select>{data[uidFieldName]}</Select>
      ) : (
        <Input readOnly name={valueName} value={data[uidFieldName]} onChange={handleChange} />
      )}
    </>
  )
}

const Input = styled.input`
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 90px;
  height: 36px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`
const Select = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 4px;
  gap: 8px;
  span {
    text-align: center;
    margin: 0 auto;
    width: 17px;
    height: auto;
    font-size: 35px;
  }
`
