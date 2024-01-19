export function KilogramSum(data) {
	let sum = 0
	if (Array.isArray(data)) {
		data.forEach((i) => {
			sum += Number(i.중량)
		})
	}
	return new Intl.NumberFormat().format(sum)
}
