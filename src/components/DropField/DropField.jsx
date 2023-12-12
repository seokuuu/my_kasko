import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, forwardRef, useEffect, useState } from 'react'
import { CloseButton, FileName, List, ListContainer, PictureContainer, SDropField } from './styles'
import { useForm } from 'react-hook-form'

const DropField = forwardRef(
  (
    {
      height,
      pName,
      id,
      htmlFor,
      fileList,
      secondFileList,
      onFileListChange,
      onFileDataChange,
      filesData,
      setFilesData,
    },
    ref,
  ) => {
    const {
      formState: { errors },
    } = useForm()

    const validFileList = fileList && fileList.length > 0 ? fileList : secondFileList
    const [fileName, setFileName] = useState(null)
    const [fileSizeError, setFileSizeError] = useState(false)
    const handleClose = (index) => {
      const newFiles = [...(validFileList ?? [])]
      console.log(fileName, ref)
      newFiles.splice(index, 1)
      onFileListChange(newFiles)

      const newFilesData = [...(filesData ?? [])]
      newFilesData.splice(index, 1)
      setFilesData(newFilesData)
      onFileDataChange?.(newFilesData)
    }
    const pushStringToArray = (value) => {
      if (fileList.length < 3) {
        const updatedFileList = [...(fileList ?? [])]
        updatedFileList.push(value)
        onFileListChange(updatedFileList)
        console.log(updatedFileList)
      } else console.log('Over')
    }

    const handleFileChange = (e) => {
      const selectedFiles = e.target.files
      if (selectedFiles && selectedFiles.length >= 0) {
        const newFile = selectedFiles[0]

        if (newFile.size > 5 * 1024 * 1024) {
          setFileSizeError(true)
          alert('5MB 초과')
          return
        }

        const updatedFilesData = [...(filesData ?? []), newFile]
        setFilesData(updatedFilesData)
        onFileDataChange?.(updatedFilesData)

        const fileName = newFile.name
        setFileName(fileName)
        setFileSizeError(false)
        pushStringToArray(fileName)
      }
    }

    useEffect(() => {
      console.log('현재 파일 데이터:', filesData)
    }, [filesData])
    return (
      <>
        <SDropField.FileUploadContainer>
          <SDropField.FileInput type="file" id={id} name="imageInput" onChange={handleFileChange} ref={ref} />
          <ListContainer>
            {fileList.map((file, index) => (
              <List key={index}>
                <FileName>{file}</FileName>
                <CloseButton onClick={() => handleClose(index)}>{/* SVG content here */}</CloseButton>
              </List>
            ))}
          </ListContainer>
          <SDropField.UploadLabel
            height={height}
            htmlFor={htmlFor}
            style={{
              color: fileSizeError ? '#EB3737' : '#6A6A6A',
              borderColor: fileSizeError ? '#F1AEAE' : '#E1E1E1',
            }}
          >
            <PictureContainer>
              <div>{/* SVG content here */}</div>
              <div>{pName}</div>
            </PictureContainer>
          </SDropField.UploadLabel>
        </SDropField.FileUploadContainer>
      </>
    )
  },
)
export default DropField
