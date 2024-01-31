import { atom, useSetAtom } from 'jotai'

export const loadingAtom = atom(false)

export const useLoading = (isLoading) => {
	const setLoading = useSetAtom(loadingAtom)
	setLoading(isLoading)
}
