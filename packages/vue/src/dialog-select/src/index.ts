import { $props, $setup, $prefix, defineComponent } from '@opentiny/vue-common'
import PCTemplate from './pc.vue'

const template = () => {
  return PCTemplate
}

const $constants = {
  INPUT_HEIGHT: '32px',
  INPUT_MARGIN_BOTTOM: '8px'
}

export default defineComponent({
  name: $prefix + 'DialogSelect',
  props: {
    ...$props,
    _constants: {
      type: Object,
      default: () => $constants
    },
    dialogOp: {
      type: Object,
      default: () => ({})
    },
    visible: Boolean,
    popseletor: {
      type: String,
      default: 'grid',
      validator: (value) => ~['grid', 'tree'].indexOf(value)
    },
    multi: {
      type: Boolean,
      default: false
    },
    gridOp: {
      type: Object,
      default: () => ({ columns: [], data: [] })
    },
    textField: {
      type: String,
      default: 'label'
    },
    textSplit: {
      type: String,
      default: '/'
    },
    valueField: {
      type: String,
      default: 'id'
    },
    valueSplit: {
      type: String,
      default: ';'
    },
    remoteSearch: Function,
    showPager: {
      type: Boolean,
      default: true
    },
    pagerOp: {
      type: Object,
      default: () => ({})
    },
    showSelectedBox: {
      type: Boolean,
      default: true
    },
    selectedBoxOp: {
      type: Object,
      default: () => ({})
    },
    treeOp: {
      type: Object,
      default: () => ({})
    },
    beforeClose: Function,
    autoLookup: {
      type: Boolean,
      default: true
    },
    lookupMethod: Function,
    mainHeight: {
      type: Number,
      default: 290
    }
  },
  setup(props, context) {
    return $setup({ props, context, template })
  }
})
