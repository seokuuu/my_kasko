import { useAtom } from 'jotai'
import { packageUidsAtom } from '../store/Layout/Layout'
export default function useDragginRow({ setRowData, rowData }) {
  const [packageUids, setPackageUids] = useAtom(packageUidsAtom)
  const onRowDragEnd = (event) => {
    const { api } = event

    const sourceNode = event.node
    const targetNode = event.overNode

    // Get the source and target row data
    const sourceData = sourceNode.data
    const targetData = targetNode.data
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
    setPackageUids(() => updatedRowData.map((i) => i['제품 번호']))

    // console.log('UIDS', packageUids)
    // Refresh the grid to reflect the changes
    api.refreshCells()
  }
  return { onRowDragEnd, packageUids }
}
