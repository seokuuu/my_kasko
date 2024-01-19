import { atom } from 'jotai'

export const initAlertAtomData = {
	isOpen: false,
	isConfirm: false,
	isRed: false,
	title: '',
	content: '',
	func: () => {},
}

export const alertAtom = atom(initAlertAtomData)
