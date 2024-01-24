import { atom, useAtom } from 'jotai'

export const adminDestinationList = atom({
  '목적지 고유번호': '',
  '목적지 코드': '',
  '목적지 명': '',
  작성자: '',
  작성일: '',
  수정자: '',
  수정일: '',
})

export const adminDestinationList2 = atom({
  '목적지 고유번호': '',
  '목적지 코드': '',
  '목적지 명': '',
  작성자: '',
  작성일: '',
  수정자: '',
  수정일: '',
})

export const adminDestinationList3 = atom({
  '목적지 고유번호': '',
  '목적지 코드': '',
  '목적지 명': '',
  작성자: '',
  작성일: '',
  수정자: '',
  수정일: '',
})

/* ==============================
  테이블 숨기기 컬럼
============================== */
const talbeHiddenAtom = atom({
  hiddenIds: [],
  showId: ''
});
export const tableHiddenColumnAtom = atom((get) => get(
  talbeHiddenAtom).hiddenIds || [], 
  (get, set, update) => set(talbeHiddenAtom, { ...get(talbeHiddenAtom), hiddenIds: Array.from(new Set([...get(talbeHiddenAtom).hiddenIds, update])) })
);
export const tableShowColumnAtom = atom(
  (get) => get(talbeHiddenAtom).showId || '', 
  (get, set, update) => set(talbeHiddenAtom, {...get(talbeHiddenAtom), showId: update})
);
export const tableResetColumnAtom = atom(null, (get, set) => {
  const prevHiddenId = get(talbeHiddenAtom).showId;
  set(talbeHiddenAtom, {hiddenIds: get(talbeHiddenAtom).hiddenIds.filter(v => v !== prevHiddenId), showId: ''})
});
