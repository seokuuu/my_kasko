import React, { useState, useEffect } from 'react'

const SelectEditor = (props) => {
  const { value, values, onGridCellValueChanged } = props
  const [selectedValue, setSelectedValue] = useState(value)

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  const handleChange = (e) => {
    setSelectedValue(e.target.value)
  }

  const handleBlur = () => {
    onGridCellValueChanged({ newValue: selectedValue })
  }

  return (
    <select value={selectedValue} onChange={handleChange} onBlur={handleBlur}>
      {values.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default SelectEditor
