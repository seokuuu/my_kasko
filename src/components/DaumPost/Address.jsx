import { forwardRef, useState } from 'react' // useState를 import 합니다.
import { useDaumPostcodePopup } from 'react-daum-postcode'

const AddressFinder = forwardRef(({ onAddressChange, prevAddress, prevAddressDetail }) => {
	const [address, setAddress] = useState('') // 주소 상태를 관리하는 state를 추가합니다.
	const [detailAddress, setDetailAddress] = useState('') // 상세 주소를 위한 state도 추가합니다.
	const [sido, setSido] = useState('') // 시,도
	const [sigungu, setSigungu] = useState('') // 군,구
	const [bname, setBname] = useState('') // 동

	const scriptUrl = `//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js`
	const open = useDaumPostcodePopup(scriptUrl)

	const handleComplete = (data) => {
		let fullAddress = data.address
		let extraAddress = ''

		// setAddress(fullAddress);

		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname
			}
			if (data.buildingName !== '') {
				extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
			}
			fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
		}

		setAddress(fullAddress) // 주소 상태를 업데이트합니다.
		setSido(data.sido)
		setSigungu(data.sigungu)
		setBname(data.bname)
		onAddressChange(fullAddress, detailAddress, data.sido, data.sigungu, data.bname)
	}

	const handleDetailAddressChange = (e) => {
		// 상세 주소 input의 변경 사항을 처리합니다.
		const newDetailAddress = e.currentTarget.value
		setDetailAddress(newDetailAddress) // 상태를 업데이트하고
		onAddressChange(address, newDetailAddress, sido, sigungu, bname)
	}

	const handleClick = () => {
		open({ onComplete: handleComplete })
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
