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
			}
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

		return (
			<>
				<SDropField.FileUploadContainer>
					<SDropField.FileInput type="file" id={id} name="imageInput" onChange={handleFileChange} ref={ref} />
					<ListContainer>
						{fileList.map((file, index) => (
							<List key={index}>
								<FileName>파일명: {file}</FileName>
								<CloseButton type="button" onClick={() => handleClose(index)}>
									<svg width="1em" height="1em" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
										<path
											fill="#000000"
											d="M764.288 214.592L512 466.88L259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512L214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
										/>
									</svg>
								</CloseButton>
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
