import React, { useEffect, useState } from 'react'
import { CheckImg2, StyledCheckSubSquDiv } from '../../../../common/Check/CheckImg'
import { ExCheckDiv } from '../../../../modal/External/ExternalFilter'

/**
 * @description
 * 전체 옵션에 대한 체크박스입니다.
 * 체크를 하게 되면 상위 옵션이 모두 체크되게 하고 해체하면 모두 체크해제하게 합니다.
 * @param options 옵션값
 * @param setOptions setState
 */
const EntireCheck = ({ options, setOptions }) => {
  // 전체에 대한 상태값
  const [entireValue, setEntireValue] = useState(false)

  // 전체 체크박스 핸들러
  function onEntireCheckHandler() {
    setEntireValue(!entireValue)
  }

  // 전체 체크 여부에 따라 모든 옵션의 체크 여부를 결정합니다.
  useEffect(() => {
    setOptions(options.map((o) => ({ ...o, checked: entireValue })))
  }, [entireValue])
  return (
    <ExCheckDiv>
      <StyledCheckSubSquDiv isChecked={entireValue} onClick={onEntireCheckHandler}>
        <CheckImg2 src="/svg/check.svg" isChecked={entireValue} />
      </StyledCheckSubSquDiv>
      <p>전체</p>
    </ExCheckDiv>
  )
}

export default EntireCheck
