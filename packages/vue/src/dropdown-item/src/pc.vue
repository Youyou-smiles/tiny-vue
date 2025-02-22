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

<template>
  <!-- TINY-TODO:  tiny-dropdown-menu__item命名不规范，后续统一有个迭代去掉 -->
  <li
    v-auto-tip="
      state.computedTip ? { always: true, content: state.computedTip, effect, placement: tipPosition } : false
    "
    :class="[
      'tiny-dropdown-item',
      'tiny-dropdown-menu__item',
      state.sizeClass,
      disabled ? 'is-disabled' : '',
      divided ? 'tiny-dropdown-item--divided tiny-dropdown-menu__item--divided' : '',
      state.checkedStatus && selected ? 'tiny-dropdown-item--check-status' : '',
      itemData.children && itemData.children.length ? 'has-children' : ''
    ]"
    ref="dropdownItem"
    @click.stop="handleClick"
    @mousedown.stop
    :aria-disabled="disabled"
    :tabindex="disabled ? null : -1"
  >
    <div class="tiny-dropdown-item__wrap">
      <span
        v-if="itemData.children && itemData.children.length"
        class="tiny-dropdown-item__expand tiny-dropdown-menu__item-expand"
      >
        <component :is="state.getIcon"></component>
      </span>
      <div class="tiny-dropdown-item__content tiny-dropdown-menu__item-content">
        <!-- TODO: 评估没什么用的话去掉 tiny-svg-size -->
        <component v-if="icon" :is="icon" class="tiny-svg-size tiny-dropdown-item__pre-icon"></component>
        <span class="tiny-dropdown-item__label">
          <slot :item-data="itemData">
            <span>{{ label }}</span>
          </slot>
        </span>
      </div>
      <ul
        v-if="itemData.children && itemData.children.length"
        :class="['tiny-dropdown-menu', 'tiny-dropdown-item--child tiny-dropdown-menu__item--child', state.popperClass]"
      >
        <tiny-dropdown-item
          v-for="(item, index) in itemData.children"
          :key="index"
          :label="item[state.textField]"
          :item-data="item"
          :_constants="_constants"
          :icon="item.icon"
          :is-mono="true"
          :disabled="item.disabled"
          :divided="item.divided"
          :tip="item.tip"
          :tip-position="item.tipPosition"
        >
          <slot :item-data="item"></slot>
        </tiny-dropdown-item>
      </ul>
    </div>
  </li>
</template>

<script lang="ts">
import { props, setup, $prefix, defineComponent } from '@opentiny/vue-common'
import { renderless, api } from '@opentiny/vue-renderless/dropdown-item/vue'
import { iconLeftWardArrow } from '@opentiny/vue-icon'
import '@opentiny/vue-theme/dropdown-item/index.less'
import { AutoTip } from '@opentiny/vue-directive'
import type { IDropdownItemApi } from '@opentiny/vue-renderless/types/dropdown-item.type'

export default defineComponent({
  name: $prefix + 'DropdownItem',
  componentName: $prefix + 'DropdownItem',
  directives: { AutoTip },
  emits: ['item-click', 'update:modelValue', 'change', 'closed', 'open', 'opened', 'close', 'confirm', 'reset'],
  props: [
    ...props,
    'disabled',
    'divided',
    'icon',
    'itemData',
    'selected',
    'currentIndex',
    'title',
    'titleClass',
    'options',
    'type',
    'label',
    'selectedField',
    'multiStage',
    // tiny新增
    'appendToBody',
    'textField',
    'tip',
    'tipPosition',
    'effect',
    'isMono'
  ],
  components: {
    IconLeftWardArrow: iconLeftWardArrow()
  },
  setup(props, context) {
    // 修复 <双层组件 + 自调用组件> 复合场景导致的数据混乱问题
    return setup({ props, context, renderless, api, mono: props.isMono }) as unknown as IDropdownItemApi
  }
})
</script>
