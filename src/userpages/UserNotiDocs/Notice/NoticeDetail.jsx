import React, { useState } from 'react'
import { styled } from 'styled-components'

import { BtnBound, WhiteBtn } from '../../../common/Button/Button'
import { Bar, CenterRectangleWrap } from '../../../common/OnePage/OnePage.Styled'

import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import { useNoticeDetailsQuery } from '../../../api/operate/notice'
import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import UserSideBar from '../../../components/Left/UserSideBar'

const NcloudStorage = 'https://kr.object.ncloudstorage.com/kasko-bucket'

const NoticeDetail = () => {
	const { uid } = useParams()
	const [expanded, setExpanded] = useState('공지 & 자료실')
	const [depth2Color, setDepth2Color] = useState('공지사항')

	const { data: noticeDetails } = useNoticeDetailsQuery(uid)

	console.log('noticeDetails :', noticeDetails)
	const navigate = useNavigate()

	function createMarkup(content) {
		return { __html: content }
	}

	async function getDataUri(url) {
		return fetch(url)
			.then((response) => {
				return response.blob()
			})
			.then((blob) => {
				return URL.createObjectURL(blob)
			})
	}

	// 파일 다운로드
	async function fileDownload(url, fileName) {
		const entireUrl = `${NcloudStorage}${url}`

		const a = document.createElement('a')
		a.href = await getDataUri(entireUrl)
		a.download = fileName ?? 'download'

		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
	}

	return (
		<>
			<Header />
			<OverAllMain>
				<UserSideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<OverAllTable>
						<CenterRectangleWrap style={{ padding: '10px 50px' }}>
							<CRWMain>
								<h5>공지사항 상세</h5>
								<div style={{ marginBottom: '10px' }}>
									<div style={{ display: 'flex', gap: '5px', fontSize: '16px', color: '#c8c8c8', marginBottom: '5px' }}>
										<div>공지사항</div>
										<BtnBound style={{ height: '15px' }} />
										<div>{noticeDetails?.name}</div>
										<BtnBound style={{ height: '15px' }} />
										<div>{moment(noticeDetails?.updateDate).format('YYYY-MM-DD')}</div>
									</div>
									<div style={{ fontSize: '24px' }}>{noticeDetails?.title}</div>
								</div>
								<Bar />
								<BottomWrap
									style={{ height: '50%' }}
									dangerouslySetInnerHTML={createMarkup(noticeDetails?.content)}
								></BottomWrap>{' '}
								<div style={{ height: '50px' }}>
									<Bar />
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<div style={{ width: '100px' }}>첨부 파일</div>
										{noticeDetails &&
											noticeDetails?.fileList.map((notice, i) => (
												<FileUploadWrap key={i}>
													<div>{notice.originalName}</div>
													<button
														onClick={() => {
															// fileDownload(notice.fileUrl, notice.originalName)
														}}
													>
														<img src="/svg/Upload.svg" alt="파일" />
													</button>
													{/* <a href={`${notice.fileUrl}`} download target="_blank" rel="noopener noreferrer">
														다운로드
													</a> */}
												</FileUploadWrap>
											))}
									</div>
								</div>
								<FileUploadSub style={{ bottom: '-80px' }}>
									<WhiteBtn
										width={40}
										height={50}
										style={{ marginRight: '10px' }}
										onClick={() => {
											navigate(-1)
										}}
									>
										목록
									</WhiteBtn>
								</FileUploadSub>
							</CRWMain>
						</CenterRectangleWrap>
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default NoticeDetail

export const CRWMain = styled.div`
	width: 100%;
	height: 88vh;
	background-color: #fff;
	padding: 12px 24px;
	h4 {
		margin-top: 20px;
	}

	h5 {
		margin: 30px auto;
		text-align: center;
		font-size: 24px;
	}

	h6 {
		margin-bottom: 30px;
		text-align: center;
		font-size: 16px;
	}
`

export const CRWMainBottom = styled.div`
	width: 100%;
	height: fit-content;
	margin: 10px 0px;
	display: flex;
	justify-content: space-around;
`

export const CMBLeft = styled.div`
	width: 50%;

	> div {
		width: 400px;
		display: flex;
		margin: 10px auto;
		justify-content: space-between;
	}
	height: fit-content;
`

export const CMBRight = styled.div`
	max-width: 50%;

	> div {
		width: 300px;
		display: flex;
		justify-content: space-between;
	}
	height: fit-content;
`

export const CRWSub = styled.div`
	display: flex;
`

const BottomWrap = styled.div`
	display: block;
	justify-content: left;
	font-size: 16px;
	height: 200px;
`

const BtnWrap = styled.div`
	display: flex;
	width: 500px;
	justify-content: space-evenly;
	align-items: center;
	margin-left: auto;
	margin-right: auto;
`

const BottomOne = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 10px 0px;
	align-items: center;
`

const FileUploadWrap = styled.div`
	display: flex;
	align-items: center;
	padding: 10px;
	color: #6b6b6b;
	width: calc(100% + 100px);
	justify-content: space-between;
	height: 50px;
	background-color: #f1f1f1;
	font-size: 18px;
`

const FileUploadSub = styled.div`
	display: flex;
	width: 500px;
	justify-content: space-evenly;
	align-items: center;
	margin-left: auto;
	margin-right: auto;
	position: relative;
	bottom: -100px;
`
