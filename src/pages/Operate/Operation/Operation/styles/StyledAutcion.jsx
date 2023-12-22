import { styled } from 'styled-components'

/**
 * @description
 * 전체 컨테이너
 */
export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

/**
 * @description
 * 내부 흰 박스 컨테이너
 */
export const InnerContainer = styled.div`
  background-color: #fcfcfc;
  height: ${({ height }) => `${height}px` || '200px'};
  width: 100%;
  padding: 32px;
`

/**
 * @description
 * 상단 내부 컨텐츠 컨테이너
 */
export const TopContentsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 80px;
  align-items: center;
`
/**
 * @description
 * 하단 내부 컨텐츠 컨테이너
 */
export const BottomContentsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 50px;
  align-items: center;
`

/**
 * @description
 * 시 분 컨테이너
 */
export const TimeInputContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

export const BottomInnerContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

/**
 * @description
 * 수직선
 */
export const VerticalBorder = styled.div`
  border: 0.5px solid #e1e1e1;
  width: 0.1px;
  height: 100%;
`

/**
 * @description
 * 버튼 컨테이너
 */
export const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 35px;
`

/**
 * @description
 * 필드
 */
export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  & > h2 {
    font-size: 15px;
  }
`
/**
 * @description
 *  인풋 컨테이너
 */
export const InputContainer = styled.div`
  width: ${({ width }) => `${width}px` && '100%'};
  display: flex;
  align-items: center;
  gap: 8px;

  & > span {
    font-size: 15px;
  }
`

/**
 * @description
 * 텍스트 필드 인풋
 */
export const AutionInput = styled.input`
  min-width: ${(props) => (props.width ? `${props.width}px` : '180px')};
  height: 32px;
  border: 1px solid #c8c8c8;
  font-size: 16px;
`
