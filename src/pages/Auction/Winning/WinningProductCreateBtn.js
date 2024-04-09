import { WhiteSkyBtn } from '../../../common/Button/Button'
import { readExcelFile } from '../../../utils/ReadExcelFile'
import useAlert from '../../../store/Alert/useAlert'

const WinningProductCreateBtn = ({ setNewResData }) => {
	const { simpleAlert } = useAlert()

	const fileUpload = async (e) => {
		const selectedFile = e.target.files

		if (!selectedFile) {
			simpleAlert('업로드할 파일을 선택해주세요.')
			return
		}

		try {
			const jsonData = await Promise.all(
				Array.from(selectedFile).map(
					(file) => readExcelFile(file), // Excel 파일을 JSON으로 변환
				),
			)
			setNewResData(jsonData[0])
		} catch (error) {
			simpleAlert('경매 낙찰 생성 엑셀 업로드 형식이 아닙니다.')
		}
	}

	return (
		<label htmlFor="winning_product_create_btn">
			<input type="file" id="winning_product_create_btn" style={{ display: 'none' }} onChange={fileUpload} />
			<WhiteSkyBtn>제품 대량 업로드</WhiteSkyBtn>
		</label>
	)
}

export default WinningProductCreateBtn
