import {atom, useAtomValue, useSetAtom} from "jotai";
import { atomWithDefault } from 'jotai/utils'

import {refresh} from "../api/auth";
import {getUser} from "../api/user";

/** 리플레쉬 토큰 */
export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        return Promise.reject();
    }
    try {
        const { data } = await refresh(refreshToken);
        sessionStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        return data;
    } catch {
        sessionStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return Promise.reject();
    }
};

/** 현재 토큰의 상태에 따라 auth를 갱신하는 함수 */
const getAuth = async () => {
    const token = {
        access: sessionStorage.getItem('accessToken'),
        refresh: localStorage.getItem('refreshToken'),
    };
    /** 로그인 한 유저 저장 */
    if (token.access) {
        /** TODO: 로그인 하였을 때 유지가 필요한 정보가 있다면 백엔드한테 요청 ex) 사용자 이름, 사용자 역할 */
        return true;
    }
    /** 로그인 유지를 리플레쉬 토큰으로 엑세스 토큰 발급 */
    if (token.refresh) {
        // const refreshResponse = await refreshAccessToken();
        // if (refreshResponse.accessToken) {
        //     sessionStorage.setItem('accessToken', refreshResponse.accessToken);
        // }
    }
    return null;
};

const authAtom = atomWithDefault(getAuth);

const updateAuthAtom = atom(null, async (get, set) => {
    set(authAtom, await getAuth());
});

/** useAtomValue을 사용하면 1번째 반환값인 value만 받을 수 있다. */
export const useAuth = () => useAtomValue(authAtom);

/** useSetAtom을 사용하면 2번째 반환값인 setter만 받을 수 있다. */
export const useUpdateAuth = () => useSetAtom(updateAuthAtom);