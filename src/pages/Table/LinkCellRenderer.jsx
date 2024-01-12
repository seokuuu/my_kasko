/* eslint-disable default-case */
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { packageDetailModal, packageModeAtom, selectPackageAtom } from '../../store/Layout/Layout'

export default function LinkCellRenderer({ data, uidFieldName, editType, moveUrl }) {
  // const current = window.location.href
  const navigate = useNavigate()
  const [mode, setMode] = useAtom(packageModeAtom)
  const [isModal, setIsModal] = useAtom(packageDetailModal)
  const [select, setSelet] = useAtom(selectPackageAtom)
  // const handleClick = () => {}
  const handleClick = () => {
    setMode('edit')

    return new Promise((resolve) =>
      setTimeout(() => {
        navigate(`${moveUrl}/${data[uidFieldName]}`, { state: { data: { data, mode: 'edit' } } })
        resolve()
      }, 100),
    )
  }
  const btnClieckedHandler = () => {
    switch (editType) {
      case 'openDetailModal':
        setIsModal(true)
        setSelet(data)
        break
      case 'LinkTo':
        handleClick()
    }
  }
  return (
    <LinkCell as={'button'} onClick={btnClieckedHandler} style={{ color: 'blue' }}>
      {data[uidFieldName]}
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
