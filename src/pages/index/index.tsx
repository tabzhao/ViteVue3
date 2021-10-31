import { defineComponent, ref, Ref } from 'vue';
import Item from '../../components/Item'
import {
  DropdownMenu, DropdownItem, DropdownItemOption, PullRefresh,
  Toast, SwipeCell, Button, List
} from 'vant';
import './index.scss';
import DB, { ToDoItem } from '../../utils/data'

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

    const list: Ref<ToDoItem> = ref(['as', '123'])
    return {
      option,
      optionValue,
      optionChange,
      refresh,
      refreshHandler,
      list
    }
  },
  created() {
    
  },
  mounted() {
    DB.getList().then(res => {
      this.list.values = res
    })
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
                default: () => <Item title="我的任务我的任务我的任务我的任务我的任务我的任务我的任务" label="asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas" />,
                right: () => <>
                  <Button type="success" square>完成</Button>
                  <Button type="danger" square>删除</Button>
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