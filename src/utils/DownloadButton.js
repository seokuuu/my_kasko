import React from 'react'
import styled from 'styled-components'
const s3BaseUrl = 'https://kr.object.ncloudstorage.com/kasko-bucket'

const DownloadButton = ({ fileUrl, fileName }) => {
  const handleDownload = () => {
    const imageUrl = `${s3BaseUrl}${fileUrl}`
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = fileName
    link.target = '_blank'
    link.click()
  }
  return (
    <AddBtn2 onClick={handleDownload}>
      <img src="/svg/Download.svg" alt="btnStart" />
      <p>내려받기</p>
    </AddBtn2>
  )
}
export default DownloadButton

// <DownloadButton
//   fileUrl={resData?.businessNumberFileUrl}
// "/bankBook/e7430fe2-86dc-43e9-8fe8-ce6e6be2bc08.jpg"
//   fileName={resData?.businessNumberOriginalName}
// />

const AddBtn2 = styled.div`
  display: flex;
  width: 320px;
  height: 40px;
  border: 1px solid;
  gap: 10px;

  align-items: center;
  justify-content: center;
  cursor: pointer;
`
