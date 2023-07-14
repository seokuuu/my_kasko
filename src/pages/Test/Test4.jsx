import React from 'react';
import { styled } from 'styled-components';
import TextEditor from './TestEditorForm';
import DateGrid from './DateGrid';

const Test4 = () => {
  const titleData = [
    '제품 번호',
    '클레임 등록 일자',
    '클레임 수정 일자',
    '두께(mm)',
    '폭(mm)',
    '길이(mm)',
    '규격약호',
    '중량(kg)',
    '매입처',
  ];
  const contentData = ['가', '나', '다', '라', '마', '바', '사', '아', '자'];

  return (
    <>
      <CenterRectangleWrap>
        <CRWMain>
          <h5>클레임 등록</h5>
          <ClaimTable>
            {[0, 1, 2].map(index => (
              <ClaimRow key={index}>
                {titleData.slice(index * 3, index * 3 + 3).map((title, idx) => (
                  <React.Fragment agmentkey={title}>
                    <ClaimTitle>{title}</ClaimTitle>
                    <ClaimContent>{contentData[index * 3 + idx]}</ClaimContent>
                  </React.Fragment>
                ))}
              </ClaimRow>
            ))}
          </ClaimTable>
          <h4>내용</h4>
          <TextEditor />
          <CRWMainBottom>
            <CMBLeft>
              <div>
                <DateTitle>클레임 요청 일자</DateTitle>
                <DateGrid />
              </div>
              <div>
                <DateTitle>현대 재철 클레임 등록 일자</DateTitle>
                <DateGrid />
              </div>
            </CMBLeft>
            <CMBLeft>
              <div>
                <DateTitle>클레임 진행 상태</DateTitle>
                <DateGrid />
              </div>
              <div>
                <DateTitle>반품 진행</DateTitle>
                <div>checkbox X 2</div>
              </div>
              <div>
                <DateTitle>카스코 반품일자</DateTitle>
                <DateGrid />
              </div>
              <div>
                <DateTitle>현대제철 반품일자</DateTitle>
                <DateGrid />
              </div>
            </CMBLeft>
          </CRWMainBottom>
          <CRWSub>
            <button>돌아가기</button>
            <button>저장</button>
          </CRWSub>
        </CRWMain>
      </CenterRectangleWrap>
    </>
  );
};

export default Test4;

export const CenterRectangleWrap = styled.div`
  width: 50%;
  height: min-content;

  display: flex;
  justify-content: center;
`;

export const CRWMain = styled.div`
  width: 100%;

  h4 {
    margin-top: 20px;
  }

  h5 {
    margin: 30px auto;
    text-align: center;
    font-size: 24px;
  }

  h6 {
    margin-bottom: 30px;
    text-align: center;
    font-size: 16px;
  }
`;

export const CRWMainBottom = styled.div`
  width: 100%;
  height: fit-content;

  margin: 10px 0px;
  display: flex;
  justify-content: space-around;
`;

export const CMBLeft = styled.div`
  max-width: 50%;

  > div {
    width: 400px;
    display: flex;
    justify-content: space-between;
  }
  height: fit-content;
`;

export const CMBRight = styled.div`
  max-width: 50%;

  > div {
    width: 300px;
    display: flex;
    justify-content: space-between;
  }
  height: fit-content;
`;

export const CRWSub = styled.div`
  display: flex;
`;

export const ClaimTable = styled.div`
  display: block;
`;
export const ClaimRow = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  font-size: 16px;
`;
export const ClaimTitle = styled.div`
  display: flex;
  border: 1px solid #c8c8c8;
  background-color: #dbe2f0;
  width: 16.66%;
  justify-content: center;
  align-items: center;
`;
export const ClaimContent = styled.div`
  display: flex;
  border: 1px solid #c8c8c8;
  width: 16.66%;
  justify-content: center;
  align-items: center;
`;

export const DateTitle = styled.div`
  min-width: 200px;
  max-width: 230px;
  padding: 10px;
  font-size: 16px;
`;
