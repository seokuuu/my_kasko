export const CheckBox = (arr, length, index, multi, radio) => {
  if (radio) {
    const newArr = Array.from({ length: length }, () => false)
    newArr[0] = true
    return newArr
  } else if (!index && index !== 0) {
    return Array.from({ length: length }, () => !arr[0])
  } else if (multi) {
    const newArr = [...arr]
    newArr[index] = !newArr[index]
    return newArr
  } else {
    const newArr = Array.from({ length: length }, () => false)
    newArr[index] = !newArr[index]
    return newArr
  }
}
