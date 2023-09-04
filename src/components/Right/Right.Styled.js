import { styled } from 'styled-components'

export const RightBarWrap = styled.div`
  position: absolute;
  right: 0;
  bottom: 35%;
  width: 100px;
  height: 250px;
  display: flex;
  overflow-x: hidden;
  text-align: center;
  justify-content: space-between;
`

export const RightBarLeft = styled.div`
  margin-top: auto;
  margin-bottom: auto;

  > img {
    margin: 5px;
    cursor: pointer;
  }

  transform: translateX(${({ isRightBarRotated }) => (isRightBarRotated ? '100%' : '0')});
  opacity: ${({ isRightBarRotated }) => (isRightBarRotated ? '0' : '1')};
  transition: transform 0.4s ease, opacity 0.4s ease;
`

export const RightBarRight = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  transform: rotate(${({ isRightBarRotated }) => (isRightBarRotated ? '0' : '0')}); /* 이미지 회전 효과 */
  transition: transform 0.3s ease; /* 회전에 대한 트랜지션 추가 */
  cursor: pointer;
`
