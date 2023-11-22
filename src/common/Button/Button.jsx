import { styled } from 'styled-components'

export const WhiteBtn = styled.button`
  font-size: ${(props) => props.fontSize}px;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}px;
  margin: ${(props) => props.margin};
  background-color: white;
  color: #061737;
  cursor: pointer;
  border: 1px solid #e1e1e1;
`

export const BlackBtn = styled.button`
  font-size: ${(props) => props.fontSize}px;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}px;
  margin: ${(props) => props.margin}px;
  background-color: #202020;
  color: white;
  cursor: pointer;
  border: 1px solid #e1e1e1;
`

export const GreenBtn = styled.button`
  font-size: ${(props) => props.fontSize}px;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}px;
  margin: ${(props) => props.margin}px;
  background-color: ${(props) => props.theme.colors.StatPosub};
  color: white;
  cursor: pointer;
  padding: 5px 10px 5px 10px;
`

export const RedBtn = styled.button`
  font-size: ${(props) => props.fontSize}px;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}px;
  margin: ${(props) => props.margin}px;
  background-color: #b02525;
  color: white;
  cursor: pointer;
  border: 1px solid #e1e1e1;
`

export const BlueBtn = styled.button`
  font-size: ${(props) => props.fontSize}px;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}px;
  margin: ${(props) => props.margin}px;
  background-color: #061737;
  color: white;
  cursor: pointer;
`

export const IndigoBtn = styled.button`
  font-size: ${(props) => props.fontSize}px;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}px;
  margin: ${(props) => props.margin}px;
  background-color: ${(props) => props.theme.colors.StatPosub};
  color: white;
  cursor: pointer;
`

export const GreyBtn = styled.button`
  font-size: ${(props) => props.fontSize}px;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}px;
  margin: ${(props) => props.margin}px;
  background-color: #6b6b6b;
  color: white;
  cursor: pointer;
`

// 테이블 내 작은 버튼
export const YellBtn = styled.button`
  font-size: ${(props) => props.fontSize}px;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}px;
  margin: ${(props) => props.margin}px;
  background-color: ${(props) => props.theme.colors.StatCaut};
  color: white;
  cursor: pointer;
  padding: 5px 10px 5px 10px;
  border-radius: 3px;
`

export const TGreyBtn = styled.button`
  font-size: ${(props) => props.fontSize}px;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}px;
  margin: ${(props) => props.margin}px;
  background-color: ${(props) => props.theme.colors.TxtAlter};
  color: white;
  cursor: pointer;
  padding: 5px 10px 5px 10px;
  border-radius: 3px;
`

export const TWhiteBtn = styled.button`
  font-size: ${(props) => props.fontSize}px;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}px;
  margin: ${(props) => props.margin}px;
  background-color: white;
  color: ${(props) => props.theme.colors.TxtAlter};
  border: 1px solid ${(props) => props.theme.colors.TxtAlter};
  cursor: pointer;
  padding: 4px 10px 4px 10px;
  border-radius: 3px;
`

export const WhiteBlackBtn = styled.div`
  font-size: ${(props) => props.fontSize}px;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}px;
  margin: ${(props) => props.margin}px;
  border: 1px solid black;
  background-color: inherit;
  color: black;
  cursor: pointer;
  padding: 5px 10px 5px 10px;
  border-radius: 3px;
  display: flex;
  align-items: center;

  img {
    margin-right: 3px;
  }
`
export const WhiteSkyBtn = styled.div`
  font-size: ${(props) => props.fontSize}px;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}px;
  margin: ${(props) => props.margin}px;
  border: 1px solid ${(props) => props.theme.colors.PriNormal};
  background-color: inherit;
  color: ${(props) => (props.str ? props.theme.colors.PriStrong : props.theme.colors.PriNormal)};

  cursor: pointer;
  padding: 5px 10px 5px 10px;
  border-radius: 3px;

  img {
    margin-right: 5px;
  }
`

export const WhiteGrnBtn = styled.div`
  font-size: ${(props) => props.fontSize}px;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}px;
  margin: ${(props) => props.margin}px;
  border: 1px solid ${(props) => props.theme.colors.StatPosub};
  background-color: inherit;
  color: ${(props) => props.theme.colors.StatPosub};
  cursor: pointer;
  padding: 5px 10px 5px 10px;
  border-radius: 3px;
  display: flex;
  align-items: center;

  img {
    display: flex;
    margin-right: 5px;
  }
`

export const WhiteRedBtn = styled.div`
  font-size: ${(props) => props.fontSize}px;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}px;
  margin: ${(props) => props.margin}px;
  border: 1px solid ${(props) => props.theme.colors.StatAlert};
  background-color: inherit;
  color: ${(props) => props.theme.colors.StatAlert};
  cursor: pointer;
  padding: 5px 10px 5px 10px;
  border-radius: 3px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  img {
    margin-right: 5px;
  }
`

export const SkyBtn = styled.button`
  font-size: ${(props) => props.fontSize}px;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}px;
  margin: ${(props) => props.margin}px;
  background-color: ${(props) => props.theme.colors.PriNormal};
  color: white;
  cursor: pointer;
  padding: 5px 10px 5px 10px;
  border-radius: 3px;
`

export const ExcelBtn = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #c8c8c8;
  padding: 0px 5px 0px 5px;
  cursor: pointer;

  img {
    margin-right: 3px;
  }
`

export const SwitchBtn = styled.button`
  font-size: ${(props) => props.fontSize}px;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}px;
  margin: ${(props) => props.margin}px;
  background-color: #969798;
  color: white;
  cursor: pointer;
  padding: 5px 10px 5px 10px;
  border-radius: 3px;
`

export const BtnWrap = styled.div`
  display: flex;
  width: 400px;
  height: 50px;
  justify-content: space-evenly;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  bottom: ${(props) => props.bottom}px;
`

export const TBtnWrap = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

export const BtnBound = styled.div`
  border-right: 1px solid #c8c8c8;
  width: 1px;
  margin-top: 4px;
  height: 25px;
`

// <BtnWrap>
//   <WhiteBtn
//     width={90}
//     height={50}
//     style={{ marginRight: '10px' }}
//   >
//     돌아가기
//   </WhiteBtn>
//   <BlackBtn width={90} height={50}>
//     저장
//   </BlackBtn>
// </BtnWrap>;
