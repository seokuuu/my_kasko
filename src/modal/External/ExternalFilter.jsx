import { styled } from 'styled-components';

//외부 필터 영역 전체 + 테이블 영역 전체 (페이지 본문 div)
export const FilterContianer = styled.div`
  width: 100%;
`;

// 외부 필터 영역 (검색필터로 사라지는 부분)
export const FilterWrap = styled.div``;

// 외부 필터 헤드
export const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
  padding-right: 5px;
  height: 65px;
  align-items: center;

  h1 {
    font-weight: bold;
    font-size: 24px;
  }
`;

// 외부 필터 메인
export const FilterSubcontianer = styled.div`
  width: 100%;
  border: 1px solid #c8c8c8;
  display: flex;
  padding: 10px;
  padding-left: 30px;
  background-color: #dbe2f0;
  justify-content: space-between;
  color: ${props => props.theme.colors.TxtAlter};
`;

// FilterWrap에 한 줄만 있을 때, FilterSubContainer / FilterLeft / FilterRight 없이 단독으로 쓰임, + RowWrap에 none
export const FilterSubOneContainer = styled.div`
  width: 100%;
  border: 1px solid #c8c8c8;
  display: flex;
  padding: 10px;
  padding-left: 30px;
  background-color: #dbe2f0;
  color: ${props => props.theme.colors.TxtAlter};
`;

//초기화 , 검색 버튼 하단 영역 div
export const FilterFooter = styled.div`
  border: 1px solid #c8c8c8;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  background-color: #f0f1f6;
`;

// 검색 필터 Left
export const FilterLeft = styled.div``;

// 검색 필터 Right
export const FilterRight = styled.div`
  width: 300px;
`;

//검색 필터 내 한 '줄' 영역 div
export const RowWrap = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  margin: 10px 0px 10px 0px;
  border-bottom: ${({ none }) => (none ? 'none' : '1px solid #c8c8c8')};
  padding-bottom: 10px;
`;

// 말 그대로 파트 랩 (제목 + 내용 한 '칸'짜리 div)
export const PartWrap = styled.div`
  min-width: 150px;
  margin-right: 30px;
  display: flex;
  align-items: center;
  line-height: 14.5px;
  height: 50px;
  justify-content: space-around;
  h6 {
    width: 90px;
    max-width: 150px;

    display: flex;
    text-align: left;
  }
`;

// PartWrap의 오른쪽 부분 (제목 말고 내용)
export const PWRight = styled.div`
  width: 200px;
`;

export const DoubleWrap = styled.div`
  display: flex;
  padding: 10px 10px 0px 0px;
  p {
    width: 120px;
  }

  textarea {
    width: 300px;
    font-size: 18px;
  }
`;

// dataGrid 범위 div
export const GridWrap = styled.div`
  width: 400px;
  display: flex;
  padding: 15px;
`;

// externalFitler 공용 input
export const Input = styled.input`
  width: 145px;
  height: 37px;
  border-radius: 3px;
  border: 1px solid #c8c8c8;
`;

// 물결표
export const Tilde = styled.div`
  margin: 10px;
`;

// 초기화 이미지
export const ResetImg = styled.img`
  transition: transform 1s ease; /* Add a smooth transition effect */
  cursor: pointer;

  &.rotate {
    transform: rotate(540deg);
  }
`;

// 라디오박스 전체 div
export const ExRadioWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-left: 15px;
`;

// 체크박스 전체 div
export const ExCheckWrap = styled.div`
  display: flex;
  gap: 5px;
  margin-left: 13px;
  justify-content: center;
  align-items: center;

  p {
    font-size: 17px;
    margin-left: 3px;
  }
`;

// 체크박스 각각 div
export const ExCheckDiv = styled.div`
  display: flex;
  gap: 5px;
  margin-right: 20px;
  padding-left: 5px;
  justify-content: center;
  align-items: center;
`;

// input들 div
export const ExInputsWrap = styled.div`
  display: flex;
  padding-left: 15px;
`;

export const SubTitle = styled.div`
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid black;
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 18px;
  height: min-content;
  margin-top: 3px;

  h5 {
    font-weight: bold;
  }

  h6 {
    color: #6b6b6b;

    &:hover {
      font-weight: bold;
    }
  }
`;

export const TableTitle = styled.div`
  margin-left: 20px;
  padding: 20px 0px 10px;
  display: flex;
  align-items: center;
  gap: 20px;

  margin-top: 3px;
  h5 {
    font-weight: bold;
    font-size: 18px;
  }

  h6 {
    color: #6b6b6b;

    font-size: 18px;
  }
`;

// 테이블 부분 새로 만들어라 ------------------
// 테이블 부분 (하단) 컨테이너 ->

export const TableContianer = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #c8c8c8;
  padding: 30px;
  padding-top: 10px;
  background-color: #fcfcfc;
`;

export const TCSubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px 10px 2px;
  border-bottom: ${({ bor }) => (bor ? '1px solid #c8c8c8' : 'none')};
  font-size: 16px;

  span {
    color: ${props => props.theme.colors.PriNormal};
    margin: 0px 4px;
  }

  > div {
    display: flex;
  }
`;

export const HiddenBtn = styled.div`
  display: flex;
  color: ${props => props.theme.colors.TxtAlter};
  margin-left: 10px;

  img {
    display: flex;
  }
`;

export const PageSelect = styled.select`
  border: 1px solid #c8c8c8;
  padding-right: 20px;
`;

// 흰색 배경 알림 창
export const FilterHeaderAlert = styled.div`
  width: 100%;
  border: 2px solid #c8c8c8;
  background-color: white;
  margin-bottom: 10px;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 17px;
`;

export const FilterAlterTxt = styled.div`
  font-size: 18px;
  margin-top: 10px;
`;

export const FHALeft = styled.div`
  display: flex;
`;

export const InputStartWrap = styled.div`
  display: flex;
  margin-left: 15px;
`;

export const TableBottomWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 15px;
  button {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const AlertImg = styled.div`
  position: relative;
  top: -20px;
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
`;
