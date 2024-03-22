import React, { useState } from 'react'
import moment from 'moment'
import {
	LeftSub2,
	Board,
	BoardLeft,
	BoardRight,
	MainTabs,
	MainTabTitle,
	NotItemTitle,
	MainBorderBar,
} from './MainPageStyled'
import { useNavigate } from 'react-router-dom'
import { useCustomerMainPageNotionQuery } from '../../api/mainPage/mainPage'
import { FadeLoader } from 'react-spinners'

const MainNotice = () => {
	const { data, isLoading } = useCustomerMainPageNotionQuery()
	const [noticeTab, setNoticeTab] = useState(true)
	return (
		<LeftSub2 style={{ position: 'relative' }}>
			<MainTabs>
				<MainTabTitle isColor={!!noticeTab} onClick={() => setNoticeTab(true)}>
					공지사항
				</MainTabTitle>
				<MainTabTitle isColor={!noticeTab} onClick={() => setNoticeTab(false)}>
					자료실
				</MainTabTitle>
			</MainTabs>
			<MainBorderBar />
			<NoticeCard list={!!noticeTab ? data?.notices : data?.docs} isLoading={isLoading} />
			{isLoading && (
				<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
					<FadeLoader color="#4C83D6" size={20} />
				</div>
			)}
		</LeftSub2>
	)
}

const NoticeCard = ({ list }) => {
	const navigate = useNavigate()
	return list?.length > 0 ? (
		list.map((item, i) => (
			<Board key={i} onClick={() => navigate(`/userpage/notice/${item?.uid}`)}>
				<BoardLeft high={item?.status}>
					{item?.title}
					{item?.getFile && <img src={item?.status ? '/svg/Clip.svg' : '/svg/NoneClip.svg'} alt="clip" />}
				</BoardLeft>
				<BoardRight high={item?.status}>{moment(item?.createDate).format('YYYY-MM-DD')}</BoardRight>
			</Board>
		))
	) : (
		<NotItemTitle>데이터가 존재하지 않습니다.</NotItemTitle>
	)
}

export default MainNotice
