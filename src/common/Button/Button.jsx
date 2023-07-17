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
  margin: ${props => props.margin};
  background-color: black;
  color: white;
  cursor: pointer;
  border: 1px solid #e1e1e1;
`;

export const BlueBtn = styled.button`
  font-size: ${props => props.fontSize}px;
  width: ${props => props.width}%;
  height: ${props => props.height}px;
  margin: ${props => props.margin};
  background-color: #061737;
  color: white;
  cursor: pointer;
`;
