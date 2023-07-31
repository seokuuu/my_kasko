import { styled } from 'styled-components';

//외부 필터 영역 전체 + 테이블 영역 전체
export const FilterContianer = styled.div`
  width: 100%;
`;

// 검색필터로 사라지는 부분
export const FilterWrap = styled.div``;

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

// 검색 필터 메인
export const FilterSubcontianer = styled.div`
  width: 100%;
  border: 1px solid #c8c8c8;
  display: flex;
  padding: 10px;
  padding-left: 30px;
  background-color: #dbe2f0;
  justify-content: space-around;
  color: ${props => props.theme.colors.TxtAlter};
`;

// 검색 필터 Left
export const FilterLeft = styled.div``;

// 검색 필터 Right
export const FilterRight = styled.div``;

//검색 필터 내 한 줄 div
export const RowWrap = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  margin: 10px 0px 10px 0px;
  border-bottom: 1px solid #c8c8c8;
  padding-bottom: 10px;
`;

// 말 그대로 파트 랩
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
    display: flex;
    justify-content: start;
  }
`;

// PartWrap의 오른쪽 부분 (제목 말고 내용)
export const PWRight = styled.div`
  width: 200px;
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

// 테이블 부분 새로 만들어라 ------------------
// 테이블 부분 (하단) 컨테이너 ->

export const TableContianer = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #c8c8c8;
  display: flex;
  padding: 10px;
`;
