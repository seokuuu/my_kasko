import { forwardRef, useState } from 'react' // useState를 import 합니다.
import { useDaumPostcodePopup } from 'react-daum-postcode'
import useAlert from '../../store/Alert/useAlert'

const sidoMapping = {
	서울: '서울특별시',
	부산: '부산광역시',
	대구: '대구광역시',
	인천: '인천광역시',
	광주: '광주광역시',
	대전: '대전광역시',
	울산: '울산광역시',
	경기: '경기도',
	충북: '충청북도',
	충남: '충청남도',
	전남: '전라남도',
	경북: '경상북도',
	경남: '경상남도',
}

const AddressFinder = forwardRef(({ onAddressChange, prevAddress, prevAddressDetail, defaultQuery = '' }) => {
	const { simpleAlert } = useAlert()
	const [address, setAddress] = useState('') // 주소 상태를 관리하는 state를 추가합니다.
	const [detailAddress, setDetailAddress] = useState('') // 상세 주소를 위한 state도 추가합니다.
	const [sido, setSido] = useState('') // 시,도
	const [sigungu, setSigungu] = useState('') // 군,구
	const [dongLee, setDongLee] = useState('') // 동,리
	const [eubMyeon, setEubMyeon] = useState('') // 읍,면

	const scriptUrl = `//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js`
	const open = useDaumPostcodePopup(scriptUrl)

	const handleComplete = (data) => {
		const jibunAddress = data.roadAddress || data.autoRoadAddress
		const sido = jibunAddress.split(' ')[0]
		let fullAddress = jibunAddress.replace(sido, sidoMapping[sido])

		if (!!defaultQuery && !fullAddress.startsWith(defaultQuery)) {
			simpleAlert('등록된 기본 주소로 다시 검색해주세요.')
			return
		}

		setAddress(fullAddress) // 주소 상태를 업데이트합니다.
		setSido(data.sido)
		setSigungu(data.sigungu)
		setDongLee(data.roadname)
		setEubMyeon(data.roadname)
		onAddressChange(fullAddress, detailAddress, data.sido, data.sigungu, data.roadname, data.roadname)
	}

	const handleDetailAddressChange = (e) => {
		// 상세 주소 input의 변경 사항을 처리합니다.
		const newDetailAddress = e.currentTarget.value
		setDetailAddress(newDetailAddress) // 상태를 업데이트하고
		onAddressChange(address, newDetailAddress, sido, sigungu, dongLee, eubMyeon)
	}

	const handleClick = () => {
		open({ onComplete: handleComplete, defaultQuery })
	}

	return (
		<>
			<div style={{ display: 'flex', width: '320px', position: 'relative', justifyContent: 'space-between' }}>
				<input
					style={{
						border: `1px solid #E1E1E1`,
						height: '40px',
						width: '250px',
						paddingRight: '20px',
					}}
					type="text"
					value={address} // 상태 값을 input의 value로 설정합니다.
					placeholder={prevAddress ? prevAddress : '주소를 검색해 주세요.'}
					readOnly // 사용자가 직접 수정하지 못하도록 합니다.
					onClick={handleClick}
				/>
				<button
					type="button"
					style={{ width: '60px', color: '#fff', background: 'linear-gradient(180deg, #454545 0%, #2E2E2E 100%)' }}
					onClick={handleClick}
				>
					찾기
				</button>
			</div>

			<div style={{ display: 'flex', width: '320px', flexDirection: 'column', position: 'relative', marginTop: '5px' }}>
				<input
					style={{ border: `1px solid #E1E1E1`, height: '40px' }}
					type="text"
					value={detailAddress} // 상세 주소의 상태 값을 이 input의 value로 설정합니다.
					onChange={handleDetailAddressChange} // 사용자가 값을 변경할 때의 이벤트를 처리합니다.
					placeholder={prevAddressDetail ? prevAddressDetail : '상세주소를 입력해 주세요.'} // addressDetail : formData 전송
				/>
			</div>
		</>
	)
})

export default AddressFinder
