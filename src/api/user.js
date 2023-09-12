import {client} from "./index";

const urls = {
    get: '/user/signup',
};

/* ==============================
    회원 정보
============================== */
export function getUser() {
    return client.get(urls.get);
}
