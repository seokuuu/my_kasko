import { atom, useAtom } from 'jotai'

export const headerAtom = atom(true)
export const accordionAtom = atom(true)
export const subHeaderAtom = atom(true)

export const toggleAtom = atom(true)

export const calendarAtom = atom(false)

export const alertAtom = atom(false)

export const blueModalAtom = atom(false)

export const packageCEAtom = atom('')

export const winningAtom = atom(false)

// 오른쪽 창 모드
export const rightOneAtom = atom(true)

export const rightTwoAtom = atom(true)

export const rightThreeAtom = atom(true)

export const rightFourAtom = atom(true)

export const rightArray = atom([true, false, false, false])

// 아코디언 열기, 닫기
export const accordionOpenAtom = atom(false)
export const useAccordionOpenAtom = () => useAtom(accordionOpenAtom)
