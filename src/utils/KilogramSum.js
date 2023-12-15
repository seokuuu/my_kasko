export function KilogramSum (data) {
 let sum = 0
if(Array.isArray(data)){
  data.forEach((i) =>  {return sum += Number(i.중량)})
}
  return sum
}