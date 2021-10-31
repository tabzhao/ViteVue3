import { defineComponent, Ref, ref } from 'vue'
import { Form, Field, CellGroup, NavBar, Button, FormInstance, Toast } from 'vant';
import './style.scss';
import router from './../../router'
import DB, { SaveData } from '../../utils/data'

export default defineComponent({
  name: 'Add',
  setup() {
    const formInstance = ref<FormInstance>()
    const formData: Ref<SaveData> = ref({
      title: '',
      remark: ''
    })
    const submit = () => {
      console.log(formInstance)
      formInstance.value?.validate('title').then(res => {
        DB.saveItem(formData.value).then(() => {
          Toast.success('保存成功')
          router.back()
        })
      }).catch(err => {
        console.log(err)
      })
    }
    const back = () => {
      router.back()
    }
    return {
      formInstance,
      submit,
      formData,
      back
    }
  },
  render() {
    return (<div class="add-root">
      <NavBar title="添加待办" left-text="返回" left-arrow onClick-left={this.back} />
      <Form ref="formInstance" class="form">
        <CellGroup inset>
          <Field v-model={this.formData.title} label="待办事项" name="title" placeholder="待办事项名称" required rules={[{required: true, message: '请填写事项名称'}]}></Field>
          <Field v-model={this.formData.remark} label="备注" name="remark" type="textarea" placeholder="备注" autosize></Field>
        </CellGroup>
      </Form>
      <div class="btn-box">
        <Button type="success" block round onClick={this.submit}>提交</Button>
      </div>
    </div>)
  }
})