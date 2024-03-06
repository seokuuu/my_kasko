import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { getFaqDetail } from '../../../api/customerService'
import { BtnBound, WhiteBtn } from '../../../common/Button/Button'
import { Bar, CenterRectangleWrap } from '../../../common/OnePage/OnePage.Styled'
import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import UserSideBar from '../../../components/Left/UserSideBar'
import useReactQuery from '../../../hooks/useReactQuery'
import { formatDateString } from '../../../utils/utils'

// 클레임 등록
const FAQDetail = () => {
  const depth2Color = 'FAQ'
  const { faqUid } = useParams()
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState('고객센터')
  const [faqDetail, setFaqDetail] = useState(null)
  const { isLoading, isError, data: getFaqDetailRes, isSuccess } = useReactQuery(faqUid, 'getFaqDetail', getFaqDetail)

  useEffect(() => {
    if (getFaqDetailRes && getFaqDetailRes.data && getFaqDetailRes.data.data) {
      setFaqDetail(getFaqDetailRes.data.data)
    }
  }, [isSuccess, getFaqDetailRes])

  const backButtonOnClick = () => {
    navigate(-1)
  }

  return (
    <>
      <Header />
      <OverAllMain>
        <UserSideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <CenterRectangleWrap style={{ height: '88vh', padding: '10px 50px' }}>
              <CRWMain>
                <h5>FAQ 상세</h5>
                <div style={{ marginBottom: '10px' }}>
                  <div
                    style={{
                      display: 'flex',
                      gap: '5px',
                      fontSize: '13px',
                      color: '#c8c8c8',
                      marginBottom: '5px',
                      lineHeight: '16px',
                      letterSpacing: '-0.13px',
                    }}
                  >
                    <div>FAQ</div>
                    <BtnBound style={{ height: '15px' }} />
                    <div>{faqDetail && faqDetail.category}</div>
                    <BtnBound style={{ height: '15px' }} />
                    <div>{faqDetail && formatDateString(faqDetail.createDate)}</div>
                  </div>
                  <div
                    style={{
                      fontSize: '20px',
                      fontWeight: 500,
                      fontStyle: 'normal',
                      lineHeight: '24px',
                      letterSpacing: '-0.4px',
                    }}
                  >
                    {faqDetail && faqDetail.title}
                  </div>
                </div>
                <Bar />
                <BottomWrap style={{ height: '50%' }}>{faqDetail && faqDetail.content}</BottomWrap>
                <FileUploadSub>
                  <WhiteBtn width={40} height={50} style={{ marginRight: '10px' }} onClick={backButtonOnClick}>
                    목록
                  </WhiteBtn>
                </FileUploadSub>
              </CRWMain>
            </CenterRectangleWrap>
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
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
