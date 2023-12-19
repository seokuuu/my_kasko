import { useAtom } from 'jotai'
import { useState } from 'react'
import { BlackBtn, GreyBtn, WhiteBlackBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import { storageOptions } from '../../../common/Option/SignUp'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
  DoubleWrap,
  EditGear,
  ExInputsWrap,
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterHeaderAlert,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
  FilterWrap,
  Input,
  InputStartWrap,
  MiniInput,
  PWRight,
  PartWrap,
  ResetImg,
  RowWrap,
  TCSubContainer,
  TableBottomWrap,
  TableContianer,
  Tilde,
} from '../../../modal/External/ExternalFilter'
import { blueModalAtom, toggleAtom } from '../../../store/Layout/Layout'
import Test3 from '../../Test/Test3'

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

const Single = ({}) => {
  const handleSelectChange = (selectedOption, name) => {
    // setInput(prevState => ({
    //   ...prevState,
    //   [name]: selectedOption.label,
    // }));
  }
  const [isRotated, setIsRotated] = useState(false)

  // Function to handle image click and toggle rotation
  const handleImageClick = () => {
    setIsRotated((prevIsRotated) => !prevIsRotated)
  }

  // 토글 쓰기
  const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
  const [toggleMsg, setToggleMsg] = useState('On')
  const toggleBtnClick = () => {
    setExfilterToggle((prev) => !prev)
    if (exFilterToggle === true) {
      setToggleMsg('Off')
    } else {
      setToggleMsg('On')
    }
  }

  const [isModal, setIsModal] = useAtom(blueModalAtom)

  const [noticeEdit, setnoticeEdit] = useState(false)

  const noticeEditOnClickHandler = () => {
    setnoticeEdit((prev) => !prev)
  }

  const modalOpen = () => {
    setIsModal(true)
  }

  return (
    <FilterContianer>
      <div>
        <FilterHeader>
          <h1>상시 판매 단일</h1>
          {/* 토글 쓰기 */}
          <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
        </FilterHeader>
        <FilterHeaderAlert>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '20px' }}>
              <img src="/img/notice.png" />
            </div>
            {noticeEdit ? (
              <div style={{ marginTop: '6px' }}>
                <div>
                  <input style={{ border: '1px solid' }} />
                </div>
                <div>
                  <input style={{ marginTop: '6px', border: '1px solid' }} />
                </div>
              </div>
            ) : (
              <div style={{ marginTop: '6px' }}>
                <div>· 주의사항 영역</div>
                <div style={{ marginTop: '6px' }}>· 주의사항 영역</div>
              </div>
            )}
          </div>

          {noticeEdit ? (
            <EditGear onClick={noticeEditOnClickHandler}>
              완료
              <img style={{ marginLeft: '10px' }} src="/img/setting.png" />
            </EditGear>
          ) : (
            <EditGear onClick={noticeEditOnClickHandler}>
              수정
              <img style={{ marginLeft: '10px' }} src="/img/setting.png" />
            </EditGear>
          )}
        </FilterHeaderAlert>
        {exFilterToggle && (
          <FilterWrap>
            <FilterSubcontianer>
              <FilterLeft>
                <RowWrap>
                  <PartWrap first>
                    <h6>창고 구분</h6>
                    <PWRight>
                      <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
                    </PWRight>
                  </PartWrap>
                  <PartWrap>
                    <h6>매입처</h6>
                    <PWRight>
                      <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
                    </PWRight>
                  </PartWrap>
                  <PartWrap>
                    <h6>규격 약호</h6>
                    <Input />
                    <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17} onClick={modalOpen}>
                      찾기
                    </GreyBtn>
                  </PartWrap>
                </RowWrap>
                <RowWrap>
                  <PartWrap first>
                    <h6>구분</h6>
                    <MainSelect />
                    <MainSelect />
                    <MainSelect />
                    <MainSelect />
                    <MainSelect />
                  </PartWrap>
                </RowWrap>
                <RowWrap style={{ borderBottom: '0px' }}>
                  <PartWrap first>
                    <h6>두께(MM)</h6>
                    <ExInputsWrap>
                      <MiniInput /> <Tilde>~</Tilde>
                      <MiniInput />
                    </ExInputsWrap>
                  </PartWrap>
                  <PartWrap>
                    <h6>폭(MM)</h6>
                    <ExInputsWrap>
                      <MiniInput /> <Tilde>~</Tilde>
                      <MiniInput />
                    </ExInputsWrap>
                  </PartWrap>
                  <PartWrap>
                    <h6>길이(MM)</h6>
                    <ExInputsWrap>
                      <MiniInput /> <Tilde>~</Tilde>
                      <MiniInput />
                    </ExInputsWrap>
                  </PartWrap>
                </RowWrap>
                <RowWrap none>
                  <PartWrap first>
                    <h6>유찰 횟수</h6>
                    <ExInputsWrap>
                      <Input /> <Tilde>~</Tilde>
                      <Input />
                    </ExInputsWrap>
                  </PartWrap>
                </RowWrap>
              </FilterLeft>
              <FilterRight>
                <DoubleWrap>
                  <h6>제품 번호 </h6>
                  <textarea
                    style={{ height: '90%' }}
                    placeholder='복수 조회 진행 &#13;&#10;  제품 번호 "," 혹은 enter로 &#13;&#10;  구분하여 작성해주세요.'
                  />
                </DoubleWrap>
              </FilterRight>
            </FilterSubcontianer>
            <FilterFooter>
              <div style={{ display: 'flex' }}>
                <p>초기화</p>
                <ResetImg
                  src="/img/reset.png"
                  style={{ marginLeft: '10px', marginRight: '20px' }}
                  onClick={handleImageClick}
                  className={isRotated ? 'rotate' : ''}
                />
              </div>
              <div style={{ width: '180px' }}>
                <BlackBtn width={100} height={40}>
                  검색
                </BlackBtn>
              </div>
            </FilterFooter>
          </FilterWrap>
        )}
      </div>

      <TableContianer>
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>2</span> / 50개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <PageDropdown />
            <Excel />
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            {/* 체크 박스의 값을 더한 값을 노출시켜줘야함 */}
            선택 중량<span> 2 </span>kg / 총 중량 kg
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteBlackBtn>노출 상태 변경</WhiteBlackBtn>
          </div>
        </TCSubContainer>
        <Test3 title={'규격 약호 찾기'} />
        <TableBottomWrap>
          <BlackBtn width={13} height={40} fontSize={17}>
            저장
          </BlackBtn>
        </TableBottomWrap>
      </TableContianer>
    </FilterContianer>
  )
}

export default Single
