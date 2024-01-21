import { styled } from 'styled-components'

//외부 필터 영역 전체 + 테이블 영역 전체 (페이지 본문 div)
export const FilterContianer = styled.div`
	width: 100%;
`

// 외부 필터 영역 (검색필터로 사라지는 부분)
export const FilterWrap = styled.div``

// 외부 필터 헤드
export const FilterHeader = styled.div`
	display: flex;

	justify-content: space-between;
	padding-left: 5px;
	padding-right: 5px;
	height: 65px;
	align-items: center;

	h1 {
		font-weight: bold;
		font-size: 24px;
		letter-spacing: -0.48px;
		font-style: normal;
	}
`

// 외부 필터 메인
export const FilterSubcontianer = styled.div`
	/* width: 100%;
  border: 1px solid #c8c8c8;
  display: flex;
  padding: 10px;
  padding-left: 30px;
  background-color: #dbe2f0;
  justify-content: space-between;
  flex-wrap: wrap;
  color: ${(props) => props.theme.colors.TxtAlter}; */
	/* overflow-x: hidden; */
	display: flex;
	width: 100%;
	padding: ${(props) => (props.modal ? '15px 30px ' : '20px 15px 24px 40px')};
	gap: 40px;
	border: 1px solid #c8c8c8;
	background-color: #dbe2f0;
`

// 패키지 생성 / 수정에 쓰이는 Fitler 최상단 div
export const FilterTopContainer = styled.div`
	width: 100%;
`

export const FilterTCTop = styled.div`
	border: 1px solid #c8c8c8;
	margin-bottom: 10px;
	background-color: white;
	padding-left: 30px;
	display: flex;
	height: 50px;
	align-items: center;
	font-weight: bold;

	p {
		margin-left: 20px;
		color: ${(props) => props.theme.colors.PriNormal};
	}
`

export const FilterTCBottom = styled.div`
	border: 1px solid #c8c8c8;
	background-color: #dbe2f0;
	margin-bottom: 20px;
	padding: 30px;
`

export const FilterTCBSub = styled.div`
	display: flex;
	padding: 16px 40px;
	align-items: center;
	gap: 150px;
	background-color: white;
	flex: 1 0 0;
	h6 {
		padding: 0px 20px;
	}
	> div {
		display: flex;
		align-items: center;
	}
`

export const FilterTCBSubdiv = styled.div`
	display: flex;
	background-color: white;
	height: 70px;
	padding: 20px;
	padding-left: 30px;
	align-items: center;
	h6 {
		padding: 0px 20px;
	}
	> div {
		display: flex;
		align-items: center;
	}
`

// FilterWrap에 한 줄만 있을 때, FilterSubContainer / FilterLeft / FilterRight 없이 단독으로 쓰임, + RowWrap에 none
export const FilterSubOneContainer = styled.div`
	width: 100%;
	border: 1px solid #c8c8c8;
	display: flex;
	padding: 10px;
	padding-left: 30px;
	background-color: #dbe2f0;
	color: ${(props) => props.theme.colors.TxtAlter};
`

//초기화 , 검색 버튼 하단 영역 div
export const FilterFooter = styled.div`
	border: 1px solid #c8c8c8;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 55px;
	background-color: #f0f1f6;
	font-size: 17px;

	p {
	}
`

// 검색 필터 Left
export const FilterLeft = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`

// 검색 필터 Right
export const FilterRight = styled.div`
	display: flex;
	gap: 8px;
	flex: 1 0 0;
	align-self: stretch;
`

//검색 필터 내 한 '줄' 영역 div
export const RowWrap = styled.div`
	display: flex;
	gap: 40px;
	align-items: center;
	padding-bottom: ${({ none, modal }) => (none ? '8px' : modal ? '10px' : '18px')};

	border-bottom: ${({ none }) => (none ? 'none' : '1px solid #c8c8c8')};
`

// 말 그대로 파트 랩 (제목 + 내용 한 '칸'짜리 div)
// 프롭스로 'first'를 받음 (제일 앞에 오는 제목 width 고정)
export const PartWrap = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	height: 32px;
	h6 {
		display: block;
		min-width: max-content;
		width: ${(props) => (props.first ? `100px` : '')};
		padding: 8px;
		gap: 8px;
		font-size: 18px;
		color: #424242;
		font-weight: 500;
		line-height: 19px;
		letter-spacing: -0.2px;
	}
`

// PartWrap의 오른쪽 부분 (제목 말고 내용)
export const PWRight = styled.div`
	display: flex;
`

export const DoubleWrap = styled.div`
	display: flex;
	gap: 8px;
	flex: 1 0 0;
	align-self: stretch;

	> h6 {
		padding: 5px;
		width: 120px;
		font-size: 18px;
	}

	> textarea {
		width: 100%;
		height: 100%;
		font-size: 16px;
		padding: 4px 8px;

		::placeholder {
			color: #acacac;
		}
	}
`

// dataGrid 범위 div
export const GridWrap = styled.div`
	display: flex;
	align-items: center;
	gap: 2px;
`

// externalFitler 공용 input
export const Input = styled.input`
	width: 145px;
	height: 37px;
	border-radius: 3px;
	border: 1px solid #c8c8c8;
	font-size: 18px;

	@media (max-width: 1500px) {
		width: 110px;
		margin-left: 15px;
	}
`

export const CustomInput = styled.input`
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	border-radius: 3px;
	border: 1px solid #c8c8c8;
	font-size: 14px;
`

// 물결표
export const Tilde = styled.div`
	margin: 5px;

	@media (max-width: 1500px) {
		margin-right: 5px;
	}
`

