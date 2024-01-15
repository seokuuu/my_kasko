import {client} from "./index";
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from "./query";

const urls = {
    get: '/user/signup',
    getCart: '/sale-product/cart',
    requestOrder: '/sale-product/order',
    getOrder: '/sale-product/order',
    requestOrderCancel: '',
    getDestination: '/auction/destination',
    modifyDestination: '/auction/successfulBid/request',
};

/* ==============================
    회원 정보
============================== */
export function getUser() {
    return client.get(urls.get);
}

/**
 * 장바구니 목록 조회 쿼리
 * @param {'SINGLE | 'PACKAGE} param.category 카테고리 
 * @param {number} param.pageNum 페이지 
 * @param {number} param.pageSize 페이지당 조회 갯수 
 */
export const useUserCartListQuery = (param) => useQuery({
    queryKey: ["user","cart",param],
    queryFn: async() => {
        const { data } = await client.get(`${urls.getCart}/${param.category}?pageNum=${param.pageNum || 1}&pageSize=${param.pageSize || 50}`);
        return data.data; 
    }
  });

/**
 * 주문하기 API 뮤테이션
 * @param {*} orderParam
 * @description 장바구니 > 선택항목 주문하기 API
 */
export const useUserOrderMutaion = () => useMutation({
    mutationFn: async(orderParam) => {
        await client.post(urls.requestOrder, orderParam);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: 'cart' });
        return alert('주문을 완료하였습니다.');
    },
    onError: () => {
        return alert('주문 요청 중 오류가 발생했습니다.\n다시 시도해 주세요.');
    }
  });

/**
 * 상시판매 주문확인 API 쿼리
 * @param {number} param.pageNum 페이지 
 * @param {number} param.pageSize 페이지당 조회 갯수 
 */
export const useUserOrderListQuery = (param) => useQuery({
    queryKey: ["user","order", param],
    queryFn: async() => {
        if(param && param.productNumberList) {
            param.productNumberList = param.productNumberList.replace(/[\n ,]+/g, ',');
        }
        const params = new URLSearchParams(param);
        const { data } = await client.get(`${urls.getOrder}?${params.toString()}`);
        return data.data; 
    },
  });

/**
 * 주문취소 API 뮤테이션
 * @param {*} cancelParam
 * @description 주문확인 > 선택항목 주문취소하기
 */
export const useUserOrderCancelMutaion = () => useMutation({
    mutationFn: async(cancelParam) => {
        await client.post(urls.requestOrderCancel, cancelParam);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: 'order' });
        return alert('주문을 취소하였습니다.');
    },
    onError: () => {
        return alert('주문 취소 중 오류가 발생했습니다.\n다시 시도해 주세요.');
    }
  });

/**
 * 상시판매 주문확인상세 API 쿼리
 * @param {number} param.pageNum 페이지 
 * @param {number} param.pageSize 페이지당 조회 갯수 
 * @param {number} param.auctionNumber 상시판매 번호 
 */
export const useUserOrderDetailsQuery = (param) => useQuery({
    queryKey: ["user","order", "details", param],
    queryFn: async() => {
        const params = new URLSearchParams(param);
        const { data } = await client.get(`${urls.getOrder}?${params.toString()}`);
        return data.data; 
    },
  });

/**
 * 목적지 변경 목록 API 쿼리 
 */
export const useUserDestinationQuery = (param) => useQuery({
    queryKey: ["user","destination", "list", param],
    queryFn: async() => {
        const { data } = await client.get(urls.getDestination);
        return data.data; 
    },
  });

export const useUserDestinationUpdateRequestMutation = () => useMutation({
    mutationFn: async(param) => {
        await client.post(urls.modifyDestination, param);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: 'order' });
        return alert('목적지 변경 승인을 요청하였습니다.');
    },
    onError: () => {
        return alert('목적지 변경 요청중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
})
