<template>
  <div class="demo-milestone">
    <tiny-milestone :data="milestoneData" :milestones-status="statusMap">
      <template #top="data">
        <span class="status f18 ml50 mb8">{{ data.slotScope.status }}</span>
      </template>
      <template #bottom="data">
        <span class="f12">{{ data.slotScope.name }} {{ data.slotScope.time }}</span>
      </template>
    </tiny-milestone>
  </div>
</template>

<script lang="jsx">
import { TinyMilestone } from '@opentiny/vue'

export default {
  components: {
    TinyMilestone
  },
  data() {
    return {
      timeActive1: 1,
      normalActive: 2,
      advancedActive: 2,
      statusMap: {
        completed: 'var(--tv-color-bg-disabled-control-active)',
        doing: '#7ED321',
        back: '#f5222d',
        end: '#faad14',
        cancel: '#d9d9d9'
      },
      milestoneData: [
        {
          name: 'POR1',
          time: '2018-9-7',
          status: 'completed'
        },
        {
          name: 'POR2',
          time: '2018-9-8',
          status: 'completed'
        },
        { name: 'POR3', time: '2018-9-10', status: 'doing', content: null },
        {
          name: 'POR4',
          time: '2018-9-9',
          status: 'cancel'
        },
        { name: 'POR5', time: '2018-9-11', status: 'back' },
        {
          name: 'POR6',
          time: '2018-9-9',
          status: 'end'
        }
      ]
    }
  }
}
</script>

<style scoped>
.demo-milestone ::v-deep .tiny-milestone__description-status {
  margin-top: 4px;
}
.status {
  display: inline-block;
}
</style>
