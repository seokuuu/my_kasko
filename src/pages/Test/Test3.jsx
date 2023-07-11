import React from 'react';
import { styled } from 'styled-components';
import Select from 'react-select';
import { depositOptions } from '../../common/Option/SignUp';

const Test3 = () => {
  return (
    <>
      <TestWrap>
        <TestSelelct
          options={depositOptions}
          defaultValue={depositOptions[0]}
        />
      </TestWrap>
    </>
  );
};

export default Test3;

const TestWrap = styled.div`
  width: 300px;
  height: 50px;
  border: 1px solid black;
`;

const TestSelelct = styled(Select)`
  width: 150px;
  text-align: center;
  line-height: 14.5px;
`;
