import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { WhiteBtn } from '../../../../../common/Button/Button'
import CloseBtn from './CloseBtn'

/**
 * @description
 * 첨부파일
 * @returns
 */

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const FileName = styled.div`
  width: 200%;
  height: 46px;
  display: flex;
  justify-content: space-between;
  background-color: #f1f1f1;
  align-items: center;

  & > span {
    font-size: 14px;
  }
  padding: 12px;
`

const AttachedFile = ({ setState = () => {}, name = 'file', fileName }) => {
  const [file, setFile] = useState([])

  useEffect(() => {
    if (fileName) {
      setFile({ name: fileName })
    }
  }, [fileName])
  useEffect(() => {
    if (setState) {
      setState((p) => ({ ...p, [name]: file }))
    }
  }, [file])

  console.log('file :', file)

  return (
    <div style={{ width: '48%' }}>
      <p style={{ marginBottom: '5px' }}>첨부 파일</p>
      <div style={{ width: '48%' }}>
        <WhiteBtn style={{ width: '200%', marginBottom: '12px' }}>
          <label
            htmlFor="file"
            style={{
              cursor: 'pointer',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              width: '100%',
            }}
          >
            <img src="/svg/Upload.svg" alt="파일 첨부 이미지" />
            <p>파일 첨부</p>
          </label>
          <input
            id="file"
            type="file"
            multiple
            style={{
              display: 'none',
            }}
            onChange={(e) => {
              setFile(Array.from(e.target.files))
            }}
          />
        </WhiteBtn>

        {file.length > 0 ? (
          <FileList>
            {file.map((f, i) => (
              <FileName key={i}>
                <span>{f.name ?? ''}</span>

                <CloseBtn onClick={() => setFile([])} />
              </FileName>
            ))}
          </FileList>
        ) : null}
      </div>
    </div>
  )
}

export default AttachedFile
