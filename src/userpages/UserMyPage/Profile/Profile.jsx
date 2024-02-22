import styled from 'styled-components'
import { getCustomerPrivacy } from '../../../api/myPage'
import useReactQuery from '../../../hooks/useReactQuery'
import UserPostCommon from '../../../components/UserPostCommon'
import { MainTitle } from '../../../common/OnePage/OnePage.Styled'

const ProfileEdit = () => {
	const { data } = useReactQuery('getCustomerPrivacy', '', getCustomerPrivacy)

	return (
		<OnePageFlexContainer>
			<MainTitle>개인정보 수정</MainTitle>
			{data?.data?.data && <UserPostCommon id={data?.data?.data?.member?.uid} isCustomer={true} />}
		</OnePageFlexContainer>
	)
}

export default ProfileEdit

const OnePageFlexContainer = styled.div`
	width: 1200px;
	font-size: 18px;
	background-color: white;
	margin-left: auto;
	margin-right: auto;
	border: 1px solid black;
	height: max-content;
`

export const IncomeImgDiv = styled.div`
	display: flex;
	font-size: 14px;
	align-items: center;
	justify-content: space-between;
	padding: 0 10px;
	width: 99%;
	height: 40px;
	background-color: #f1f1f1;
	color: #6b6b6b;
`

export const IIDImg = styled.img`
	width: 13px;
	cursor: pointer;
`
