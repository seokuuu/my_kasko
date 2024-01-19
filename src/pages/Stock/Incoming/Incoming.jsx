import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { BlackBtn, GreyBtn, SwitchBtn, WhiteBlackBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { CustomSelect2, MainSelect } from '../../../common/Option/Main'
import DateGrid from '../../../components/DateGrid/DateGrid'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
  FilterContianer,
  FilterHeader,
  FilterFooter,
  FilterSubcontianer,
  FilterLeft,
  FilterRight,
  RowWrap,
  PartWrap,
  PWRight,
  Input,
  GridWrap,
  Tilde,
  DoubleWrap,
  ResetImg,
  TableContianer,
  ExCheckWrap,
  ExCheckDiv,
  ExInputsWrap,
  TCSubContainer,
  NewTitle,
  RightTitle,
  RowInWrap,
  Bar,
  MiniInput,
  NewFilterWrap,
  NewFilterLeft,
  NewFilterRight,
  NewRow,
  RightTextarea,
  FilterWrap,
} from '../../../modal/External/ExternalFilter'
import { blueModalAtom, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { storageOptions } from '../../../common/Option/Main'
import Table from '../../Table/Table'
import useReactQuery from '../../../hooks/useReactQuery'
import { deleteIncomeProduct, getInComingList } from '../../../api/stock'
import { StockIncomingFields, stockFields } from '../../../constants/admin/StockIncoming'
import { KilogramSum } from '../../../utils/KilogramSum'
import { add_element_field } from '../../../lib/tableHelpers'
import axios from 'axios'
import useMutationQuery from '../../../hooks/useMutationQuery'
import AlertPopup from '../../../modal/Alert/AlertPopup'
import useAlert from '../../../store/Alert/useAlert'
const Incoming = ({}) => {
  const { simpleConfirm } = useAlert()

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

  const modalOpen = () => {
    setIsModal(true)
  }

  const formatTableRowData = (inComingData) => {
    return add_element_field(inComingData, stockFields)
  }
  // 데이터 가져오기
  const paramData = {
    pageNum: 1,
    pageSize: 5,
    orderStatus:'확정 전송',
    // receiptStatusList: '입고 요청',
  }
  const [param, setParam] = useState(paramData)
  const [inComingPagination, setInComingPagination] = useState([])
  const [inComingListData, setInComingListData] = useState(null)
  const { data: inComingData, isSuccess, refetch } = useReactQuery(param, 'getInComingList', getInComingList)
  useEffect(() => {
    if (inComingData && inComingData.data && inComingData.data.list) {
      setInComingListData(formatTableRowData(inComingData.data.list))
      setInComingPagination(inComingData.data.pagination)
    }
  }, [inComingData, isSuccess])
  const onPageChange = (value) => {
    setParam((prevParam) => ({
      ...prevParam,
      pageNum: Number(value),
    }))
  }

  const checkBoxSelect = useAtomValue(selectedRowsAtom)
  const totalWeight = inComingData?.data.pagination.totalWeight
  const formattedTotalWeight = totalWeight && totalWeight.toLocaleString()


  /**
   * @description 재고 수신
   */
  const stockReceive = async () => {
    try{
      console.log('재고수신 API 호출')
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/store/receipt`,{});
      await refetch()
    }
    catch(error){
      console.log('재고수신 에러발생',error);
    }
  }


  /**
   * @description 제품 삭제
   */
  const { mutate: deleteIncome} = useMutationQuery('deleteIncomeProduct',deleteIncomeProduct)
  const [selectInComeNumber, setSelectInComeNumber] = useState([])
  useEffect(() => {
    if (checkBoxSelect?.length === 0) return
    setSelectInComeNumber(() => checkBoxSelect?.map((i) => i['제품 번호']))
  }, [checkBoxSelect])
  const handleDelete = () => {
    simpleConfirm('정말로 삭제하시겠습니까?', () => {
      deleteIncome(selectInComeNumber?.join(','), {
        onSuccess: () => {
          window.location.reload();
        },
      });
    });
  };

  /**
   * @description 제품 등록
   */

  return (
    <>
    <FilterContianer>
      <div>
        <div onClick={() => simpleConfirm('안녕하세요', () => console.log('심플confirm'))}>심플Confirm</div>
        <FilterHeader>
          <h1>입고 관리</h1>
          {/* 토글 쓰기 */}
          <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
        </FilterHeader>
        {exFilterToggle && (
          <>
            {/* 구버젼 시작 */}
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

                    <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
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
                    <h6>입고일자</h6>
                    <GridWrap>
                      <DateGrid width={130} bgColor={'white'} fontSize={17} />
                      <Tilde>~</Tilde>
                      <DateGrid width={130} bgColor={'white'} fontSize={17} />
                    </GridWrap>
                  </PartWrap>
                  <PartWrap>
                    <h6>구분</h6>
                    <MainSelect />
                    <MainSelect />
                    <MainSelect />
                  </PartWrap>
                </RowWrap>

                <RowWrap none>
                  <PartWrap first>
                    <h6>두께(MM)</h6>
                    <MiniInput /> <Tilde>~</Tilde>
                    <MiniInput />
                  </PartWrap>
                  <PartWrap>
                    <h6>폭(MM)</h6>
                    <MiniInput /> <Tilde>~</Tilde>
                    <MiniInput />
                  </PartWrap>
                  <PartWrap>
                    <h6>길이(MM)</h6>
                    <MiniInput /> <Tilde>~</Tilde>
                    <MiniInput />
                  </PartWrap>
                </RowWrap>
                <RowWrap none>
                  <PartWrap first>
                    <h6>구분2</h6>
                    <MainSelect />
                    <MainSelect />
                  </PartWrap>
                </RowWrap>
              </FilterLeft>
              <FilterRight>
                <DoubleWrap>
                  <h6>제품 번호 </h6>
                  <textarea
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
          </>
        )}
      </div>

      <TableContianer>
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /
            {inComingPagination?.listCount}개 )<Hidden />
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <PageDropdown />
            <Excel
            //  getRow={getRow}
            />
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 중량<span>{KilogramSum(checkBoxSelect)}</span>kg / 총 {formattedTotalWeight}kg
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <SwitchBtn>입고 확정</SwitchBtn>
          </div>
        </TCSubContainer>

        <Table
          getCol={StockIncomingFields}
          getRow={inComingListData}
          tablePagination={inComingPagination}
          onPageChange={onPageChange}
        />
        <TCSubContainer>
          <div></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteBlackBtn>제품 등록</WhiteBlackBtn>
            <WhiteRedBtn onClick={handleDelete}>제품 삭제</WhiteRedBtn>
            <WhiteSkyBtn onClick={stockReceive}>재고 수신</WhiteSkyBtn>
          </div>
        </TCSubContainer>
      </TableContianer>
    </FilterContianer>
  </>
  )
}

export default Incoming
