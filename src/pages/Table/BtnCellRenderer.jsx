import React from 'react'

const BtnCellRenderer = ({}) => {
  const btnClickedHandler = () => {
    console.log('클릭 되었습니다!!!!')
  }

  return <button onClick={btnClickedHandler}>Click Me!</button>
}

export default BtnCellRenderer
