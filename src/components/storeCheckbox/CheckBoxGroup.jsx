import { useState } from 'react'
import { StyledCheckInput, StyledCheckLabel, StyledCheckText, Wrapper } from './styles'
// 아래 임포트 경로는 프로젝트 구조에 맞게 조정해야 할 수 있습니다.

/*
Feature
1. 상위 컴포넌트에서 체크박스 옵션 상태값을 선언
2. values값을 추출하기 위해서는 특정 로직으로 구현하여 추출해야함.
3. 체크된 values값을 할당하기 위해서 처음 체크박스에 대한 옵션값을 줄 때, options에서 checked 값을 할당해주면 됨.
4. options를 초기화해야하는 초기화 버튼이 있다고 했을 때, 상위 컴포넌트에서 처리 가능
*/

// 유동적으로 넘겨줄 값이 있다면 props로 전달
const stylesOption = {
  flexDirection: 'column',
  itemGap: 10,
  fontSize: 16,
  alignItems: '',
  justifyContent: '',
  wrapperWidth: 1000,
  labelColor: '#3B3B3B',
  boxSize: 15,
  checkedColor: 'red',
}

function CheckBoxGroup(props) {
  const { data, setData, groupName, fontSize = stylesOption.fontSize, justifyContent, alignItems } = props

  function onChange(e) {
    const { value, checked, name } = e.target

    setData((prevData) => ({
      ...prevData,
      [name]: data[name].map((o) => ({ ...o, checked: o.value === value ? checked : o.checked })),
    }))
    if (props.onCheckboxChange) {
      props.onCheckboxChange(checked)
    }
  }

  return (
    <Wrapper
      $itemGap={stylesOption.itemGap}
      $wrapperWidth={stylesOption.wrapperWidth}
      $flexDirection={stylesOption.flexDirection}
      $alignItems={alignItems}
    >
      {groupName
        ? data[groupName]?.map((o, i) => (
            <StyledCheckLabel
              key={i}
              $fontSize={fontSize}
              $labelColor={stylesOption.labelColor}
              $justifyContent={justifyContent}
            >
              <StyledCheckInput
                name={groupName}
                value={o.value}
                onChange={onChange}
                checked={o.checked}
                $boxSize={stylesOption.boxSize}
                $checkedColor={stylesOption.checkedColor}
                disabled={o.disabled}
              />
              <StyledCheckText>{o.label}</StyledCheckText>
            </StyledCheckLabel>
          ))
        : null}
    </Wrapper>
  )
}

export default CheckBoxGroup
