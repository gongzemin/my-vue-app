import { defineComponent } from 'vue'

const myComponent = defineComponent({
  name: 'MyComponent',
  setup() {
    const message = '🤣还有一点时间'
    return () => <div>{message}</div>
  },
})
export default myComponent
