import { createStore, createLogger } from 'vuex'
import storeSearch from './modules/search'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        storeSearch,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})