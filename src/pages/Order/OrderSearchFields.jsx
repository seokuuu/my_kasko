import { useAtomValue, useSetAtom } from 'jotai'
import { GreyBtn } from '../../common/Button/Button'
import { MainSelect } from '../../common/Option/Main'
import useGlobalProductSearchFieldData from '../../hooks/useGlobalProductSearchFieldData'
import {
  ExInputsWrap,
  FilterRight,
  FilterLeft,
  Input,
  MiniInput,
  PWRight,
  PartWrap,
  RowWrap,
  Tilde,
} from '../../modal/External/ExternalFilter'
import StandardFind from '../../modal/Multi/StandardFind'
import ProductNumber from '../../components/GlobalProductSearch/SearchFields/ProductNumber'
import { kyuModalAtom } from '../../store/Layout/GlobalProductSearch'
import { DateSearchSelect } from '../../components/Search'

const OrderSearchFields = ({
                             // prettier-ignore
                             search,
                             setSearch,
                             commonDropdownButtonHandler,
                             commonNumInputHandler,
                             onSpecHandler,
                           }) => {
  const {
    // prettier-ignore
    storageList,
    supplierList,
    spartList,
    makerList,
    stockStatusList,
    gradeList,
    preferThicknessList,
  } = useGlobalProductSearchFieldData()

  const setIsKyuModal = useSetAtom(kyuModalAtom)
  const onChange = (key, value) => {
    setSearch((p) => ({ ...p, [key]: value }))
  }
  return (
    <>
      <FilterLeft>
        <RowWrap>
          {/* 창고 구분 */}
          <PartWrap>
            <h6>창고 구분</h6>
            <PWRight>
              <MainSelect
                options={storageList}
                // defaultValue={storageList[0]}
                value={search.storage}
                name="storage"
                onChange={(e) => commonDropdownButtonHandler(e, 'storage')}
              />
            </PWRight>
          </PartWrap>
          {/* 매입처 */}
          <PartWrap>
            <h6>고객사 명/고객사코드</h6>
            <MainSelect
              options={storageList}
              // defaultValue={storageList[0]}
              value={search.storage}
              name="storage"
              onChange={(e) => commonDropdownButtonHandler(e, 'storage')}
            />
            <Input readOnly={true} value={search.spec} />
            <GreyBtn
              style={{ width: '70px' }}
              height={35}
              margin={10}
              fontSize={17}
              onClick={() => setIsKyuModal(true)}
            >
              찾기
            </GreyBtn>
          </PartWrap>
        </RowWrap>
        {/* 2행 */}
        <RowWrap>
          {/* 구분 */}
          <PartWrap>
            <h6>구분</h6>
            {/* 제품군 */}
            <PWRight>
              <MainSelect
                options={spartList}
                defaultValue={spartList[0]}
                value={search.spart}
                name="spart"
                onChange={(e) => commonDropdownButtonHandler(e, 'spart')}
              />
            </PWRight>
          </PartWrap>
        </RowWrap>
        <RowWrap>
          <DateSearchSelect
            title={'경매 일자'}
            startInitDate={search.updateDate}
            endInitDate={search.createDate}
            startDateChange={(value) => onChange('updateDate', value)}
            endDateChange={(value) => onChange('createDate', value)}
          />
          <DateSearchSelect
            title={'확정 전송 일자'}
            startInitDate={search.updateDate}
            endInitDate={search.createDate}
            startDateChange={(value) => onChange('updateDate', value)}
            endDateChange={(value) => onChange('createDate', value)}
          />
        </RowWrap>
        {/* 6 행 */}
        <RowWrap none>
          <DateSearchSelect
            title={'상시 판매 주문 일자'}
            startInitDate={search.updateDate}
            endInitDate={search.createDate}
            startDateChange={(value) => onChange('updateDate', value)}
            endDateChange={(value) => onChange('createDate', value)}
          />
        </RowWrap>
        {useAtomValue(kyuModalAtom) === true && <StandardFind closeFn={onSpecHandler} />}
      </FilterLeft>
      <FilterRight>
        <ProductNumber
          initialValue={search.productNumberList}
          setState={setSearch}
          valueName={'productNumberList'}
          height="100%"
        />
      </FilterRight>
    </>
  )
}

export default OrderSearchFields
