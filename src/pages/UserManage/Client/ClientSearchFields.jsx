import { FilterLeft, FilterRight, Input, PartWrap, PWRight, RowWrap } from '../../../modal/External/ExternalFilter'

import React from 'react'
import CustomCheckBox from '../../Operate/UI/CustomCheckBox/CustomCheckBox'
import { MainSelect } from '../../../common/Option/Main'
import { styled } from 'styled-components'

const ClientSearchFields = ({ search, setSearch }) => {
	const onChange = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}
	const roleList = ['창고', '운송사', '현대제철', '카스코철강', '고객사']
	const customerStatusList = ['일반', '장기 미접속', '장기 미낙찰', '폐업', '정지']
	const agreeStatusList = ['승인', '미승인', '대기']
	const auctionStatusList = ['제한 없음', '경매 제한', '시작가 제한']

	function generateCheckOptions(textOptions) {
		return textOptions.map((text) => ({
			text: text,
			value: text,
			checked: false,
		}))
	}

	return (
		<>
			<FilterLeft>
				<RowWrap>
					<PartWrap first>
						<CustomPartWrap>
							<MainSelect
								name="category"
								options={[
									{ label: '선택', value: '' },
									{ label: '고객사 명', value: '고객사' },
									{ label: '고객 코드', value: '고객 코드' },
									{ label: '사업자 번호', value: '사업자 번호' },
								]}
								value={search.category || { label: '선택', value: '' }}
								onChange={(e) => onChange('category', e)}
							/>
							<Input name="keyword" value={search.keyword} onChange={(e) => onChange('keyword', e.target.value)} />
						</CustomPartWrap>
					</PartWrap>
					<PartWrap>
						<h6>고객사 유형</h6>
						<PWRight>
							<MainSelect
								name="type"
								options={[
									{ label: '전체', value: '' },
									{ label: '업태', value: '업태' },
									{ label: '유통', value: '유통' },
									{ label: '제조', value: '제조' },
								]}
								value={search.type || { label: '전체', value: '' }}
								onChange={(e) => onChange('type', e)}
							/>
						</PWRight>
					</PartWrap>
				</RowWrap>
				<RowWrap>
					<PartWrap first>
						<h6>사용자 구분</h6>
						<CustomCheckBox
							initOptions={generateCheckOptions(roleList)}
							setState={setSearch}
							stateKey={'roles'}
							isExistEntireValue={true}
							stateType="object"
						/>
					</PartWrap>
				</RowWrap>
				<RowWrap>
					<PartWrap first>
						<h6>회원 상태</h6>
						<CustomCheckBox
							initOptions={generateCheckOptions(customerStatusList)}
							setState={setSearch}
							stateKey={'statusList'}
							isExistEntireValue={true}
							stateType="object"
						/>
					</PartWrap>
				</RowWrap>
				<RowWrap>
					<PartWrap first>
						<h6>경매 제한 상태</h6>
						<CustomCheckBox
							initOptions={generateCheckOptions(auctionStatusList)}
							setState={setSearch}
							stateKey={'auctionStatusList'}
							isExistEntireValue={true}
							stateType="object"
						/>
					</PartWrap>
				</RowWrap>
				<RowWrap none>
					<PartWrap first>
						<h6>승인 상태</h6>
						<CustomCheckBox
							initOptions={generateCheckOptions(agreeStatusList)}
							setState={setSearch}
							stateKey={'approvalStatusList'}
							isExistEntireValue={true}
							stateType="object"
						/>
					</PartWrap>
				</RowWrap>
			</FilterLeft>
			<FilterRight></FilterRight>
		</>
	)
}

const CustomPartWrap = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	height: 32px;

	& input {
		width: 230px;
		margin: 0;
	}
`

export default ClientSearchFields
