import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import { queryClient } from '../query'

const urls = {
	getPopupList: 'main/popup',
}

const keys = {
	getPopupList: 'getPopupList',
}

// 목록 GET
export function getPopupList() {
	return client.get(urls.getPopupList)
}
