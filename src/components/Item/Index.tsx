import { defineComponent } from "vue";
import { Cell, Tag } from 'vant';
import './style.scss'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  render() {
    const { title, label } = this.$props
    return <div class="item-root">
      <Cell size="large" title={title} label={label} >
        {{
          extra: () => <Tag type="success" size="medium" plain>完成</Tag>
        }}
      </Cell>
    </div>
  }
})