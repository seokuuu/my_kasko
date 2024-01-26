import React, { useState } from 'react'
import { WhiteSkyBtn } from '../../../common/Button/Button'
import DepositRequestForm from '../../../modal/Docs/DepositRequestForm'

/**
 * 상시판매 입금 요청서 버튼
 * @param {string} param.title 입금요청서 제목
 * @param {string} param.buttonTitle 버튼 텍스트
 * @param {string} param.salesDeposit 상시판매 여부
 * @param {string} param.auctionNumber 경매번호 
 */
export const PrintDepositRequestButton = ({
  title="입금 요청서",
  buttonTitle,
  salesDeposit=false,
  auctionNumber,
}) => {
  // 입금요청서 발행 모드
	const [receiptPrint, setReceiptPrint] = useState(false)

  return (
    <>
      <WhiteSkyBtn
				onClick={() => {
					setReceiptPrint(true)
				}}
			>
				{buttonTitle||'입금 요청서'} 발행
			</WhiteSkyBtn>
      {receiptPrint && (
				<DepositRequestForm
					title={title}
					auctionNumber={auctionNumber}
					salesDeposit={salesDeposit}
					onClose={() => {
						setReceiptPrint(false)
					}}
				/>
			)}
    </>
  )
}

export default PrintDepositRequestButton