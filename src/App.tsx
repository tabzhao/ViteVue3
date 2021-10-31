import { defineComponent, Transition } from 'vue'
import { RouterView } from 'vue-router'
import './assets/style/style.scss'
import 'animate.css';

export default defineComponent({
  render() {
    return <>
      <RouterView>
        {{
          default: ({ Component }: any) => {
            return <Transition name="fade" appear mode="out-in">
              <div class="root" key={+(new Date())}>{Component}</div>
            </Transition>
          }
        }}
      </RouterView>
    </>
  }
})
