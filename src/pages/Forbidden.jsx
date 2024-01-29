import { useNavigate } from 'react-router-dom'
import { useSetAtom } from 'jotai'
import { accordionAtom, headerAtom, subHeaderAtom } from '../store/Layout/Layout'
import { styled } from 'styled-components'
import { SkyBtn } from '../common/Button/Button'
import useAuth from '../store/Auth/useAuth'

const Forbidden = () => {
	const { authRouter } = useAuth()
	const navigate = useNavigate()
	const setShowHeader = useSetAtom(headerAtom)
	const setShowAccordion = useSetAtom(accordionAtom)
	const setShowSubHeader = useSetAtom(subHeaderAtom)
	setShowHeader(false)
	setShowAccordion(false)
	setShowSubHeader(false)

	return (
		<Wrap>
			<ForbiddenWrap>
				<Main>
					<div>
						<div style={{ fontSize: '64px', fontWeight: '900', marginBottom: '10px' }}>403</div>
						<div style={{ fontSize: '23px', marginBottom: '15px' }}>접근 불가능한 페이지입니다.</div>
						<div style={{ marginTop: '10px' }}>
							<p>접근 할 수 없는 페이지입니다.</p>
							<p>회원 권한 정보가 정확한지 다시 한 번 확인해주세요.</p>
						</div>
						<BtnWrap>
							<SkyBtn
								style={{ color: '#4C83D6', background: 'white', border: '1px solid #4C83D6' }}
								width={35}
								height={40}
								fontSize={18}
								onClick={() => navigate(-2)}
							>
								이전페이지
							</SkyBtn>
							<SkyBtn width={35} height={40} fontSize={18} onClick={() => authRouter()}>
								메인 홈
							</SkyBtn>
						</BtnWrap>
					</div>
				</Main>
			</ForbiddenWrap>
		</Wrap>
	)
}

export default Forbidden

const Wrap = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	background-color: #eef3fb;
`

const ForbiddenWrap = styled.div`
	width: 890px;
	height: 480px;
	margin: auto;

	display: flex;
	background-color: white;
`
const Main = styled.div`
	width: 65%;
	height: 50%;
	margin: auto;
	text-align: center;
	justify-content: center;
	align-items: center;
	display: flex;

	> div {
		margin: auto;
	}

	p {
		font-size: 17px;
		font-weight: lighter;
	}
`

const BtnWrap = styled.div`
	margin-left: auto;
	margin-right: auto;
	width: 450px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	margin-top: 30px;
`
