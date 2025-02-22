<!--
 * Copyright (c) 2022 - present TinyVue Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 -->
<script lang="tsx">
import { renderless, api } from '@opentiny/vue-renderless/scrollbar/vue'
import { $prefix, setup, h, defineComponent } from '@opentiny/vue-common'
import { calcScrollWidth } from '@opentiny/utils'
import { toObject } from '@opentiny/utils'
import Bar from './bar.vue'

export default defineComponent({
  name: $prefix + 'Scrollbar',
  emits: ['mouseenter', 'mousemove', 'scroll'],
  components: {
    Bar
  },
  props: {
    marginBottomAdjust: {
      type: Number,
      default: 0
    },
    native: Boolean,
    // 如果container尺寸不会发生变化，最好设置它可以优化性能
    noresize: Boolean,
    // select 选择器下拉框数据过多时默认显示滚动条
    show: Boolean,
    tag: {
      type: String,
      default: 'div'
    },
    viewClass: {},
    viewStyle: {},
    wrapClass: {},
    wrapStyle: {}
  },
  setup(props, context) {
    return setup({ props, context, renderless, api, mono: true })
  },
  render() {
    const {
      tag,
      vm: { $slots },
      native,
      wrapStyle,
      wrapClass,
      viewStyle,
      viewClass,
      handleScroll,
      state,
      show,
      marginBottomAdjust
    } = this
    const gutter = calcScrollWidth()
    let style = wrapStyle

    if (gutter) {
      const gutterWith = `-${gutter}px`
      const gutterHeight = `-${gutter - marginBottomAdjust}px`
      const gutterStyle = `margin-bottom: ${gutterHeight}; margin-right: ${gutterWith};`

      if (Array.isArray(wrapStyle)) {
        style = toObject(wrapStyle)
        style.marginRight = gutterWith
        style.marginBottom = gutterHeight
      } else if (typeof wrapStyle === 'string') {
        style += gutterStyle
      } else {
        style = gutterStyle
      }
    }

    const view = h(
      tag,
      {
        class: ['tiny-scrollbar__view', viewClass],
        style: viewStyle,
        ref: 'resize'
      },
      $slots.default ? $slots.default() : $slots.empty && $slots.empty()
    )

    const wrap = (
      <div
        ref="wrap"
        style={style}
        onScroll={handleScroll}
        class={[wrapClass, 'tiny-scrollbar__wrap', gutter ? '' : 'tiny-scrollbar__wrap--hidden-default']}>
        {[view]}
      </div>
    )

    let nodes

    if (native) {
      nodes = [
        <div ref="wrap" class={[wrapClass, 'tiny-scrollbar__wrap']} style={style}>
          {[view]}
        </div>
      ]
    } else {
      nodes = [
        wrap,
        <Bar move={state.moveX} size={state.sizeWidth} show={show}></Bar>,
        <Bar vertical move={state.moveY} size={state.sizeHeight} show={show}></Bar>
      ]
    }

    return (
      <div
        class="tiny-scrollbar"
        onMouseenter={(e) => {
          this.$emit('mouseenter', e)
        }}
        onMousemove={(e) => {
          this.$emit('mousemove', e)
        }}>
        {nodes}
      </div>
    )
  }
})
</script>
