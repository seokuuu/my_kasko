export function KilogramSum(data,name) {
	let sum = 0
	if (Array.isArray(data)) {
		data.forEach((i) => {
			if(name){
				sum += Number(i[name])
			} else{
				sum += Number(i.중량)
			}
		})
	}
	return new Intl.NumberFormat().format(sum)
}
