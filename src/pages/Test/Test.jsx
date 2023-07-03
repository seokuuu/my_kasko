import React, { useState, useEffect } from 'react';

const LoginForm = () => {
  const [id, setId] = useState('');
  const [rememberId, setRememberId] = useState(false);
  // 이걸 check로 써도 될 듯

  useEffect(() => {
    const savedId = getSavedIdFromLocalStorage();
    if (savedId) {
      setId(savedId);
      setRememberId(true);
    }
  }, []);

  const handleIdChange = event => {
    setId(event.target.value);
  };

  const handleSaveId = () => {
    if (rememberId) {
      saveIdToLocalStorage(id);
    } else {
      removeSavedIdFromLocalStorage();
    }
  };

  const saveIdToLocalStorage = id => {
    localStorage.setItem('savedId', id);
  };

  const removeSavedIdFromLocalStorage = () => {
    localStorage.removeItem('savedId');
  };

  const getSavedIdFromLocalStorage = () => {
    return localStorage.getItem('savedId');
  };

  const handleRememberIdChange = () => {
    setRememberId(!rememberId, () => {
      if (!rememberId) {
        setId('');
      }
    });
  };

  return (
    <div>
      <label htmlFor="id">아이디:</label>
      <input type="text" id="id" value={id} onChange={handleIdChange} />

      <label htmlFor="rememberId">
        <input
          type="checkbox"
          id="rememberId"
          checked={rememberId}
          onChange={handleRememberIdChange}
        />
        아이디 저장
      </label>

      <button onClick={handleSaveId}>로그인</button>
    </div>
  );
};

export default LoginForm;
