export function add_element_field(array, elemFields) {
	if (!array && !elemFields) {
		return console.log('인자를 확인해주세요')
	}
	return array.map((item) => {
		const newItem = {}

		for (const [key, value] of Object.entries(elemFields)) {
			newItem[key] = item[value]
		}

		return newItem
	})
}

export const KrFiledtoEng = (dataArray, fieldMap) => {
	if (!Array.isArray(dataArray)) {
		console.error('Error: Input data is not an array.')
		return []
	}

	return dataArray.map((item) => {
		const transformedItem = {}
		for (const [key, value] of Object.entries(item)) {
			if (fieldMap[key]) {
				transformedItem[fieldMap[key]] = value
			} else {
				transformedItem[key] = value
			}
		}
		return transformedItem
	})
}

/*
  서버에서 오늘 Boolean 갑을 string 갑으로 테이블 row 대이타에 보내주는 경우가 있을떄 사용.
  [예시]
    const processedData = add_element_field(apiResponse, responseToTableRowMap);
    const finalData = formatBooleanFields(processedData, [
      { fieldName: '노출상태', trueValue: '노출', falseValue: '비노출' },
      { fieldName: '판매상태', trueValue: '판매중', falseValue: '판매종료' }
    ]);
  */
export function formatBooleanFields(data, fieldSpecifications) {
	if (!Array.isArray(data)) {
		return null
	}

	if (
		!Array.isArray(fieldSpecifications) ||
		fieldSpecifications.some(
			(spec) =>
				typeof spec.fieldName !== 'string' || typeof spec.trueValue !== 'string' || typeof spec.falseValue !== 'string',
		)
	) {
		return null
	}

	return data.map((item) => {
		fieldSpecifications.forEach((spec) => {
			if (item.hasOwnProperty(spec.fieldName)) {
				item[spec.fieldName] = item[spec.fieldName] === true ? spec.trueValue : spec.falseValue
			}
		})
		return item
	})
}
