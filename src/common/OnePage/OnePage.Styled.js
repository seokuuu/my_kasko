import { styled } from 'styled-components';
import Select from 'react-select';
import KaskoTheme from '../../styles/KaskoTheme';

export const CenterRectangleWrap = styled.div`
  width: 50%;
  height: min-content;
  display: flex;
  justify-content: center;
  border: 1px solid black;
`;

export const OnePageContainer = styled.div`
  width: 50%;
  border: 1px solid black;
  font-size: 18px;
`;

export const OnePageSubContainer = styled.div`
  padding-left: 10%;
  padding-right: 10%;
  width: 100%;
  border: 1px solid magenta;
  margin-left: auto;
  margin-right: auto;
`;

export const MainTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 24px;
  margin: 20px auto;
`;

export const FullWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  border: 1px solid black;
`;

export const HalfWrap = styled.div`
  justify-content: space-between;
  display: flex;
`;

export const Left = styled.div`
  width: 45%;
`;

export const Right = styled.div`
  width: 45%;
`;

export const Contour = styled.div`
  width: 95%;
  border-bottom: 1px solid #c1c1c1c5;
  margin: 20px auto;
`;

export const Part = styled.div`
  margin-bottom: 20px;
`;

export const Title = styled.div`
  display: flex;
  margin-bottom: 10px;
  p {
    position: relative;
    margin-left: 4px;
  }
`;

export const OnePageSelect = styled(Select)`
  width: 200px;
  text-align: center;
  line-height: 26px;
  margin-right: 5px;
`;

export const Alert = styled.p`
  font-size: 16px;
  color: ${KaskoTheme.colors.StatAlert};
`;

export const At = styled.div`
  margin: 7px 7px;
`;

export const FullWrap2 = styled.div`
  width: 100%;
  height: fit-content;
`;
