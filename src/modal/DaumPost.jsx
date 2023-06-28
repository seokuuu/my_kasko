import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

const DaumPost = () => {
  const [postIsOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState('');

  const postHandleButtonClick = () => {
    setIsOpen(true);
  };

  const postHandleComplete = data => {
    const { address } = data;
    setAddress(address);
    setIsOpen(false);
  };

  const postHandleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={postHandleButtonClick}>우편번호 검색</button>
      <input type="text" value={address} readOnly />

      {postIsOpen && (
        <div>
          <DaumPostcode onComplete={postHandleComplete} />
          <button onClick={postHandleClose}>닫기</button>
        </div>
      )}
    </div>
  );
};

export default DaumPost;
