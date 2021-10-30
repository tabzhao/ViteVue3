import { createStore, createLogger } from 'vuex'
import user from './modules/user'
import coupon from './modules/coupon'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    coupon
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})