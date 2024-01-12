export function onSizeChange(e, setState) {
  setState((p) => ({ ...p, pageSize: e.target.value }))
}
