import { useAtom } from 'jotai'
import { packageUidsAtom } from '../store/Layout/Layout'
import { useLocation } from 'react-router-dom'
export default function useDragginRow({ setRowData, rowData }) {
	const [packageUids, setPackageUids] = useAtom(packageUidsAtom)

	const { pathname } = useLocation()
	const len = pathname.split('/').length
	const isPackaged = pathname.split('/')[len - 1]
	const onRowDragEnd = (event) => {
		const { api } = event

		const sourceNode = event.node
		const targetNode = event.overNode

		if (!sourceNode || !targetNode) {
			return
		}

		// Get the source and target row data
		const sourceData = sourceNode?.data
		const targetData = targetNode?.data

		// Find the indexes of the source and target rows
		const sourceIndex = rowData.findIndex((row) => row['순번'] === sourceData['순번'])
		const targetIndex = rowData.findIndex((row) => row['순번'] === targetData['순번'])

		// Swap the rows in the rowData array
		const updatedRowData = [...rowData]
		;[updatedRowData[sourceIndex], updatedRowData[targetIndex]] = [
			updatedRowData[targetIndex],
			updatedRowData[sourceIndex],
		]
		// Update the state to trigger a re-render with the updated row order
		setRowData(updatedRowData)
		setPackageUids(() => updatedRowData.map((i) => (isPackaged === 'recommendpkg' ? i['고유 번호'] : i['제품 번호'])))

		// Refresh the grid to reflect the changes
		api.refreshCells()
	}
	return { onRowDragEnd, packageUids }
}
