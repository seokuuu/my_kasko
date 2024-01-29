import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../api/query'
import useAlert from '../../store/Alert/useAlert'

/**
 * @description
 * 엑셀 업로드 관련 훅입니다.
 * 업로드 API를 반환합니다.
 * @returns
 */
const useExcelUpload = ({ excelUploadAPI, refreshQueryKey, setModalSwitch }) => {
	const { showAlert, simpleAlert } = useAlert()
	const { mutate: excelUpload } = useMutation(excelUploadAPI, {
		onSuccess() {
			showAlert({
				title: '등록되었습니다',
				content: '',
				func: () => {
					setModalSwitch(false)
					queryClient.invalidateQueries(refreshQueryKey)
				},
			})
		},
		onError() {
			simpleAlert('등록에 실패하였습니다.')
		},
	})
	return { excelUpload }
}

export default useExcelUpload
