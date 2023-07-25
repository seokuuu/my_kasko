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
  width: 100%;
  height: 65px;
  background-color: #061737;
  border: 1px solid black;
  align-items: center;
`;
