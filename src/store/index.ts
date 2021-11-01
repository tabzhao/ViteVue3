import { InjectionKey } from 'vue'
import { createStore, createLogger, Store } from 'vuex'
import user from './modules/user'
import coupon, { State as Coupon } from './modules/coupon'

const debug = process.env.NODE_ENV !== 'production'

export interface StoreState {
  coupon: Coupon
}

export const key: InjectionKey<Store<StoreState>> = Symbol()

export default createStore<StoreState>({
  modules: {
    coupon
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})