export const popupDummy = [
  // 1-n : title + content 검정버튼(확인)
  // 2-n : title + content 검정버튼(확인) + 흰색버튼(취소)
  // 3-n : title + content 빨강버튼(삭제) + 흰색버튼(취소)
  // ------------------------------------------------
  // 1
  {
    num: '1-1',
    title: '승인 대기 중 입니다.',
    content: '관리자가 승인 대기중 입니다. \n관리자 승인 후 이용하실 수 있습니다.',
    next: '1-2',
    func: () => {},
  },

  {
    num: '1-2',
    title: '관리자에게 문의 해주세요.',
  },
  {
    num: '1-3',
    title: '비밀번호를 변경해 주세요.',
    content: '임시 비밀번호를 사용하고 있습니다. \n비밀번호를 변경해 주세요.',
  },
  {
    num: '1-4',
    title: '필수 이용약관 동의를 체크해 주세요.',
    content: '개인정보 활용 동의 및 이용약관에 동의해 주세요.',
  },
  {
    num: '1-5',
    title: '이미 사용 중인 아이디 입니다.',
  },
  {
    num: '1-6',
    title: '회원가입 승인 중',
    content: '관리자가 승인 대기 중 입니다. \n관리자 승인 후 이용하실 수 있습니다.',
  },
  {
    num: '1-7',
    title: '안내',
    content: '장기 미 로그인(90일)으로 인해 로그인이 제한되었습니다. \n카스코 철강으로 문의주세요.',
  },
  {
    num: '1-8',
    title: '입력하신 정보로 가입 된 아이디가 없습니다.',
    content: '내용을 다시 한번 확인해 주세요.',
  },
  {
    num: '1-9',
    title: '임시 비밀번호 발송 완료',
    content: '입력하신 이메일로 임시 비밀번호가 \n 발송되었습니다.',
  },
  {
    num: '1-10',
    title: '일치하는 계정이 없습니다.',
    content: '입력하신 정보가 맞는지 확인 후 다시 진행해 주세요.',
  },
  {
    num: '1-11',
    title: '검색할 내용이 없습니다. 확인 후 다시 시도해 주세요.',
  },
  {
    num: '1-12',
    title: '저장이 완료되었습니다.',
  },
  {
    num: '1-13',
    title: '비밀번호가 일치하지 않습니다. \n다시 입력해주세요.',
  },
  {
    num: '1-14',
    title: '삭제 되었습니다.',
  },
  {
    num: '1-15',
    title: '삭제할 수 없습니다. \n해당 항목은 현재 사용 중입니다.',
  },
  {
    num: '1-16',
    title: '아이디는 최소 4자 이상이어야 합니다.',
  },
  {
    num: '1-17',
    title: '아이디는 영문, 숫자 조합 4-12자리를 사용해 주세요.',
  },
  {
    num: '1-18',
    title: '사용 가능한 아이디 입니다.',
  },

  // 2
  {
    num: '2-1',
    title: '목적지를 등록하시겠습니까?',
    content: '현재 등록된 목적지가 없어 경매에 참여하실 수 없습니다.',
    next: '3-2',
  },
  {
    num: '2-2',
    title: '목적지를 삭제하시겠습니까?',
    next: '1-14',
    func: '',
  },
  {
    num: '2-3',
    title: '저장하시겠습니까?',
    next: '1-12',
  },
  {
    num: '2-4',
    title: '현재 작업 중인 내용이 저장되지 않았습니다. \n페이지를 나가시겠습니까?',
  },
  {
    num: '2-5',
    title: '목적지를 등록하지 않으면 \n경매에 참여하실 수 없습니다. \n목적지를 등록하시겠습니까?',
  },
  {
    num: '2-6',
    title: '삭제하시겠습니까?',
    next: '1-14',
    func: '',
  },

  // 3
  {
    num: '3-1',
    title: '회원 정보 변경',
    content: '변경된 사항을 저장하시겠습니까?',
    next: '3-2',
  },

  {
    num: '3-4',
    title: '팝업 등록',
    content: '작성하신 내용으로 팝업을 등록하시겠습니까?',
  },
]
