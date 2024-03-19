import { ContentState, EditorState, convertToRaw } from 'draft-js'
import draftjsToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import React, { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styled from 'styled-components'
import { editorFileUpload } from '../../api/admin/editor'

const Container = styled.div`
	width: 100%;
`

const RowBox = styled.div`
	width: 100%;
	display: flex;
`

const Viewer = styled.div`
	width: calc(50% - 40px);
	height: 400px;
	padding: 20px;
	margin-top: 20px;
	border: 2px solid gray;
`

const TextEditor = ({ setState = () => {}, name = 'content', value }) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	const [htmlString, setHtmlString] = useState('')
	const updateTextDescription = async (state) => {
		await setEditorState(state)
		const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()))
		setHtmlString(html)
	}

	async function uploadImageCallBack(file) {

		return new Promise(async (resolve, reject) => {
			try {
				const reader = new FileReader()

				reader.onloadend = async () => {
					const res = await editorFileUpload(file)
					resolve({ data: { link: res.data.data } })
				}
				reader.readAsDataURL(file)
			} catch (e) {
				reject(e)
			}

			// const xhr = new XMLHttpRequest()

			// xhr.open('POST', 'https://api.imgur.com/3/image')
			// xhr.setRequestHeader('Authorization', 'Client-ID f0e6784563ad243')
			// const data = new FormData()
			// data.append('image', file)
			// xhr.send(data)
			// xhr.addEventListener('load', () => {
			// 	const response = JSON.parse(xhr.responseText)
			// 	resolve(response)
			// })
			// xhr.addEventListener('error', () => {
			// 	const error = JSON.parse(xhr.responseText)
			// 	reject(error)
			// })
		})
	}

	// 초깃값 할당
	useEffect(() => {
		if (value) {
			const blocksFromHtml = htmlToDraft(value)
			if (blocksFromHtml) {
				const { contentBlocks, entityMap } = blocksFromHtml
				// https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
				const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
				// ContentState를 EditorState기반으로 새 개체를 반환.
				// https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
				const editorState = EditorState.createWithContent(contentState)
				setEditorState(editorState)
			}
		}
	}, [value])
	// 컴포넌트 사라지면 초기화
	// useEffect(() => {}, [])
	//
	useEffect(() => {
		const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()))

		if (setState) setState((p) => ({ ...p, [name]: html }))
	}, [editorState])

	return (
		<>
			<Container>
				<Editor
					placeholder="게시글을 작성해주세요."
					// htmlString={editorState}
					editorState={editorState}
					// editorState={editorState}
					onEditorStateChange={(v) => setEditorState(v)}
					toolbar={{
						image: {
							uploadCallback: uploadImageCallBack,
							previewImage: true,
							defaultSize: {
								width: '400px',
								height: '200px',
							},
							urlEnabled: true,
							uploadEnabled: true,
							alignmentEnabled: true,
						},
						// image: { uploadCallback: uploadImageCallBack },
					}}
					localization={{ locale: 'ko' }}
					editorStyle={{
						height: '400px',
						width: '100%',
						border: '3px solid lightgray',
						padding: '20px',
					}}
				/>
			</Container>
			{/* <RowBox>
        <Viewer dangerouslySetInnerHTML={{ __html: htmlString }} />
        <Viewer>{htmlString}</Viewer>
      </RowBox> */}
		</>
	)
}

export default TextEditor
