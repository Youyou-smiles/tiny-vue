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
  <transition name="tiny-zoom-in-top" @before-enter="handleMenuEnter" @after-leave="emitDestroy">
    <div
      ref="popper"
      v-show="state.visible"
      :style="{ width: state.width + 'px' }"
      :class="[state.popperClass, { 'not-match-height': !state.items.length }]"
      class="tiny-picker-panel tiny-time-select tiny-popper"
    >
      <tiny-scrollbar noresize wrap-class="tiny-picker-panel__content">
        <div v-if="state.items.length">
          <div
            class="tiny-time-select__item"
            v-for="item in state.items"
            :class="{
              selected: state.value === item.value,
              disabled: item.disabled,
              default: item.value === state.default
            }"
            :disabled="item.disabled"
            :key="item.value"
            @click="handleClick(item)"
          >
            {{ item.value }}
          </div>
        </div>
        <div v-else class="no-match">{{ $t('ui.select.noMatch') }}</div>
      </tiny-scrollbar>
    </div>
  </transition>
</template>

<script lang="ts">
import { renderless, api } from '@opentiny/vue-renderless/time-panel/vue'
import { props, setup, defineComponent } from '@opentiny/vue-common'
import Scrollbar from '@opentiny/vue-scrollbar'

export default defineComponent({
  emits: ['dodestroy', 'pick'],
  components: {
    TinyScrollbar: Scrollbar
  },
  props: [...props, 'emitter'],
  setup(props, context) {
    return setup({ props, context, renderless, api })
  }
})
</script>
