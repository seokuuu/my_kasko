import { styled } from 'styled-components'
import Select from 'react-select'
import KaskoTheme from '../../styles/KaskoTheme'

export const CenterRectangleWrap = styled.div`
  width: 60%;
  height: min-content;
  display: flex;
  justify-content: center;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
`

// export const OnePageContainer = styled.div`
//   width: 70%;
//   font-size: 18px;
//   background-color: white;
//   margin-left: auto;
//   margin-right: auto;
//   border: 1px solid black;
//   min-height: 88vh;
//   max-height: 100vh;
// `

export const OnePageContainer = styled.div`
  min-width: 55%;
  width: fit-content;
  font-size: 18px;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  min-height: 100vh;
  max-height: 100vh;
`

export const OnePageFlexContainer = styled.div`
  width: 1200px;
  font-size: 18px;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
  min-height: 88vh;
  height: fit-content;
`

export const OnePageFlexSubContainer = styled.div`
  padding-left: 3%;
  padding-right: 3%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  font-size: 18px;

  h1 {
    font-size: 22px;
  }
`

// export const OnePageSubContainer = styled.div`
//   padding-left: 10%;
//   padding-right: 10%;
//   width: 100%;
//   margin-left: auto;
//   margin-right: auto;
// `

export const OnePageSubContainer = styled.div`
  width: 100%;
  padding: 0px 50px;
`

export const MainTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 24px;
  height: 110px;
  align-items: center;
`

export const Titles = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 24px;
  margin: 0px auto;
  height: 120px;
`

export const TitleChild = styled.div`
  font-size: 20px;
  width: 33%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ active }) => (active ? '1px solid #17479E' : '1px solid #e1e1e1')};
  color: ${({ active }) => (active ? '#17479e' : 'black')};

  &:hover {
    border: 1px solid #17479e;
    color: 1px solid #17479e;
    cursor: pointer;
  }
`

export const FullWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  border: 1px solid black;

  > textarea {
    border: 1px solid #c8c8c8;
    width: 100%;
  }
`

export const FWTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0px 10px 10px 10px;
  border-bottom: 2px solid black;

  h6 {
    font-size: 16px;
    color: #6b6b6b;
  }
`

export const HalfWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
`

export const Left = styled.div`
  width: 45%;
`

export const Right = styled.div`
  width: 45%;
`

export const Contour = styled.div`
  width: 95%;
  border-bottom: 1px solid #c1c1c1c5;
  margin: 20px auto;
`

export const Part = styled.div`
  margin-bottom: 20px;
  max-width: 345px;
`

export const Title = styled.div`
  display: flex;
  margin-bottom: 10px;
  p {
    position: relative;
    margin-left: 4px;
  }
`

export const FlexPart = styled.div`
  width: 500px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;

  span {
    color: ${(props) => props.theme.colors.StatAlert};
  }
`

export const FlexTitle = styled.div`
  width: 35%;
`

export const FlexContent = styled.div`
  width: 65%;
  display: flex;
`

export const OnePageSelect = styled(Select)`
  width: 200px;
  text-align: center;
  line-height: 26px;
  margin-right: 5px;
`

export const Alert = styled.p`
  font-size: 16px;
  color: ${KaskoTheme.colors.StatAlert};
`

export const At = styled.div`
  margin: 7px 7px;
`

export const FullWrap2 = styled.div`
  width: 100%;
  height: fit-content;
`

export const Bar = styled.div`
  border-bottom: 2px solid #f1f1f1;
  width: 103%;
  margin: 30px 0px;
`

export const EqualCheckWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 99%;
  font-size: 16px;
  margin-bottom: 5px;
`

export const AddBtn = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.PriNormal};
  border: 1px solid ${(props) => props.theme.colors.PriNormal};
  cursor: pointer;
  &:hover {
    border: 2px solid ${(props) => props.theme.colors.PriNormal};
  }
`
