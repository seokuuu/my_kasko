import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Container,
  SignupContainer,
  PartBlock,
  Part,
  Top,
  Main,
  Left,
  Right,
  Bottom,
  BottomItem,
  TxtDiv,
  SDropDown,
  BottomP,
  CheckBtn,
  Init,
} from './SignUp.Styled';
import {
  TxtInput,
  TxtCheckInput,
  TxtDropInput,
  SInput,
} from '../../common/input/Input';

const SignUp = () => {
  const dummy = [
    {
      userID: 'test1',
      name: 'handongwon',
      date: '2023.01.23',
      contents: '올리닉 프로바이오틱스 100억마리',
    },
  ];

  const [id, setId] = useState('');
  const [idPlaceholder, setIdPlaceholder] = useState('');
  const [idPlaceholderColor, setIdPlaceholderColor] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const idRegex = /^(?=.*[a-z])(?=.*\d)[a-z0-9]{4,12}$/;
  const isIdValid = idRegex.test(id);
  const [isFocused, setIsFocused] = useState(false);
  const [dupleCheck, setDupleCheck] = useState(false);

  // ID event 및 정규식 체크
  const handleIdChange = useCallback(
    e => {
      const value = e.target.value;
      setId(value);

      if (isIdValid === false) {
        setIdPlaceholderColor('red');
        setIdPlaceholder('4~12자리 소문자와 숫자 조합으로 입력해주세요.');
      } else {
        setIdPlaceholderColor('red');
        setIdPlaceholder('중복 확인이 필요해요.');
      }
    },
    [isIdValid]
  );

  // ID Focus & Blur 스위치
  const handleIdFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleIdBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  // ID 중복 확인
  const handleDuplicateCheck = () => {
    const isDuplicate = id === dummy.userID;
    if (isDuplicate) {
      setDupleCheck(false);
      setIdPlaceholderColor('blue');
      setIdPlaceholder('이미 사용중인 아이디 입니다.');
    } else {
      setDupleCheck(true);
      setIdPlaceholder('사용 가능한 아이디입니다.');
      //  여기에 중복체크 상태와 data에 아이디도 넣기
    }
  };

  useEffect(() => {}, [idPlaceholder]);
  console.log('idPlaceholder =>', idPlaceholder);

  console.log('dupleCheck =>', dupleCheck);

  return (
    <Container>
      <SignupContainer>
        <Top>회원가입</Top>
        <Main>
          <Left>
            <PartBlock>
              <Part>
                <h4>아이디</h4>
                <div>
                  <p>
                    {isFocused && idPlaceholder && id ? (
                      <p style={{ color: idPlaceholderColor }}>
                        {idPlaceholder}
                      </p>
                    ) : dupleCheck && idPlaceholder && !isFocused && id ? (
                      <p style={{ color: 'blue' }}>{idPlaceholder}</p>
                    ) : null}
                  </p>
                  <TxtCheckInput
                    type="text"
                    value={id}
                    onChange={handleIdChange}
                    onFocus={handleIdFocus}
                    onBlur={handleIdBlur}
                    borderColor={idPlaceholderColor}
                  />
                  {isIdValid === false ? (
                    <CheckBtn disabled>중복 확인</CheckBtn>
                  ) : (
                    <CheckBtn onClick={handleDuplicateCheck} type="button">
                      중복 확인
                    </CheckBtn>
                  )}
                </div>
              </Part>
              <Part>
                <h4>비밀번호</h4>
                <div>
                  <TxtInput
                    placeholder="영문, 숫자 조합 8~12자리"
                    type="password"
                  />
                </div>
              </Part>
              <Part>
                <h4>비밀번호 확인</h4>
                <div>
                  <TxtInput placeholder="비밀번호 재입력" type="password" />
                </div>
              </Part>
            </PartBlock>
            <PartBlock>
              <Part>
                <h4>사업자 구분</h4>
                ㅋㅋ
                <input type="radio"></input>
                ㅋㅋ
                <input type="radio"></input>
                ㅋㅋ
                <input type="radio"></input>
              </Part>
              <Part>
                <h4>회사 명</h4>
                <div>
                  <TxtInput />
                </div>
              </Part>
              <Part>
                <h4>대표자 성명</h4>
                <div>
                  <TxtInput />
                </div>
              </Part>
              <Part>
                <h4>대표 연락처</h4>
                <div>
                  <TxtInput placeholder="연락처 입력('-' 제외)" />
                </div>
              </Part>
              <Part>
                <h4>팩스 번호</h4>
                <div>
                  <TxtInput placeholder="팩스번호 입력('-' 제외)" />
                </div>
              </Part>
              <Part>
                <h4>주소</h4>
                <div>
                  <TxtCheckInput />
                  <CheckBtn
                    style={{ backgroundColor: 'black', color: 'white' }}
                  >
                    찾기
                  </CheckBtn>
                  <TxtInput placeholder="상세 주소를 입력해 주세요." />
                </div>
              </Part>
            </PartBlock>
            <PartBlock>
              <Part>
                <h4>입금 담당자 정보</h4>
                <div style={{ display: 'flex' }}>
                  <SDropDown></SDropDown>
                  <TxtDropInput placeholder="담당자 성함 입력" />
                </div>
              </Part>
              <Part>
                <h4>휴대폰 번호</h4>
                <TxtInput placeholder="연락처 입력('-' 제외)" />
                <BottomP>
                  <input type="checkbox" style={{ marginRight: '5px' }} />
                  경매 담당자 정보와 동일
                </BottomP>
              </Part>
            </PartBlock>
          </Left>
          <Right>
            <PartBlock>
              <Part>
                <h4>입금 담당자 정보</h4>
                <div style={{ display: 'flex' }}>
                  <SDropDown></SDropDown>
                  <TxtDropInput placeholder="담당자 성함 입력" />
                </div>
              </Part>
              <Part>
                <h4>이메일</h4>
                <div style={{ display: 'flex' }}>
                  <SInput /> @ <SDropDown></SDropDown>
                </div>
              </Part>
              <Part>
                <h4>휴대폰 번호</h4>
                <TxtInput placeholder="연락처 입력('-' 제외)" />
              </Part>
            </PartBlock>
            <PartBlock>
              <Part>
                <h4>업태 선택</h4>
                ㅋㅋ
                <input type="radio"></input>
                ㅋㅋ
                <input type="radio"></input>
              </Part>
              <Part>
                <h4>사업자 번호</h4>
                <div>
                  <TxtCheckInput placeholder="사업자 번호 입력('-' 제외)" />
                  <CheckBtn>중복확인</CheckBtn>
                </div>
              </Part>
              <Part>
                <h4>사업자 등록증</h4>
                <TxtDiv></TxtDiv>
              </Part>
              <Part>
                <h4>통장 사본</h4>
                <TxtDiv></TxtDiv>
              </Part>
              <Part>
                <h4>계좌번호</h4>
                <SDropDown></SDropDown>
                <TxtInput placeholder="(계좌번호 입력('-' 제외)" />
              </Part>
            </PartBlock>
            <PartBlock style={{ marginTop: '138px' }}>
              <Part>
                <h4>출고 담당자 정보</h4>
                <div style={{ display: 'flex' }}>
                  <SDropDown></SDropDown>
                  <TxtDropInput placeholder="담당자 성함 입력" />
                </div>
              </Part>
              <Part>
                <h4>휴대폰 번호</h4>
                <TxtInput placeholder="연락처 입력('-' 제외)" />

                <BottomP>
                  <input type="checkbox" style={{ marginRight: '5px' }} />
                  경매 담당자 정보와 동일
                </BottomP>
              </Part>
            </PartBlock>
          </Right>
          <Init></Init>
        </Main>
        <Bottom>
          <BottomItem>
            <h4>약관 동의</h4>
          </BottomItem>
          <BottomItem style={{ flexGrow: '6' }}>
            <div>
              <input type="checkbox" />
              <h4>전체 동의합니다</h4>
            </div>
            <div>
              <input type="checkbox" />
              <p>
                개인정보 활용에 동의 <span>(필수)</span>
              </p>
              <a>약관 보기</a>
            </div>
            <div>
              <input type="checkbox" />
              <p>
                이용약관 동의 <span>(필수)</span>
              </p>
              <a style={{ marginLeft: '55px' }}>약관 보기</a>
            </div>
          </BottomItem>
          <BottomItem>
            <button>가입하기</button>
          </BottomItem>
        </Bottom>
      </SignupContainer>
    </Container>
  );
};

export default SignUp;
