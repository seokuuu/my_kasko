import React from 'react'

const CustomCellRenderer = ({ value, colDef, api }) => {
  const handleContextMenu = (event) => {
    event.preventDefault()
    api.applyColumnState({
      state: {
        [colDef.field]: { pinned: 'left' },
      },
      applyOrder: true,
    })
  }

  return <div onContextMenu={handleContextMenu}>{value}</div>
}

export default CustomCellRenderer
