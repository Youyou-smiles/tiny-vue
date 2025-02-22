export default {
  mode: ['pc', 'mobile-first'],
  apis: [
    {
      name: 'input',
      type: 'component',
      props: [
        {
          name: 'autocomplete',
          type: 'string',
          defaultValue: "'off'",
          desc: {
            'zh-CN': '原生 autocomplete 属性',
            'en-US': 'Native autocomplete attribute'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'native',
          mfDemo: ''
        },
        {
          name: 'autofocus',
          type: 'boolean',
          defaultValue: 'false',
          desc: {
            'zh-CN': '原生属性，页面加载时，自动获取焦点',
            'en-US': 'Native attribute. The focus is automatically obtained during page loading.'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: '',
          mfDemo: ''
        },
        {
          name: 'autosize',
          type: 'boolean | { minRows: number, maxRows: number }',
          defaultValue: 'false',
          desc: {
            'zh-CN':
              '自适应内容高度，只对 <code>type="textarea"</code> 有效。可传入对象，如，{ minRows: 2, maxRows: 6 }',
            'en-US':
              'Adaptive content height. This parameter is valid only for <code>type="textarea"</code>. Objects can be transferred, for example, {minRows: 2, maxRows: 6}'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'resize',
          mfDemo: ''
        },
        {
          name: 'clearable',
          type: 'boolean',
          defaultValue: '',
          desc: {
            'zh-CN': '是否显示清除按钮，该属性不适用于 <code>type="textarea"</code>',
            'en-US':
              'Whether to display the clear button. This attribute is not applicable to <code>type="textarea"</code>.'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'clearable',
          mfDemo: ''
        },
        {
          name: 'cols',
          type: 'string',
          defaultValue: '',
          desc: {
            'zh-CN': '原生属性，设置宽度，在 type ="textarea" 时有效',
            'en-US':
              'Native attribute, which is used to set the width. This parameter is valid only when type is "textarea"'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'rows',
          mfDemo: ''
        },
        {
          name: 'counter',
          type: 'boolean',
          defaultValue: 'false',
          desc: {
            'zh-CN': '是否显示字数统计，只在 type = "text" 或 type = "textarea" 时有效',
            'en-US':
              'Whether to display the word count statistics. This parameter is valid only when type is "text" or type is "textarea"'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'counter',
          mfDemo: ''
        },
        {
          name: 'custom-class',
          type: 'string',
          defaultValue: '',
          desc: {
            'zh-CN': '设置自定义样式',
            'en-US': ''
          },
          mode: ['mobile-first'],
          mfDemo: ''
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: 'false',
          desc: {
            'zh-CN': '是否禁用',
            'en-US': 'Disable'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'native',
          mfDemo: ''
        },
        {
          name: 'display-only',
          type: 'boolean',
          defaultValue: '',
          desc: {
            'zh-CN': '设置文本只读态',
            'en-US': 'Set the text read-only state'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'display-only',
          mfDemo: ''
        },
        {
          name: 'display-only-content',
          type: 'string',
          defaultValue: '',
          desc: {
            'zh-CN': '设置只读态时的文本内容区，如果没有则会使用 modelValue 的值作为只读文本',
            'en-US':
              "Sets the text content area in the read-only state, if not, modelVale's value is used as the read-only text"
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'display-only',
          mfDemo: ''
        },
        {
          name: 'form',
          type: 'string',
          defaultValue: '',
          desc: {
            'zh-CN': '原生属性',
            'en-US': 'Native attribute'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: '',
          mfDemo: ''
        },
        {
          name: 'height',
          type: 'number',
          defaultValue: '',
          desc: {
            'zh-CN': '设置文本域的最小高度',
            'en-US': ''
          },
          mode: ['mobile-first'],
          mfDemo: ''
        },
        {
          name: 'hover-expand',
          type: 'boolean',
          defaultValue: '',
          desc: {
            'zh-CN': '设置文本域鼠标悬浮展开/收起，只对 `type=textarea` 有效，最好搭配 autosize 一起使用',
            'en-US':
              "Set text field mouse hover expansion/collapse, only for 'type=textarea'. It is recommended that this parameter be used together with autosize."
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'resize',
          mfDemo: ''
        },
        {
          name: 'label',
          type: 'string',
          defaultValue: '',
          desc: {
            'zh-CN': '等价于原生 input aria-label 属性',
            'en-US': 'Equiphorus input aria-label attribute'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: '',
          mfDemo: ''
        },
        {
          name: 'mask',
          type: 'boolean',
          defaultValue: '',
          desc: {
            'zh-CN': '启用掩码功能，只在 disabled 和 display-only 状态下生效',
            'en-US': 'The mask function takes effect only in the disabled and display-only states'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'mask',
          mfDemo: ''
        },
        {
          name: 'max',
          type: 'number',
          defaultValue: '',
          desc: {
            'zh-CN': '原生属性，设置最大值',
            'en-US': 'Native attribute, set the maximum value'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'native',
          mfDemo: ''
        },
        {
          name: 'maxlength',
          type: 'number',
          defaultValue: '',
          desc: {
            'zh-CN': '原生属性，最大输入长度',
            'en-US': 'Native attribute, maximum input length'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'native',
          mfDemo: ''
        },
        {
          name: 'memory-space',
          type: 'number',
          defaultValue: '5',
          desc: {
            'zh-CN': '设置 addMemory 方法中，最大能保存条目的数量',
            'en-US': 'Sets the maximum number of entries that can be saved in the addMemory method'
          },
          mode: ['pc'],
          pcDemo: 'method-addMemory'
        },
        {
          name: 'min',
          type: 'number',
          defaultValue: '',
          desc: {
            'zh-CN': '原生属性，设置最小值',
            'en-US': 'Native attribute, which sets the minimum value'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'native',
          mfDemo: ''
        },
        {
          name: 'modelValue / v-model',
          type: 'string | number',
          defaultValue: '',
          desc: {
            'zh-CN': '设置文本的绑定值',
            'en-US': 'Sets the binding value of the text'
          },
          mode: ['pc'],
          pcDemo: 'basic-usage'
        },
        {
          name: 'name',
          type: 'string',
          defaultValue: '',
          desc: {
            'zh-CN': '原生 input name 属性',
            'en-US': 'Native input name attribute'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: '',
          mfDemo: ''
        },
        {
          name: 'placeholder',
          type: 'string',
          defaultValue: '',
          desc: {
            'zh-CN': '输入框占位文本',
            'en-US': 'Enter the place-holder text in the text box'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'basic-usage',
          mfDemo: ''
        },
        {
          name: 'prefix-icon',
          type: 'Component',
          defaultValue: '',
          desc: {
            'zh-CN': '输入框头部图标',
            'en-US': 'Icon at the head of the input box'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'input-icon',
          mfDemo: ''
        },
        {
          name: 'readonly',
          type: 'boolean',
          defaultValue: 'false',
          desc: {
            'zh-CN': '原生属性，是否只读',
            'en-US': 'Native attribute, read-only'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'native',
          mfDemo: ''
        },
        {
          name: 'resize',
          type: "'both' | 'horizontal' | 'vertical' | 'none'",
          defaultValue: '',
          desc: {
            'zh-CN': '控制是否能被用户缩放',
            'en-US': 'Whether the user can zoom in or out'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'resize',
          mfDemo: ''
        },
        {
          name: 'rows',
          type: 'number',
          defaultValue: '2',
          desc: {
            'zh-CN': '输入框行数，只对 type="textarea" 有效',
            'en-US': 'Number of lines in the input box. This parameter is valid only for type="textarea"'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'rows',
          mfDemo: ''
        },
        {
          name: 'show-password',
          type: 'boolean',
          defaultValue: 'false',
          desc: {
            'zh-CN': '是否显示切换密码图标',
            'en-US': 'Whether to display the switchover password icon'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'show-password',
          mfDemo: ''
        },
        {
          name: 'show-word-limit',
          type: 'boolean',
          defaultValue: 'false',
          desc: {
            'zh-CN': '是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效',
            'en-US':
              'Whether to display the number of input words. This parameter is valid only when type is "text" or type is "textarea"'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'show-word-limit',
          mfDemo: ''
        },
        {
          name: 'show-tooltip',
          type: 'boolean',
          defaultValue: 'true',
          meta: {
            stable: '3.18.0'
          },
          desc: {
            'zh-CN': '只读状态下，文本超出是否悬浮提示',
            'en-US': 'In the read-only state, whether the text exceeds the floating prompt'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'size',
          mfDemo: ''
        },
        {
          name: 'size',
          type: "'medium' | 'small' | 'mini'",
          defaultValue: '',
          desc: {
            'zh-CN': '输入框尺寸，只在 type 为 "textarea" 时有效',
            'en-US': 'Size of the text box. This parameter is valid only when type!="textarea". '
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'size',
          mfDemo: ''
        },
        {
          name: 'step',
          type: 'number',
          defaultValue: '',
          desc: {
            'zh-CN': '原生属性，设置输入字段的合法数字间隔',
            'en-US': 'Native attribute, which is used to set the valid digit interval of the input field.'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'native',
          mfDemo: ''
        },
        {
          name: 'suffix-icon',
          type: 'Component',
          defaultValue: '',
          desc: {
            'zh-CN': '输入框尾部图标',
            'en-US': 'Input box end icon'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'input-icon',
          mfDemo: ''
        },
        {
          name: 'tabindex',
          type: 'string',
          defaultValue: '',
          desc: {
            'zh-CN': '原生属性，输入框的 tabindex',
            'en-US': 'Native attribute, tabindex in the text box'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: '',
          mfDemo: ''
        },
        {
          name: 'type',
          type: "'text' | 'textarea' | 'password' | InputHTMLAttributes.type",
          defaultValue: "'text'",
          desc: {
            'zh-CN': '设置 input 框的 type 属性，默认为 "text",可选值 "text"，"textarea" 和其他 原生 input 的 type 值',
            'en-US':
              'Set the type attribute of the input box. The default value is "text". The options are "text", "textarea", and type values of other native inputs.'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'type',
          mfDemo: ''
        },
        {
          name: 'v-model',
          type: 'String / Number',
          defaultValue: '',
          desc: {
            'zh-CN': '设置文本显示的默认值',
            'en-US': ''
          },
          mode: ['mobile-first'],
          mfDemo: ''
        },
        {
          name: 'validate-event',
          type: 'boolean',
          defaultValue: 'true',
          desc: {
            'zh-CN': '输入时是否触发表单的校验',
            'en-US': 'Trigger form verification upon input'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'validate-event',
          mfDemo: ''
        },
        {
          name: 'popup-more',
          type: 'boolean',
          defaultValue: '',
          desc: {
            'zh-CN':
              '在只读的基础上增加 <code>popup-more</code> 属性，可使文本域超出显示更多按钮，点击更多按钮可以查看详细信息。',
            'en-US':
              'The <code>popup-more</code> attribute is added to enable the text field to exceed the display of more buttons. You can click more buttons to view details.'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'display-only-popup-more',
          mfDemo: 'display-only-popup-more'
        },
        {
          name: 'input-box-type',
          type: 'string',
          defaultValue: 'normal',
          desc: {
            'zh-CN': '设置边框模式',
            'en-US': 'Setting input box border type'
          },
          mode: ['pc'],
          pcDemo: 'input-box-type',
          mfDemo: ''
        }
      ],
      events: [
        {
          name: 'blur',
          type: '(event: FocusEvent) => void',
          defaultValue: '',
          desc: {
            'zh-CN': '在 Input 失去焦点时触发',
            'en-US': 'Trigger when Input loses focus'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'event',
          mfDemo: ''
        },
        {
          name: 'change',
          type: '(value: string | number) => void',
          defaultValue: '',
          desc: {
            'zh-CN': '在 Input 值改变时触发',
            'en-US': 'triggered when the input value changes.'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'event',
          mfDemo: ''
        },
        {
          name: 'clear',
          type: '() => void',
          defaultValue: '',
          desc: {
            'zh-CN': '在点击由 clearable 属性生成的清空按钮时触发',
            'en-US': 'Trigger when the clear button generated by the clearable property is clicked'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'event',
          mfDemo: ''
        },
        {
          name: 'focus',
          type: '(event: FocusEvent) => void',
          defaultValue: '',
          desc: {
            'zh-CN': '在 Input 获得焦点时触发',
            'en-US': 'Trigger when Input obtains focus'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'event',
          mfDemo: ''
        },
        {
          name: 'input',
          type: '(event: InputEvent) => void',
          defaultValue: '',
          desc: {
            'zh-CN': '输入值时触发事件',
            'en-US': 'An event is triggered when a value is entered.'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'event',
          mfDemo: ''
        }
      ],
      methods: [
        {
          name: 'addMemory',
          type: '(value: string) => void',
          defaultValue: '',
          desc: {
            'zh-CN': '历史输入内容的记忆方法',
            'en-US': 'Memorization method of historical input content'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'method-addMemory',
          mfDemo: ''
        },
        {
          name: 'blur',
          type: '() => void',
          defaultValue: '',
          desc: {
            'zh-CN': '使 input 失去焦点',
            'en-US': 'The input loses focus.'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'methods',
          mfDemo: ''
        },
        {
          name: 'focus',
          type: '() => void',
          defaultValue: '',
          desc: {
            'zh-CN': '使 input 获取焦点',
            'en-US': 'To enable the input to obtain the focus'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'methods',
          mfDemo: ''
        },
        {
          name: 'select',
          type: '() => void',
          defaultValue: '',
          desc: {
            'zh-CN': '选中 input 中的文字',
            'en-US': 'Select the text in input.'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'methods',
          mfDemo: ''
        }
      ],
      slots: [
        {
          name: 'append',
          type: '',
          defaultValue: '',
          desc: {
            'zh-CN': '输入框后置内容，只对 type="text" 有效',
            'en-US': 'Content at the end of the text box. This field is valid only for type="text"'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'slot',
          mfDemo: ''
        },
        {
          name: 'prefix',
          type: '',
          defaultValue: '',
          desc: {
            'zh-CN': '输入框头部内容，只对 type="text" 有效',
            'en-US': 'Content in the header of the text box, which is valid only for type="text"'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'slot',
          mfDemo: ''
        },
        {
          name: 'prepend',
          type: '',
          defaultValue: '',
          desc: {
            'zh-CN': '输入框前置内容，只对 type="text" 有效',
            'en-US': 'Content before the text box, which is valid only for type="text"'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'slot',
          mfDemo: ''
        },
        {
          name: 'suffix',
          type: '',
          defaultValue: '',
          desc: {
            'zh-CN': '输入框尾部内容，只对 type="text" 有效',
            'en-US': 'The content at the end of the text box is valid only for type="text"'
          },
          mode: ['pc', 'mobile-first'],
          pcDemo: 'slot',
          mfDemo: ''
        }
      ]
    }
  ]
}
