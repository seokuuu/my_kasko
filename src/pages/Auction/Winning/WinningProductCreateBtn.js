import { WhiteSkyBtn } from '../../../common/Button/Button'
import { readExcelFile } from '../../../utils/ReadExcelFile'
import useAlert from '../../../store/Alert/useAlert'

const WinningProductCreateBtn = ({ newResData, setNewResData, values, setValues, setWinningCreateData }) => {
	const { simpleAlert } = useAlert()

	const fileUpload = async (e) => {
		const selectedFile = e.target.files

		if (!selectedFile) {
			simpleAlert('업로드할 파일을 선택해주세요.')
			return
		}

		try {
			const productNumbers = values.map((item) => item.productNumber)

			const jsonData = await Promise.all(
				Array.from(selectedFile).map(
					(file) => readExcelFile(file), // Excel 파일을 JSON으로 변환
				),
			)

			for (let v of jsonData[0]) {
				if (v['낙찰가'] === 0) {
					throw new Error(v['제품 번호'] + ': 낙찰가 0입니다. ')
					return
				}
				if (v['확정전송가'] === 0) {
					throw new Error(v['제품 번호'] + ': 확정전송가 0입니다. ')
					return
				}
			}

			const newJsonData = jsonData[0].filter((item) => !productNumbers.includes(item['제품 번호']))
			setNewResData([...newResData, ...newJsonData])

			const newValues = jsonData[0]
				.filter((item) => !productNumbers.includes(item['제품 번호']))
				.map((item) => ({
					productUid: null,
					productNumber: item['제품 번호'],
					biddingPrice: item['낙찰가'],
					confirmPrice: item['확정전송가'],
				}))

			setValues([...values, ...newValues])

			setWinningCreateData((prevData) => ({
				...prevData,
				productList: [...values, ...newValues],
			}))
		} catch (error) {
			document.getElementById('winning_product_create_btn').value = ''
			simpleAlert(error?.message || '경매 낙찰 생성 엑셀 업로드 형식이 아닙니다.')
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
