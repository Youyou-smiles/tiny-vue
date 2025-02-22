import { $props, $prefix, $setup, defineComponent } from '@opentiny/vue-common'
import template from 'virtual-template?mobile-first'

export default defineComponent({
  name: $prefix + 'TabbarItem',
  componentName: 'TabbarItem',
  props: {
    ...$props,
    url: String,
    replace: Boolean,
    to: [String, Object],
    dot: Boolean,
    icon: Object,
    name: [Number, String],
    text: String,
    info: [Number, String],
    badge: [Number, String],
    customIcon: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    return $setup({ props, context, template })
  }
})
