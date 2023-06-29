//id
export const idRegex = /^[a-z0-9]{4,12}$/;

//pw
export const pwRegex = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{8,12}$/;

//사업자
export const busIdRegex = /^[0-9]{3}[0-9]{2}[0-9]{5}$/;

//계좌번호
export const koreanAccountNumberRegex = /^[0-9]{3}[0-9]{2}[0-9]{6,12}$/;

//휴대폰 번호

export const phoneRegex = /^01([0|1|6|7|8|9])(\d{4})(\d{4})$/;
