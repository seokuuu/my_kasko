import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import {
	ExInputsWrap,
	FilterLeft,
	FilterRight,
	Input,
	PWRight,
	PartWrap,
	RowWrap,
} from '../../../modal/External/ExternalFilter'

import React, { useState } from 'react'
import { DateSearchSelect, InputSearch, RadioSearchButton } from '../../../components/Search'
import CustomCheckBox from '../../Operate/UI/CustomCheckBox/CustomCheckBox'
import { GreyBtn } from '../../../common/Button/Button'
import { useAtomValue, useSetAtom } from 'jotai'
import { kyuModalAtom } from '../../../store/Layout/GlobalProductSearch'
import StandardFind from '../../../modal/Multi/StandardFind'
import { MainSelect } from '../../../common/Option/Main'
import { styled } from 'styled-components'

const ClientSearchFields = ({ search, setSearch }) => {
	const onChange = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}

	const customerStatusList = ['일반', '장기 미접속', '장기 미낙찰', '폐업', '정지']
	const agreeStatusList = ['승인', '미승인', '대기']

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
					<PartWrap>
						<h6>회원 상태</h6>
						<CustomCheckBox
							initOptions={generateCheckOptions(customerStatusList)}
							setState={setSearch}
							stateKey={'statusList'}
							isExistEntireValue={true}
							stateType="object"
						/>
					</PartWrap>
					<PartWrap first>
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
					<PartWrap>
						<h6>승인 상태</h6>
						<CustomCheckBox
							initOptions={generateCheckOptions(agreeStatusList)}
							setState={setSearch}
							stateKey={'approvalStatusList'}
							isExistEntireValue={true}
							stateType="object"
						/>
					</PartWrap>
					<PartWrap>
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
