import { useState } from 'react'
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

const MainNotice = ({ notices = null, docs = null }) => {
	const [noticeTab, setNoticeTab] = useState(true)
	return (
		<LeftSub2>
			<MainTabs>
				<MainTabTitle isColor={!!noticeTab} onClick={() => setNoticeTab(true)}>
					공지사항
				</MainTabTitle>
				<MainTabTitle isColor={!noticeTab} onClick={() => setNoticeTab(false)}>
					자료실
				</MainTabTitle>
			</MainTabs>
			<MainBorderBar />
			<NoticeCard list={!!noticeTab ? notices : docs} />
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
