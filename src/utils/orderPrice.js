// 주문 상세 총액
export function calculateOrderTotalPrice(list) {
	const totalPrice = calculateOrderPrice(list)
	const refundPrice = calculateOrderRefundPrice(list)

	return totalPrice - refundPrice
}

// 총 낙찰가 (낙찰 총 금액 + 절단한 제품 운송비총합 - 절단하기 전 운송비)
export function calculateOrderPrice(list) {
	// 원본 주문 제품 목록
	const orderList = []

	// 절단된 제품 목록
	const splitProducts = []

	// 절단된 제품과 절단 하기 전 리스트
	const splitProductNumbers = list.filter((item) => item.splitStatus === 'Y').map((item) => item.productNumber)

	if (splitProductNumbers.length > 0) {
		for (let number of splitProductNumbers) {
			const originList = list.filter((item) => !item.productNumber.includes(number + '-'))
			const spiltList = list.filter((item) => item.productNumber.includes(number + '-'))

			orderList.push(...originList)
			splitProducts.push(...spiltList)
		}
	} else {
		orderList.push(...list)
	}

	const isSplitProduct = splitProducts.length > 0

	// 원본 주문 데이터 총 금액 (절단한 제품 운송비 제외)
	let totalPrice = 0
	for (let v of orderList) {
		if (isSplitProduct && v.splitStatus === 'Y') {
			totalPrice += Number(v.orderPrice + v.orderPriceVat)
		} else {
			totalPrice += Number(v.orderPrice + v.freightCost + v.orderPriceVat + v.freightCostVat)
		}
	}

	// 절단한 제품 운송비
	let splitTotalFreightCost = 0
	if (isSplitProduct) {
		for (let v of splitProducts) {
			splitTotalFreightCost += Number(v.freightCost + v.freightCostVat)
		}
	}

	return totalPrice + splitTotalFreightCost
}

// 환불비 (환불비 = 절단하기 전 운송비 - 절단비 + 절단 후 운송비 입니다.)
export function calculateOrderRefundPrice(list) {
	// 원본 주문 제품 목록
	const orderList = []

	// 절단된 제품 목록
	const splitProducts = []

	// 절단한 제품 제외 제품 목록
	const afterSplitProducts = list.filter((item) => item.splitStatus !== 'Y')

	// 절단된 제품 번호 목록
	const splitProductNumbers = list.filter((item) => item.splitStatus === 'Y').map((item) => item.productNumber)

	if (splitProductNumbers.length === 0) {
		return 0
	}

	for (let number of splitProductNumbers) {
		const originList = list.filter((item) => !item.productNumber.includes(number + '-'))
		const spiltList = list.filter((item) => item.productNumber.includes(number + '-'))
		orderList.push(...originList)
		splitProducts.push(...spiltList)
	}

	// 절단 제품 없을 시 0원
	if (splitProducts.length === 0) {
		return 0
	}

	// 절단하기 전 운송비
	let beforeTotalFreightCost = 0
	for (let v of orderList) {
		beforeTotalFreightCost += Number(v.freightCost + v.freightCostVat)
	}

	// 절단 후 운송비 입니다.
	let splitTotalFreightCost = 0
	if (afterSplitProducts.length > 0) {
		for (let v of afterSplitProducts) {
			splitTotalFreightCost += Number(v.freightCost + v.freightCostVat)
		}
	}

	const splitPrice = calculateProductSplitPrice(list)

	return beforeTotalFreightCost - splitTotalFreightCost + splitPrice
}

// 절단비
export function calculateProductSplitPrice(list) {
	let splitPrice = 0
	if (Array.isArray(list)) {
		const splitProductNumbers = list.filter((item) => item.splitStatus === 'Y').map((item) => item.productNumber)
		for (let number of splitProductNumbers) {
			const count = list.filter((item) => item.productNumber.includes(number + '-')).length
			if (count > 2) {
				splitPrice += 40000
			} else if (count > 0) {
				splitPrice += 20000
			} else {
				splitPrice += 0
			}
		}
	}
	return splitPrice
}
