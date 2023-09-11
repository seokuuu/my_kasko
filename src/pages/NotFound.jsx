import { useState, startTransition } from 'react'
import { useAtom } from 'jotai'
import { headerAtom, accordionAtom, subHeaderAtom } from '../store/Layout/Layout'
import { styled } from 'styled-components'
import { fontWeight } from '@mui/system'
import { SkyBtn, WhiteSkyBtn } from '../common/Button/Button'
import { Link, useNavigate } from 'react-router-dom'

const NotFound = () => {
  const [showHeader, setShowHeader] = useAtom(headerAtom)
  const [showAccordion, setShowAccordion] = useAtom(accordionAtom)
  const [showSubHeader, setShowSubHeader] = useAtom(subHeaderAtom)
  setShowHeader(false)
  setShowAccordion(false)
  setShowSubHeader(false)
  const navigate = useNavigate()

  const goToHome = () => {
    startTransition(() => {
      navigate('/')
    })
  }

  return (
    <Wrap>
      <NotFoundWrap>
        <Main>
          <div>
            <div style={{ fontSize: '64px', fontWeight: '900', marginBottom: '10px' }}>404</div>
            <div style={{ fontSize: '23px', marginBottom: '15px' }}>페이지를 찾을 수 없습니다.</div>
            <div style={{ marginTop: '10px' }}>
              <p>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.</p>
              <p>입력하신 주소가 정확한지 다시 한 번 확인해주세요.</p>
            </div>
            <BtnWrap>
              <SkyBtn
                style={{ color: '#4C83D6', background: 'white', border: '1px solid #4C83D6' }}
                width={35}
                height={40}
                fontSize={18}
                onClick={() => {
                  navigate(-1)
                }}
              >
                이전페이지
              </SkyBtn>
              <SkyBtn onClick={goToHome} width={35} height={40} fontSize={18}>
                카스코 철강 홈
              </SkyBtn>
            </BtnWrap>
          </div>
        </Main>
      </NotFoundWrap>
    </Wrap>
  )
}

export default NotFound

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #eef3fb;
`

const NotFoundWrap = styled.div`
  width: 890px;
  height: 480px;
  margin: auto;

  display: flex;
  background-color: white;
`
const Main = styled.div`
  width: 65%;
  height: 50%;
  margin: auto;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;

  > div {
    margin: auto;
  }

  p {
    font-size: 17px;
    font-weight: lighter;
  }
`

const BtnWrap = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 450px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
`
