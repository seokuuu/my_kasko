export function KilogramSum(data, name) {
	let sum = 0
	if (Array.isArray(data)) {
		data.forEach((i) => {
			if (name) {
				sum += Number(i[name])
			} else if (i?.중량?.includes(',')) {
				sum += Number(i.중량.replace(/,/g, ''))
			} else if (i[name]?.includes(',')) {
				sum += Number(i[name]?.replace(/,/g, ''))
			} else {
				sum += Number(i.중량)
			}
		})
	}
	return new Intl.NumberFormat().format(sum)
}
