import { useQuery } from '@tanstack/react-query'
import moment from 'moment/moment'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { client } from '../../../api'
import { WhiteSkyBtn } from '../../../common/Button/Button'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../../components/MapTable/MapTable'
import {
	BlueBarHeader,
	BlueSubContainer, FadeOverlay, ModalContainer,
	WhiteCloseBtn
} from '../../../modal/Common/Common.Styled'
import { FilterContianer, FilterHeaderAlert, TableContianer } from '../../../modal/External/ExternalFilter'
import useAlert from '../../../store/Alert/useAlert'

/**
 * @constant 입금요청서 요청 URL
 * @description auction:경매, salesDeposit:상시판매
 */
const REQUEST_DEPOSIT_URL = {
  aution: '/auction/successfulBid/deposit',
  salesDeposit: '/sale-product/order/deposit-request'
};

/**
 * @constant 총계 초기화 데이터
 */
const TOTAL_DATA = {
  price: 0, // 낙찰금액
  weight: 0, // 낙찰 중량
  orderPrice: 0, // 제품대(공급가액)
  freightCost: 0, // 운송비(공급가액)
  sumCost: 0, // 총합(공급가액)
  orderPriceVat: 0, // 제품대(VAT)
  freightCostVat: 0, // 운송비(VAT)
  sumCostVat: 0, // 총합(VAT)
  sum: 0 // 총계
}

/**
 * 총계 데이터 반환 함수
 * @param {object} serverData 서버 데이터
 * @returns {object} 총계 데이터
 */
function getTotalData(serverData) {
	const data = {...TOTAL_DATA};
	if(serverData && Array.isArray(serverData.list)) {
		for(const v of serverData.list) {
			data.price += Number(v.totalPrice);
			data.weight += Number(v.weight);
			data.orderPrice += Number(v.orderPrice);
			data.freightCost += Number(v.freightCost);
			data.sumCost += Number(v.orderPrice + v.freightCost);
			data.orderPriceVat += Number(v.orderPriceVat);
			data.freightCostVat += Number(v.freightCostVat);
			data.sumCostVat += Number(v.orderPriceVat + v.freightCostVat);
			data.sum += Number(v.orderPrice + v.freightCost + v.orderPriceVat + v.freightCostVat);
		}
	}
	for(const key in data) {
		data[key] = data[key].toLocaleString();
	}
	return data;
}

/**
 * 상시판매|경매 입금 요청서 버튼 + 모달
 * @param {string} param.salesDeposit 상시판매 여부
 * @param {string} param.auctionNumber 경매번호|상시판매 번호 (경매|상시판매) 
 * @param {string} param.storage 창고 (경메)
 * @param {string} param.customerDestinationUid 고객사 목적지 고유번호 (경매)
 * @param {string} param.biddingStatus 낙찰상태 (경매)
 */
