export function onSizeChange(e, setState) {
	setState((p) => ({ ...p, pageNum: 1, pageSize: e.target.value }))
}
