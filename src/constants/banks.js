export const bankList = {
  banks: [
    {
      name: '은행선택',
    },
    {
      name: '경남은행',
      code: '039',
      short_code: '39',
      english_name: 'KYONGNAMBANK',
    },
    {
      name: '광주은행',
      code: '034',
      short_code: '34',
      english_name: 'GWANGJUBANK',
    },
    {
      name: '단위농협(지역농축협)',
      code: '012',
      short_code: '12',
      english_name: 'LOCALNONGHYEOP',
    },
    {
      name: '부산은행',
      code: '032',
      short_code: '32',
      english_name: 'BUSANBANK',
    },
    {
      name: '새마을금고',
      code: '045',
      short_code: '45',
      english_name: 'SAEMAUL',
    },
    {
      name: '산림조합',
      code: '064',
      short_code: '64',
      english_name: 'SANLIM',
    },
    {
      name: '신한은행',
      code: '088',
      short_code: '88',
      english_name: 'SHINHAN',
    },
    {
      name: '신협',
      code: '048',
      short_code: '48',
      english_name: 'SHINHYEOP',
    },
    {
      name: '씨티은행',
      code: '027',
      short_code: '27',
      english_name: 'CITI',
    },
    {
      name: '우리은행',
      code: '020',
      short_code: '20',
      english_name: 'WOORI',
    },
    {
      name: '우체국예금보험',
      code: '071',
      short_code: '71',
      english_name: 'POST',
    },
    {
      name: '저축은행중앙회',
      code: '050',
      short_code: '50',
      english_name: 'SAVINGBANK',
    },
    {
      name: '전북은행',
      code: '037',
      short_code: '37',
      english_name: 'JEONBUKBANK',
    },
    {
      name: '제주은행',
      code: '035',
      short_code: '35',
      english_name: 'JEJUBANK',
    },
    {
      name: '카카오뱅크',
      code: '090',
      short_code: '90',
      english_name: 'KAKAOBANK',
    },
    {
      name: '토스뱅크',
      code: '092',
      short_code: '92',
      english_name: 'TOSSBANK',
    },
    {
      name: '하나은행',
      code: '081',
      short_code: '81',
      english_name: 'HANA',
    },
    {
      name: '홍콩상하이은행',
      code: '054',
      short_code: '54',
      english_name: 'HSBC',
    },
    {
      name: 'IBK기업은행',
      code: '003',
      short_code: '03',
      english_name: 'IBK',
    },
    {
      name: 'KB국민은행',
      code: '004',
      short_code: '06',
      english_name: 'KOOKMIN',
    },
    {
      name: 'DGB대구은행',
      code: '031',
      short_code: '31',
      english_name: 'DAEGUBANK',
    },
    {
      name: 'KDB산업은행',
      code: '002',
      short_code: '02',
      english_name: 'KDBBANK',
    },
    {
      name: 'NH농협은행',
      code: '011',
      short_code: '11',
      english_name: 'NONGHYEOP',
    },
    {
      name: 'SC제일은행',
      code: '023',
      short_code: '23',
      english_name: 'SC',
    },
    {
      name: 'Sh수협은행',
      code: '007',
      short_code: '07',
      english_name: 'SUHYEOP',
    },
  ],
}
export const getBankNames = () => {
  return bankList.banks.map((bank, index) => ({
    value: `ask${index}`, // 고유한 값으로 'ask'와 인덱스를 결합
    label: bank.name, // 은행 이름
  }))
}
