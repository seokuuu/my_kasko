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
