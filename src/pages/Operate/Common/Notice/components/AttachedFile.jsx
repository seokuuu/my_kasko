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

const AttachedFile = ({ setState = () => {}, name = 'file', fileList, isExistTitle }) => {
  // 파일 정보
  const [file, setFile] = useState([])

  // 삭제할 파일 인덱스
  const [deleteFileList, setDeleteFileList] = useState([])

  // 기존 파일
  const [existFileList, setExistFileList] = useState([])

  useEffect(() => {
    if (setState) {
      setState((p) => ({ ...p, [name]: file, deleteFileList }))
    }
  }, [file, deleteFileList])

  // 기존 파일이 있을 경우, 해당 파일 할당
  useEffect(() => {
    if (fileList.length > 0) {
      setExistFileList(fileList)
    }
  }, [fileList])

  // 컴포넌트가 사라지면 데이터 초기화
  useEffect(() => {
    return () => {
      setFile([])
      setDeleteFileList([])
      setExistFileList([])
    }
  }, [])

  console.log('existFileList :', existFileList)

  return (
    <div style={{ width: '40%' }}>
      {isExistTitle && <p style={{ marginBottom: '5px' }}>첨부 파일</p>}
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

        {/* 새로운 파일 */}
        {file.length > 0 ? (
          <FileList>
            {file.map((f, index) => (
              <FileName key={index}>
                <span>{f.name ?? ''}</span>

                <CloseBtn
                  onClick={() => {
                    setFile((p) => p.filter((file, newIndex) => newIndex !== index))
                  }}
                />
              </FileName>
            ))}
          </FileList>
        ) : null}
        {/* 기존 파일 */}
        {existFileList.length > 0 ? (
          <FileList>
            {existFileList.map((f, index) => (
              <FileName key={index}>
                <span>{f.name ?? ''}</span>

                <CloseBtn
                  onClick={() => {
                    if (fileList.length > 0) {
                      setExistFileList((p) => p.filter((file, newIndex) => newIndex !== index))
                      setDeleteFileList((p) => [...p, f.uid])
                    }
                  }}
                />
              </FileName>
            ))}
          </FileList>
        ) : null}
      </div>
    </div>
  )
}

export default AttachedFile
