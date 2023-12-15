import React from 'react'

const CloseBtn = ({ onClick = () => {} }) => {
  return (
    <button onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4.16699 4.16797L15.8337 15.8346" stroke="#202020" stroke-width="2" stroke-linecap="round" />
        <path d="M15.8337 4.16797L4.16699 15.8346" stroke="#202020" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
  )
}

export default CloseBtn
