import { atom, useAtom } from 'jotai';

export const headerAtom = atom(true);
export const accordionAtom = atom(true);
export const subHeaderAtom = atom(true);

export const toggleAtom = atom(true);

export const calendarAtom = atom(false);

export const blueModalAtom = atom(false);

export const packageCEAtom = atom('');

// 아코디언 열기, 닫기
export const accordionOpenAtom = atom(false);
export const useAccordionOpenAtom = () => useAtom(accordionOpenAtom);
