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
