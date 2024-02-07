import { FadeLoader } from 'react-spinners'
import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import { useAtomValue } from 'jotai'
import { loadingAtom } from './loadingAtom'

const LoadingContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0 0, 0, 0.5);
	z-index: 99999;
	overflow-y: hidden;
`

const LoadingSpinner = () => {
	const isLoading = useAtomValue(loadingAtom)

	useEffect(() => {
		if (isLoading) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [isLoading])

	return (
		isLoading && (
			<LoadingContainer>
				<FadeLoader color="#4C83D6" size={20} />
			</LoadingContainer>
		)
	)
}

export default LoadingSpinner
