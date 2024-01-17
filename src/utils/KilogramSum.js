export function KilogramSum(data) {
  let sum = 0
  if (Array.isArray(data)) {
    data.forEach((i) => {
      return (sum += Number(i.중량))
    })
  }
  return sum
}

// export function KilogramSum(data, fieldName) {
//   let sum = 0
//   if (Array.isArray(data)) {
//     data.forEach((item) => {
//       const value = Number(item[fieldName])
//       if (!isNaN(value)) {
//         sum += value
//       }
//     })
//   }
//   return sum
// }
