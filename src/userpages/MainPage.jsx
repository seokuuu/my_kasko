import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../common/Overall/Overall.styled';

import UserSideBar from '../components/Left/UserSideBar';
import Header from '../components/Header/Header';
import SubHeader from '../components/Header/SubHeader';
import Test3 from '../pages/Test/Test3';

import { useState } from 'react';
import { styled } from 'styled-components';
import { Bar } from '../common/OnePage/OnePage.Styled';

const MainPage = () => {
  const [expanded, setExpanded] = useState('');
  const [depth2Color, setDepth2Color] = useState('');
  return (
    <>
      <Header />
      <OverAllMain>
        <UserSideBar
          expanded={expanded}
          setExpanded={setExpanded}
          depth2Color={depth2Color}
        />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <MainWrap>
              <Left>
                <h1>카스코 추천 제품</h1>
                <LeftSub1>
                  <Title>
                    <h5>단일</h5>
                    <h6>패키지</h6>
                  </Title>
                  <div>
                    <Test3 hei={60} />
                  </div>
                </LeftSub1>
                <LeftSub2>
                  <Title>
                    <h5>공지사항</h5>
                    <h6>자료실</h6>
                  </Title>
                  <Bar style={{ margin: '15px' }} />
                  <Board>
                    <BoardLeft high>
                      상단 노출 게시글 제목 영역입니다.
                    </BoardLeft>
                    <BoardRight high>2023.06.12</BoardRight>
                  </Board>
                  <Board>
                    <BoardLeft high>
                      상단 노출 게시글 제목 영역입니다.
                    </BoardLeft>
                    <BoardRight high>2023.06.12</BoardRight>
                  </Board>
                  <Board>
                    <BoardLeft>상단 노출 게시글 제목 영역입니다.</BoardLeft>
                    <BoardRight>2023.06.12</BoardRight>
                  </Board>
                  <Board>
                    <BoardLeft>상단 노출 게시글 제목 영역입니다.</BoardLeft>
                    <BoardRight>2023.06.12</BoardRight>
                  </Board>
                </LeftSub2>
              </Left>
              <Right>
                <h1>선호하는 제품</h1>
                <RightSub>
                  <Title>
                    <h5>옵션 1</h5>
                    <h6>옵션 2</h6>
                  </Title>

                  <div>
                    <Test3 hei={135} />
                  </div>
                </RightSub>
              </Right>
            </MainWrap>
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default MainPage;

const MainWrap = styled.div`
  width: 1450px;

  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-around;

  h1 {
    font-size: 22px;
    padding: 15px 0px;
    font-weight: bold;
  }

  h5 {
    font-size: 18px;
    color: ${props => props.theme.colors.PriNormal};
  }
  h6 {
    font-size: 18px;
  }
`;

const Left = styled.div`
  width: 50%;

  height: 40vw;
`;

const LeftSub1 = styled.div`
  width: 99%;
  height: 380px;

  padding: 20px;

  background-color: White;
  border: 1px solid #c8c8c8;
  margin-bottom: 20px;
`;
const LeftSub2 = styled.div`
  padding: 20px;
  background-color: White;
  width: 99%;
  height: 380px;
  border: 1px solid #c8c8c8;
`;
const Right = styled.div`
  width: 50%;
  height: 40vw;
`;

const RightSub = styled.div`
  border: 1px solid #c8c8c8;
  padding: 20px;
  gap: 10px;
  width: 99%;
  height: 780px;
  background-color: White;
`;

const Title = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const Board = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  font-size: 18px;
`;

const BoardLeft = styled.div`
  color: ${({ theme, high }) => (high ? theme.colors.StatAlert : 'black')};
  font-weight: ${({ high }) => (high ? 'bold' : 'normal')};
`;

const BoardRight = styled.div`
  color: ${({ theme, high }) => (high ? theme.colors.LineAlert : 'black')};
  font-size: 16px;
`;
