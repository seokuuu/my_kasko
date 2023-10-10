import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'

import { BlackBtn, WhiteBtn } from '../../../common/Button/Button'
import { Bar, CenterRectangleWrap } from '../../../common/OnePage/OnePage.Styled'

import { BtnBound } from '../../../common/Button/Button'

// 클레임 등록
const FAQDetail = () => {
  return (
    <>
      <CenterRectangleWrap style={{ height: '88vh', padding: '10px 50px' }}>
        <CRWMain>
          <h5>자료실 상세</h5>
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', gap: '5px', fontSize: '16px', color: '#c8c8c8', marginBottom: '5px' }}>
              <div>공지사항</div>
              <BtnBound style={{ height: '15px' }} />
              <div>관리자</div>
              <BtnBound style={{ height: '15px' }} />
              <div>2023.06.12</div>
            </div>
            <div style={{ fontSize: '24px' }}>제목 노출 영역입니다.</div>
          </div>
          <Bar />
          <BottomWrap style={{ height: '50%' }}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.""Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum." <br />
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum."
          </BottomWrap>
          <div style={{ height: '50px' }}>
            <Bar />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '100px' }}>첨부 파일</div>
              <FileUploadWrap>
                <div>파일명.pdf</div>
                <img src="/svg/Upload.svg" />
              </FileUploadWrap>
            </div>
          </div>
          <FileUploadSub>
            <WhiteBtn width={40} height={50} style={{ marginRight: '10px' }}>
              목록
            </WhiteBtn>
          </FileUploadSub>
        </CRWMain>
      </CenterRectangleWrap>
    </>
  )
}

export default FAQDetail

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
`

export const CRWMainBottom = styled.div`
  width: 100%;
  height: fit-content;
  margin: 10px 0px;
  display: flex;
  justify-content: space-around;
`

export const CMBLeft = styled.div`
  width: 50%;

  > div {
    width: 400px;
    display: flex;
    margin: 10px auto;
    justify-content: space-between;
  }
  height: fit-content;
`

export const CMBRight = styled.div`
  max-width: 50%;

  > div {
    width: 300px;
    display: flex;
    justify-content: space-between;
  }
  height: fit-content;
`

export const CRWSub = styled.div`
  display: flex;
`

const BottomWrap = styled.div`
  display: block;
  justify-content: left;
  font-size: 16px;
  height: 200px;
`

const BtnWrap = styled.div`
  display: flex;
  width: 500px;
  justify-content: space-evenly;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`

const BottomOne = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
  align-items: center;
`

const FileUploadWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  color: #6b6b6b;
  width: calc(100% + 100px);
  justify-content: space-between;
  height: 50px;
  background-color: #f1f1f1;
  font-size: 18px;
`

const FileUploadSub = styled.div`
  display: flex;
  width: 500px;
  justify-content: space-evenly;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  bottom: -100px;
`