// 초기화 이미지
export const ResetImg = styled.img`
	transition: transform 1s ease; /* Add a smooth transition effect */
	cursor: pointer;

	&.rotate {
		transform: rotate(540deg);
	}
`

// 라디오박스 전체 div
export const ExRadioWrap = styled.div`
	display: flex;
	justify-content: center;
	gap: 20px;
`

// 체크박스 전체 div
export const ExCheckWrap = styled.div`
	display: flex;
	gap: 5px;
	justify-content: center;
	align-items: center;
	min-width: max-content;

	p {
		font-size: 17px;
		margin-left: 3px;
	}
`

// 체크박스 각각 div
export const ExCheckDiv = styled.div`
	display: flex;
	margin-right: 10px;
	padding-left: 5px;
	justify-content: center;
	align-items: center;

	p {
		margin-left: 6px;
		color: black;
		font-size: 16px;
	}
`

// input들 div
export const ExInputsWrap = styled.div`
	display: flex;
	@media (max-width: 1500px) {
		padding-left: 0px;
	}
`

export const SubTitle = styled.div`
	margin-left: 20px;
	padding-left: 20px;
	border-left: 1px solid black;
	display: flex;
	align-items: center;
	gap: 20px;
	font-size: 18px;
	height: min-content;
	margin-top: 3px;

	h5 {
		font-weight: bold;
	}

	h6 {
		color: #6b6b6b;

		&:hover {
			font-weight: bold;
		}
	}
`

export const TableTitle = styled.div`
	margin-left: 20px;
	padding: 20px 0px 10px;
	display: flex;
	align-items: center;
	gap: 20px;

	margin-top: 3px;
	h5 {
		font-weight: bold;
		font-size: 18px;
	}

	h6 {
		color: #6b6b6b;
		font-size: 18px;
	}
`

// 테이블 부분 새로 만들어라 ------------------
// 테이블 부분 (하단) 컨테이너 ->

export const TableContianer = styled.div`
	width: 100%;
	height: 100%;
	border: 1px solid #c8c8c8;
	padding: 30px;
	padding-top: 10px;
	padding-bottom: 50px;
	background-color: #fcfcfc;
`

export const TCSubContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 0px 10px 2px;
	border-bottom: ${({ bor }) => (bor ? '1px solid #c8c8c8' : 'none')};
	font-size: 16px;

	span {
		color: ${(props) => props.theme.colors.PriNormal};
		margin: 0px 4px;
	}

	> div {
		display: flex;
	}
`

export const MiniInput = styled.input`
	width: 64px;
	height: 37px;
	border: 1px solid #c8c8c8;
	font-size: 18px;
`

export const HiddenBtn = styled.div`
	display: flex;
	color: ${(props) => props.theme.colors.TxtAlter};
	margin-left: 10px;

	img {
		display: flex;
	}
`

export const PageSelect = styled.select`
	border: 1px solid #c8c8c8;
	padding-right: 20px;
`

// 흰색 배경 알림 창
export const FilterHeaderAlert = styled.div`
	width: 100%;
	border: 2px solid #c8c8c8;
	background-color: white;
	margin-bottom: 10px;
	padding: 15px 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 17px;
`

export const FilterAlterTxt = styled.div`
	font-size: 18px;
	margin-top: 10px;
`

export const FHALeft = styled.div`
	display: flex;
`

export const InputStartWrap = styled.div`
	display: flex;
	margin-left: 15px;
`

export const TableBottomWrap = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	margin-top: 50px;
	button {
		margin-left: auto;
		margin-right: auto;
	}
`

export const AlertImg = styled.div`
	position: relative;
	top: -20px;
	cursor: pointer;

	&:hover {
		font-weight: bold;
	}
`

export const EditGear = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	&:hover {
		font-weight: bold;
		text-decoration: underline;
	}
`

export const StyledHeading = styled.p`
	font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
	color: ${(props) => (props.isActive ? '' : '#6b6b6b')};
	cursor: pointer;

	&:hover {
		font-weight: bold;
	}
`

export const StyledSubHeading = styled.p`
	font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
	color: ${(props) => (props.isActive ? '' : '#6b6b6b')};
	cursor: pointer;

	&:hover {
		font-weight: bold;
	}
`

// new

export const NewFilterWrap = styled.div`
	display: flex;
	width: 100%;
	padding: 20px 15px 24px 40px;
	gap: 40px;
	border: 1px solid #c8c8c8;
	background-color: #dbe2f0;
`

export const NewFilterLeft = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`

export const NewFilterRight = styled.div`
	display: flex;
	gap: 8px;
	flex: 1 0 0;
	align-self: stretch;
`

export const NewRow = styled.div`
	display: flex;
	gap: 40px;
	align-items: center;
	padding-top: ${(props) => (props.bor ? '10px' : '0')};
`

// 제일 앞에 오는 Title은 width값을 지정해준다
export const NewTitle = styled.div`
	width: ${(props) => (props.first ? `90px` : '')};
	padding: 8px;
	gap: 8px;
	font-size: 17px;
	color: #424242;
	font-weight: 500;
	line-height: 19px;
	letter-spacing: -0.2px;
`

export const RightTitle = styled.div`
	min-width: 80px;
	color: #424242;
	font-size: 17px;
	font-weight: 500;
	line-height: 30px;
	letter-spacing: -0.2px;
`
export const RowInWrap = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	height: 30px;
`

export const Bar = styled.div`
	width: 100%;
	border-bottom: 1px solid #c8c8c8;
	height: 1px;
`

export const RightTextarea = styled.textarea`
	width: 100%;
	height: 100%;
	font-size: 16px;
	padding: 4px 8px;
`

export const SearchContainer = styled.div`
	display: flex;
	align-items: center;
	background: #dbe2f0;
`
