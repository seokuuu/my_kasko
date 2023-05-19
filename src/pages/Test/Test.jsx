import React, { useState } from 'react';
import styled from 'styled-components';

const Test = () => {
  const [dropSwitch, setDropSwitch] = useState(false);

  const dropDownHandler = () => {
    if (dropSwitch === false) {
    }
  };
  return (
    <Container>
      <SDropDown>
        <DropImg
          src="/svg/drop_arrow.svg"
          onClick={() => {
            setDropSwitch(prev => !prev);
          }}
        />
        <SDropDown></SDropDown>
      </SDropDown>
    </Container>
  );
};

export default Test;

const Container = styled.div``;
const DropImg = styled.img`
  width: 20px;
  position: relative;
  right: -85px;
  cursor: pointer;
`;
const SDropDown = styled.div`
  width: 200px;
  height: 30px;
  border: 1px solid black;
`;
