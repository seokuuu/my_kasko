//id
export const idRegex = /^[a-z0-9]{4,12}$/

//pw
export const pwRegex = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{8,12}$/

//사업자
export const busIdRegex = /^[0-9]{3}[0-9]{2}[0-9]{5}$/

//계좌번호
export const koreanAccountNumberRegex = /^[0-9]{3}[0-9]{2}[0-9]{6,12}$/

//휴대폰 번호
export const phoneRegex = /^01([0|1|6|7|8|9])(\d{4})(\d{4})$/

// 한글과 영어로만 이루어진 문자열
export const koreanEnglishRegex = /^[가-힣a-zA-Z]+$/

//팩스번호
export const faxRegex = /^[0-9]{9,10}$/;

// 한글, 영문, 숫자, 특수문자를 포함하는 주소
export const addressRegex = /^[가-힣a-zA-Z0-9\s\-\,\.\#]+$/;

//한글 또는 영문 이름, 2~20자
export const nameRegex = /^[가-힣a-zA-Z]{2,20}$/;

//이메일
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//한글, 영문, 숫자
export const mixedStringRegex = /^[a-zA-Z0-9가-힣]+$/;

//영문, 숫자
export const numberEnglishRegex = /^[a-zA-Z0-9]+$/;
