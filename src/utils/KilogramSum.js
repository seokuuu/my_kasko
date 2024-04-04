export function KilogramSum(data, name) {
	let sum = 0
	if (Array.isArray(data)) {
		data.forEach((i) => {
			console.log('씨발', i?.중량)
			if (name) {
				sum += Number(i[name])
			} else if (i?.중량.includes(',')) {
				sum += Number(i.중량.replace(/,/g, ''))
			} else {
				sum += Number(i.중량)
			}
		})
	}
	return new Intl.NumberFormat().format(sum)
}
