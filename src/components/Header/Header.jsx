import React from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

const Header = () => {
  //Header에 headerAtom 관리하는 스위치 만들어놓자
  return (
    <HeaderWrap>
      <div style={{ marginLeft: '20px' }}>
        <Link to={`/`}>
          <img src="/img/header_logo.png" />
        </Link>
      </div>
    </HeaderWrap>
  );
};

export default Header;

const HeaderWrap = styled.div`
  display: flex;
  height: 65px;
  width: 100%;
  min-width: 100%;
  background-color: #061737;
  border: 1px solid black;
  align-items: center;

  @media (max-width: 1844px) {
    width: 1200px;
  }
`;
