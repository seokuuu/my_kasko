import {client} from "./index";
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from "./query";

const urls = {
    get: '/user/signup',
    singleProductList: '/single-product',
    packageProductList: '/package-product',
    cartList: '/sale-product/cart', // GET
    cartRequest: '/sale-product/cart', // POST
    orderRequest: '/sale-product/order', // POST
    orderList: '/sale-product/order', // GET
    orderCancel: '/admin/order/cancel',
    destinationList: '/auction/destination',
    destinationUpdate: '/auction/successfulBid/request',
};

/* ==============================
    회원 정보
============================== */
export function getUser() {
    return client.get(urls.get);
}

/**
 * 상시판매 단일 목록 API 쿼리
 * @param {number} param.pageNum 페이지 
 * @param {number} param.pageSize 페이지당 조회 갯수 
 */
export const useUserSingleProductListQuery = (param) => useQuery({
    queryKey: ["user","single", param],
    queryFn: async() => {
        const { data } = await client.get(getUrlWithSearchParam(urls.singleProductList, param));
        return data.data; 
    },
});

/**
 * 상시판매 패키지 목록 API 쿼리
 * @param {number} param.pageNum 페이지 
 * @param {number} param.pageSize 페이지당 조회 갯수 
 */
export const useUserPackageProductListQuery = (param) => useQuery({
    queryKey: ["user","package", param],
    queryFn: async() => {
        const { data } = await client.get(getUrlWithSearchParam(urls.packageProductList, param));
        return data.data; 
    },
});

/**
 * 장바구니 목록 조회 쿼리
 * @param {'SINGLE | 'PACKAGE} param.category 카테고리 
 * @param {number} param.pageNum 페이지 
 * @param {number} param.pageSize 페이지당 조회 갯수 
 */
export const useUserCartListQuery = (param) => useQuery({
    queryKey: ["user","cart",param],
    queryFn: async() => {
        const { data } = await client.get(`${urls.cartList}/${param.category}?pageNum=${param.pageNum || 1}&pageSize=${param.pageSize || 50}`);
        return data.data; 
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
        const { data } = await client.get(getUrlWithSearchParam(urls.orderList, param));
        return data.data; 
    },
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
        const { data } = await client.get(getUrlWithSearchParam(urls.orderList, param));
        return data.data; 
    },
});

/**
 * 장바구니  추가하기 API 뮤테이션
 * @param {*} cartParam
 * @description 장바구니 추가하기 API
 */
export const useUserAddCartMutaion = () => useMutation({
    mutationFn: async(cartParam) => {
        await client.post(urls.cartRequest, cartParam);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: 'cart' });
        return alert('장바구니에 추가하였습니다.');
    },
    onError: () => {
        return alert('장바구니 추가 요청 중 오류가 발생했습니다.\n다시 시도해 주세요.');
    }
});

/**
 * 주문하기 API 뮤테이션
 * @param {*} orderParam
 * @description 장바구니 > 선택항목 주문하기 API
 */
export const useUserOrderMutaion = () => useMutation({
    mutationFn: async(orderParam) => {
        await client.post(urls.orderRequest, orderParam);
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
 * 주문취소 API 뮤테이션
 * @param {*} cancelParam
 * @description 주문확인 > 선택항목 주문취소하기
 */
export const useUserOrderCancelMutaion = () => useMutation({
    mutationFn: async(cancelParam) => {
        await client.post(urls.orderCancel, cancelParam);
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
 * 목적지 변경 목록 API 쿼리 
 */
export const useUserDestinationQuery = (param) => useQuery({
    queryKey: ["user","destination", "list", param],
    queryFn: async() => {
        const { data } = await client.get(urls.destinationList);
        return data.data; 
    },
});

export const useUserDestinationUpdateRequestMutation = () => useMutation({
    mutationFn: async(param) => {
        await client.post(urls.destinationUpdate, param);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: 'order' });
        return alert('목적지 변경 승인을 요청하였습니다.');
    },
    onError: () => {
        return alert('목적지 변경 요청중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
})

/* ==================== COMMON UTILS start==================== */
/**
 * 제품번호 목록을 포함한 필터 파라미터 반환 함수
 * @param {string} url API url
 * @param {string} param.productNumberList 제품번호 목록
 * @returns {string} url including searchParams
 */
function getUrlWithSearchParam(url, param) {
    if(param && param.productNumberList) {
        param.productNumberList = param.productNumberList.replace(/[\n ,]+/g, ',');
    }
    const params = new URLSearchParams(param);
    return `${url}?${params.toString()}`
}
/* ==================== COMMON UTILS end ==================== */