export const PrintDepositRequestButton = ({
  salesDeposit=false,
  auctionNumber,
	storage="", 
  customerDestinationUid="", 
  biddingStatus="",
}) => {
	// 경매|상시판매 번호
	const oneAuctionNumber = useRef('');
  // 입금요청서 발행 모드
	const [receiptPrint, setReceiptPrint] = useState(false);
	// 데이터
	const { data: infoData, refetch: requestData, isLoading, isSuccess, error} = useQuery({
		queryKey: ['deposit-request', oneAuctionNumber.current],
		queryFn: async () => {
			const requestUrl = salesDeposit? REQUEST_DEPOSIT_URL.salesDeposit : REQUEST_DEPOSIT_URL.aution;
			const { data } = salesDeposit
			? await client.get(`${requestUrl}/${oneAuctionNumber.current}`)
			: await client.post(requestUrl, {
				auctionNumber: oneAuctionNumber.current,
				storage: storage,
				customerDestinationUid: customerDestinationUid,
				biddingStatus: biddingStatus
			})
			return data.data;
		},
		enabled: Boolean(oneAuctionNumber.current),
		retry: false
	});
	// 총계 데이터
	const totalData = useMemo(() => getTotalData(infoData), [infoData])
	// 일자 데이터
	const auctionDate = useMemo(() => !infoData || !infoData.auctionDate? null : moment(infoData.auctionDate).format('YYYY.MM.DD'), [infoData]);
	// ALERT
	const { simpleAlert } = useAlert();

	// 요청서 열기
	function handlePrint(num) {
		oneAuctionNumber.current = num;
		requestData();
		setReceiptPrint(true);
	}

	// 버튼 클릭 핸들러
	function handlePrintClick(e) {

		if(receiptPrint) {
			setReceiptPrint(false);
			return;
		}

		let num = auctionNumber;
		
		if(Array.isArray(auctionNumber)) {
			if(auctionNumber.length === 1) {
				num = auctionNumber[0];
			}
			else {
				return simpleAlert('입금요청서를 발행할 주문건을 1개 선택헤 주세요.');
			}
		}
		else if(typeof num !== 'string' || num.length < 1) {
			return simpleAlert('입금요청서를 발행할 수 없습니다.');
		}

		handlePrint(num);
	}

  return (
    <>
      <WhiteSkyBtn
				onClick={handlePrintClick}
			>
				입금 요청서 발행
			</WhiteSkyBtn>
      {receiptPrint && (
				<>
				<FadeOverlay />
				<ModalContainer style={{ width: '75%', maxHeight: '90vh', minHeight: 740, background: '#eef3fb', flexDirection: 'column', alignItems: 'flex-end' }}>
					<BlueBarHeader style={{ height: '20px' }}>
						<div></div>
						<div>
							<WhiteCloseBtn onClick={e => { setReceiptPrint(false) }} src="/svg/white_btn_close.svg" />
						</div>
					</BlueBarHeader>
					<BlueSubContainer style={{ width: '100%', padding: '0px 30px' }}>
						<FilterContianer>
							{/* 요청서 제목 | 일자 */}
							<FormTitle>
								<b>{salesDeposit? '상시 판매' : '경매'} 입금 요청서 ({ auctionDate || '-'} 일자</b>)
							</FormTitle>
							{/* 입금 정보 공지 */}
							<FilterHeaderAlert>
								<div style={{ display: 'flex' }}>
									<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px' }}>
										<img src="/img/notice.png" />
									</div>
									<FormContentWrap>
										<div>
											<b>· 연락처 : </b>070-8889-3456{' '}
										</div>
										<div>
											<b>· 입금계좌번호 : </b> 우리은행 1005-301-817070, 신한은행 140-013-498612, 기업은행 070-8889-3456,
											예금주 : 카스코철강
										</div>
										<div>
											<b>· 입금 기한 : </b> 경매일 익영업일 12시 限
										</div>
									</FormContentWrap>
								</div>
							</FilterHeaderAlert>
							{/* 인사글 */}
							<Text>
								<div>
									<b>저희 주식회사 카스코 철강 제품을 구매해 주시는 귀사에 항상 감사드립니다.</b>
								</div>
								<div>
									<b>
										해당 거래에 대해 귀사가 입금하셔야 할 낙찰금액은 아래와 같사오니, 확인하신 후 입금해 주시기 바랍니다.
									</b>
								</div>
							</Text>

							{
								!isSuccess
								? 
									<p style={{ width: '100%', height: 280,padding: '230px 20px', background: 'white', textAlign: 'center', wordBreak:'keep-all' }}>
										{
											isLoading
											? '입금요청서 데이터를 불러오고 있습니다.' 
											: '입금요청서 데이터를 불러올 수 없습니다.' + (error?.data?.message ? `\n(${error.data.message})` : '') }
									</p>
								: <TableContianer>
										<ClaimTable style={{ margin: '20px 0px' }}>
										<ClaimRow>
											<ClaimTitle>경매일자</ClaimTitle>
											<ClaimContent>{infoData?.auctionDate}</ClaimContent>
											<ClaimTitle>고객명</ClaimTitle>
											<ClaimContent>{infoData?.customerName}</ClaimContent>
											<ClaimTitle>낙찰 중량</ClaimTitle>
											<ClaimContent bold>{totalData.weight}</ClaimContent>
											<ClaimTitle>낙찰 금액</ClaimTitle>
											<ClaimContent bold>{totalData.price}</ClaimContent>
										</ClaimRow>
									</ClaimTable>
									<TableContainer>
										<Table>
											<thead>
												<tr>
													<Th rowSpan="2">제품 정보</Th>
													<Th rowSpan="2">품명</Th>
													<Th rowSpan="2">규격 약호</Th>
													<Th rowSpan="2">제품 사양</Th>
													<Th rowSpan="2">중량</Th>
													<Th colSpan="3">공급가액</Th>
													<Th colSpan="3">VAT</Th>
													<Th rowSpan="2">총계</Th>
												</tr>
												<SubheaderRow>
													<Th>제품대</Th>
													<Th>운송비</Th>
													<Th>총합</Th>
													<Th>제품대</Th>
													<Th>운송비</Th>
													<Th>총합</Th>
												</SubheaderRow>
											</thead>
											<tbody>
												{/* 테이블 내용 추가 */}
												{
													infoData?.list && 
													infoData.list.map(v => (
														<tr key={v.uid}>
															<Td>{v.productNumber}</Td>
															<Td>{v.productName}</Td>
															<Td>{v.productSpec}</Td>
															<Td>{v.productWdh}</Td>
															<Td>{v.weight}</Td>
															<Td>{v.orderPrice}</Td>
															<Td>{v.freightCost}</Td>
															<Td>{v.orderPrice + v.freightCost}</Td>
															<Td>{v.orderPriceVat}</Td>
															<Td>{v.freightCostVat}</Td>
															<Td>{v.orderPriceVat + v.freightCostVat}</Td>
															<Td>{v.totalPrice}</Td>
														</tr>
													))
												}
												{/* 총계 */}
												<tr style={{ border: '2px solid #c8c8c8' }}>
													<Th colSpan="4">총계</Th>
													<Td blue bold>{totalData.weight}</Td>
													<Td>{totalData.orderPrice}</Td>
													<Td>{totalData.freightCost}</Td>
													<Td>{totalData.sumCost}</Td>
													<Td>{totalData.orderPriceVat}</Td>
													<Td>{totalData.freightCostVat}</Td>
													<Td>{totalData.sumCostVat}</Td>
													<Td>{totalData.sum}</Td>
												</tr>
											</tbody>
										</Table>
									</TableContainer>
								</TableContianer>
							}
						</FilterContianer>
					</BlueSubContainer>
					<div style={{ float: 'right', padding: '20px 30px' }}>
						<img src="/img/logo.png" />
					</div>
				</ModalContainer>
				</>
			)}
    </>
  )
}

export default PrintDepositRequestButton


const FormTitle = styled.h1`
  font-size: 30px;
  padding: 40px;
  text-align: center;
`

const FormContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${(props) => props.theme.colors.PriStrong};
  font-size: 16px;
  padding: 20px 0px;
  gap: 5px;
  letter-spacing: -0.32px;
`
const TableContainer = styled.div`
  margin-top: 20px;
`

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-size: 17px;
`

const Th = styled.th`
  border: 1px solid #ddd;
  background-color: #f2f2f2;
  padding: 5.5px;
  font-weight: 500;
  border: 1px solid #c8c8c8;
  background-color: #dbe2f0;
`

const Td = styled.td`
  text-align: ${({ right }) => (right ? 'end' : 'center')};
  border: 1px solid #ddd;
  padding: 8px;
  color: ${({ theme, blue }) => (blue ? theme.colors.PriNormal : 'none')};
  font-weight: ${({ bold }) => (bold ? 900 : 'none')};
`

const SubheaderRow = styled.tr`
  background-color: #d9d9d9;
`
