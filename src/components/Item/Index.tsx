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
    },
    status: {
      type: Number,
      default: 0
    }
  },
  render() {
    const { title, label } = this.$props
    return <div class="item-root">
      <Cell size="large" title={title} label={label} >
        {{
          extra: () => {
            if (this.$props.status === 0) return <Tag type="primary" size="medium" plain>未开始</Tag>
            if (this.$props.status === 1) return <Tag type="success" size="medium" plain>进行中</Tag>
            if (this.$props.status === 2) return <Tag type="warning" size="medium" plain>已完成</Tag>
          }
        }}
      </Cell>
    </div>
  }
})