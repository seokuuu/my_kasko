import React from 'react'
import { Controller } from 'react-hook-form'
import { SInput } from '../../../common/Input/Input'
import { EmailSelect, emailOptionsIncludingDirect } from '../../../common/Option/SignUp'

/**
 * @description
 * 이메일 도메인 필드입니다.
 */
const EmailDomain = ({ watch, control, register }) => {
	const emailDomain = watch('emailDomain')

	return emailDomain && emailDomain.value === 'directWrite' ? (
		<SInput
			name="emailDomainInputMode"
			{...register('emailDomainInputMode', { required: '도메인을 입력해주세요.' })}
			style={{
				width: '200px',
			}}
		/>
	) : (
		<Controller
			name="emailDomain"
			control={control}
			rules={{ required: '도메인을 선택해 주세요.' }}
			render={({ field }) => (
				<EmailSelect
					{...field}
					options={emailOptionsIncludingDirect}
					defaultValue={emailOptionsIncludingDirect[0]}
					onChange={(selectedOption) => field.onChange(selectedOption)}
				/>
			)}
		/>
	)
}

export default EmailDomain
