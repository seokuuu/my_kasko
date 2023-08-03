import { styled } from 'styled-components';

export const WhiteBtn = styled.button`
  font-size: ${props => props.fontSize}px;
  width: ${props => props.width}%;
  height: ${props => props.height}px;
  margin: ${props => props.margin};
  background-color: white;
  color: #061737;
  cursor: pointer;
  border: 1px solid #e1e1e1;
`;

export const BlackBtn = styled.button`
  font-size: ${props => props.fontSize}px;
  width: ${props => props.width}%;
  height: ${props => props.height}px;
  margin: ${props => props.margin}px;
  background-color: black;
  color: white;
  cursor: pointer;
  border: 1px solid #e1e1e1;
`;

export const BlueBtn = styled.button`
  font-size: ${props => props.fontSize}px;
  width: ${props => props.width}%;
  height: ${props => props.height}px;
  margin: ${props => props.margin}px;
  background-color: #061737;
  color: white;
  cursor: pointer;
`;

export const GreyBtn = styled.button`
  font-size: ${props => props.fontSize}px;
  width: ${props => props.width}%;
  height: ${props => props.height}px;
  margin: ${props => props.margin}px;
  background-color: #6b6b6b;
  color: white;
  cursor: pointer;
`;

export const WhiteRedBtn = styled.button`
  font-size: ${props => props.fontSize}px;
  width: ${props => props.width}%;
  height: ${props => props.height}px;
  margin: ${props => props.margin}px;
  border: 1px solid ${props => props.theme.colors.StatAlert};
  background-color: inherit;
  color: ${props => props.theme.colors.StatAlert};
  cursor: pointer;
  padding: 5px 10px 5px 10px;
  border-radius: 3px;
`;

export const SkyBtn = styled.button`
  font-size: ${props => props.fontSize}px;
  width: ${props => props.width}%;
  height: ${props => props.height}px;
  margin: ${props => props.margin}px;
  background-color: ${props => props.theme.colors.PriNormal};
  color: white;
  cursor: pointer;
  padding: 5px 10px 5px 10px;
  border-radius: 3px;
`;

export const BtnWrap = styled.div`
  display: flex;
  width: 400px;
  height: 50px;
  justify-content: space-evenly;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  bottom: ${props => props.bottom}px;
`;

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
