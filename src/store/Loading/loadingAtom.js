import { atom, useSetAtom } from 'jotai'
import { useEffect } from 'react'

export const loadingAtom = atom(false)

export const useLoading = (isLoading) => {
	const setLoading = useSetAtom(loadingAtom)

	useEffect(() => {
		setLoading(isLoading)
	}, [isLoading])
}
