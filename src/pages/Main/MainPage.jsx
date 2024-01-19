import { OverAllMain, OverAllSub, OverAllTable } from '../../common/Overall/Overall.styled'

import SideBar from '../../components/Left/SideBar'
import Header from '../../components/Header/Header'
import SubHeader from '../../components/Header/SubHeader'

import { useState } from 'react'
import useAlert from '../../store/Alert/useAlert'

const MainPage = () => {
	const [expanded, setExpanded] = useState('')
	const [depth2Color, setDepth2Color] = useState('')
	const { simpleAlert, showAlert, simpleConfirm, showConfirm, redAlert } = useAlert()

	return (
		<>
			<Header />
			<OverAllMain>
				<SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<OverAllTable>
						<div>메인 페이지입니다</div>
						<div onClick={() => simpleAlert('안녕하세요.')}>심플얼렛</div>
						<div onClick={() => showAlert({ title: '안녕하세요', content: '안녕', func: () => console.log('alert') })}>
							Alert테스트
						</div>
						<div onClick={() => simpleConfirm('안녕하세요', () => console.log('심플confirm'))}>심플Confirm</div>
						<div
							onClick={() => showConfirm({ title: '안녕하세요', content: '안녕', func: () => console.log('confirm') })}
						>
							Confirm테스트
						</div>
						<div onClick={() => redAlert('안녕', () => console.log('rede'))}>레드 버튼</div>
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default MainPage
