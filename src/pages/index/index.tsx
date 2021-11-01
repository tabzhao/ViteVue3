import { defineComponent, ref, Ref, computed } from 'vue';
import Item from '../../components/Item'
import {
  DropdownMenu, DropdownItem, DropdownItemOption, PullRefresh,
  Toast, SwipeCell, Button, List
} from 'vant';
import './index.scss';
import DB, { ToDoItem } from '../../utils/data'
import { useStore } from 'vuex'
import { key } from '../../store/index'

export default defineComponent({
  name: 'Index',
  setup() {
    const optionValue = ref(1)
    const option: DropdownItemOption[] = [
      {text: '未完成', value: 0},
      {text: '进行中', value: 1},
      {text: '已完成', value: 2},
    ]
    const optionChange = (evt: number) => {
      console.log(evt)
    }
    const refresh = ref(false)
    const refreshHandler = () => {
      setTimeout(() => {
        Toast('刷新成功');
        refresh.value = false
      }, 1000);

      console.log('刷新完成')
    }

    const store = useStore(key)

    const list: Ref<ToDoItem[]> = ref([])
    return {
      option,
      optionValue,
      optionChange,
      refresh,
      refreshHandler,
      list: computed(() => store.state.coupon.list),
      store
    }
  },
  created() {
    this.store.dispatch('getList')
  },
  mounted() {

  },
  methods: {
    async action(id: number, type: string) {
      let ret
      if (type === 'del') {
        ret = await DB.delItem(id)
      } else if (type === 'do') {
        ret = await DB.updateStatus(id, {status: 1})
      }
      this.store.dispatch('getList')
    }
  },
  render() {
    return <div class="index-root">
      <DropdownMenu>
        <DropdownItem v-model={this.optionValue} options={this.option} onChange={this.optionChange}></DropdownItem>
      </DropdownMenu>
      <PullRefresh v-model={this.refresh} onRefresh={this.refreshHandler}>
        <div class="body">
          <List finishedText="没有更多了" finished={true} loading={false}>
            {this.list.map(item => (<SwipeCell>
              {{
                default: () => <Item title={item.title} label={item.remark} status={item.status} />,
                right: () => <>
                  <Button type="success" square onClick={this.action.bind(this, item.id, 'do')}>完成</Button>
                  <Button type="danger" square onClick={this.action.bind(this, item.id, 'del')}>删除</Button>
                </>
              }}
            </SwipeCell>))}
          </List>
        </div>
      </PullRefresh>
      <div class="fix-button">
        <Button type="primary" round icon="plus" url="/#/add"></Button>
      </div>
    </div>
  }
})