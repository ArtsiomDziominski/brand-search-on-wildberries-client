import axios from "axios";
import {BURL, GET_SEARCH, HEADER_CONTENT_TYPE} from "@/const/const";

const getters = {
    requestSearch: () => (body) => {
        return axios.post(BURL + GET_SEARCH, body, {
            headers: {
                'Content-Type': HEADER_CONTENT_TYPE,
            }
        })
    },
}

export default {
    namespaced: true,
    getters,
}