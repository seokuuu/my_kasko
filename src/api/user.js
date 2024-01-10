import {client} from "./index";
import { useQuery, useMutation } from '@tanstack/react-query';

const urls = {
    get: '/user/signup',
    getCart: '/sale-product/cart',
    requestOrder: '/sale-product/order'
};

/* ==============================
    회원 정보
============================== */
export function getUser() {
    return client.get(urls.get);
}

/**
 * 장바구니 목록 조회 API
 * @param {'SINGLE | 'PACKAGE} category 카테고리 
 * @param {number} param.pageNum 페이지 
 * @param {number} param.pageSize 페이지당 조회 갯수 
 * @returns 목록조회 AxiosInstance
 */
export function getUserCartList(category, param) {
    return client.get(`${urls.getCart}/${category}?pageNum=${param.pageNum || '1'}&pageSize=${param.pageSize}`, {
        headers: {
            Authorization:  'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNTAwIiwiYXV0aCI6IuqzoOqwneyCrCzsmrTsmIHqtIDrpqwiLCJleHAiOjE3MDQ4ODEwMzN9.3UyW_QczLzinMTaNxi7ZLxw-wVPUF4Yp-go8wlvZdryqN3nCI-K2_PRcW392pVWLScmApWWpKsRxbYYpELERbw'
        }
    });
};
// 장바구니 목록 조회 쿼리
export const useUserCartListQuery = (category, searchParam) => useQuery({
    queryKey: ["user","cart",category, searchParam],
    queryFn: async() => {
        const { data } = await getUserCartList(category, searchParam);
        return data.data; 
    }
  });

/**
 * 장바구니 > 주문하기 API
 * @param {*} orderParam
 */
export function requestUserOrder(orderParam) {
    return client.post(urls.requestOrder, orderParam, {
        headers: {
            Authorization:  'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNTAwIiwiYXV0aCI6IuqzoOqwneyCrCzsmrTsmIHqtIDrpqwiLCJleHAiOjE3MDQ4ODEwMzN9.3UyW_QczLzinMTaNxi7ZLxw-wVPUF4Yp-go8wlvZdryqN3nCI-K2_PRcW392pVWLScmApWWpKsRxbYYpELERbw'
        }
    });
};
// 장바구니 주문하기 뮤테이션
export const useUserOrderMutaion = () => useMutation({
    mutateFn: async(orderParam) => {
        const { data } = await getUserCartList(orderParam);
        return data; 
    },
    onSuccess: () => {
        // 주문 완료 api
        return alert('주문을 완료하였습니다.');
    },
    onError: () => {
        return alert('주문 요청 중 오류가 발생했습니다.\n다시 시도해 주세요.');
    }
  });