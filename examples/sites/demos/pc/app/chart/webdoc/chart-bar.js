export default {
  column: '2',
  owner: '',
  demos: [
    {
      'demoId': 'bar-base',
      'name': { 'zh-CN': '基本用法', 'en-US': 'Basic Usage' },
      'desc': { 'zh-CN': '详细用法参考如下示例', 'en-US': 'For details, see the following example.' },
      'codeFiles': ['bar/base.vue']
    },
    {
      'demoId': 'bar-demo2',
      'name': { 'zh-CN': '堆叠条形图', 'en-US': ' Stacked Bar Chart' },
      'desc': { 'zh-CN': '详细用法参考如下示例', 'en-US': 'For details, see the following example.' },
      'codeFiles': ['bar/demo2.vue']
    },
    {
      'demoId': 'bar-demo3',
      'name': { 'zh-CN': '数值显示', 'en-US': 'Numerical display' },
      'desc': { 'zh-CN': '详细用法参考如下示例', 'en-US': 'For details, see the following example.' },
      'codeFiles': ['bar/demo3.vue']
    },
    {
      'demoId': 'bar-demo4',
      'name': { 'zh-CN': '堆叠条形图数值显示', 'en-US': 'Stack Bar Numeric Display' },
      'desc': { 'zh-CN': '详细用法参考如下示例', 'en-US': 'For details, see the following example.' },
      'codeFiles': ['bar/demo4.vue']
    },
    {
      'demoId': 'bar-demo5',
      'name': { 'zh-CN': '无 x 轴', 'en-US': 'No x-axis' },
      'desc': { 'zh-CN': '详细用法参考如下示例', 'en-US': 'For details, see the following example.' },
      'codeFiles': ['bar/demo5.vue']
    },
    {
      'demoId': 'bar-demo6',
      'name': { 'zh-CN': '阈值线', 'en-US': 'Threshold Line' },
      'desc': { 'zh-CN': '详细用法参考如下示例', 'en-US': 'For details, see the following example.' },
      'codeFiles': ['bar/demo6.vue']
    },
    {
      'demoId': 'bar-demo7',
      'name': { 'zh-CN': '数值均为正数双向条形图', 'en-US': 'Two-way bar chart with all positive data' },
      'desc': { 'zh-CN': '详细用法参考如下示例', 'en-US': 'For details, see the following example.' },
      'codeFiles': ['bar/demo7.vue']
    }
  ],
  apis: [{ 'name': 'chart-bar', 'type': 'component', 'props': [], 'events': [], 'slots': [] }],
  types: [
    {
      name: 'IChartSettings',
      type: 'interface',
      code: `
interface IChartSettings {
  axisSite: object // 指标所在的轴，默认不在 top 轴的指标都在 bottom 轴
  dataOrder: boolean | object // 设置数据排序方式，默认为 false 
  digit: number // 设置数据类型为 percent 时保留的位数，默认为 2
  dimension: array // 维度，默认 columns 第一项为维度
  itemStyle: object // 图形样式，
  label: object // 设置图形上的文本标签，
  labelMap: object // 设置指标的别名，同时作用于提示框和图例
  legendName: object // 设置图表上方图例的别名
  max: array // 上下坐标轴最大值
  metrics: array // 指标，默认 columns 第二项起为指标
  min: array // 上下坐标轴最小值
  opacity: number // 透明度
  scale: array // 是否是脱离 0 值比例，默认为 [ false , false ]，表示上下两个轴都不会脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度
  stack: object // 堆叠选项
  xAxisName: array // 上下坐标轴标题
  xAxisType: array // 上下坐标轴数据类型，可选值：KMB , normal , percent 
  yAxisType: string // 纵轴的类型，可选值' category '，' value '，默认为' category '
}

> 备注 1. axisSite 可以设置 top 和 bottom，例如示例所示 axisSite: { top: ['占比'] } 即将占比的数据置于上轴上。

> 备注 2. stack 用于将两数据堆叠起来，例如实例中所示 stack: { '销售额': ['销售额 -1 季度', '销售额 -2 季度'] } 即将'销售额 -1 季度', '销售额 -2 季度'相应的数据堆叠在一起。

> 备注 3. dataOrder 用于设置数据的排序方式，用于更加清晰的展示数据的升降。例如： { label: '成本', order: 'asc } 表示数据按照成本指标升序展示，降序为 desc。

> 备注 4. min 和 max 的值可以直接设置为数字，例如：[100, 300]；也可以设置为 ['dataMin', 'dataMin'], ['dataMax', 'dataMax']，此时表示使用该坐标轴上的最小值或最大值为最小或最大刻度。

> 备注 5. 为了优化连续的数值型横轴显示多指标的时候样式，在此情况下默认设置 opacity 为 0.5。
`
    }
  ]
}
