import { isNull } from '@opentiny/utils'

const fontFamilyConfig = [
  'songti',
  'yahei',
  'kaiti',
  'heiti',
  'lishu',
  'mono',
  'arial',
  'arialblack',
  'comic',
  'impact',
  'times'
]

const fontSizeConfig = [
  '12px',
  '13px',
  '14px',
  '15px',
  '16px',
  '17px',
  '18px',
  '19px',
  '20px',
  '22px',
  '24px',
  '26px',
  '29px',
  '32px',
  '36px',
  '40px',
  '48px',
  '72px'
]

const lineHeightConfig = ['1', '1.2', '1.5', '2', '2.5', '3', '4', '5']

const betterTable = {
  operationMenu: {
    items: {
      copyCells: { text: '复制' },
      copyTable: { text: '复制表格' },
      emptyCells: { text: '清空内容' },
      insertRowUp: { text: '上插入行' },
      insertRowDown: { text: '下插入行' },
      insertColumnLeft: { text: '左插入列' },
      insertColumnRight: { text: '右插入列' },
      mergeCells: { text: '合并单元格' },
      unmergeCells: { text: '拆分单元格' },
      deleteRow: { text: '删除当前行' },
      deleteColumn: { text: '删除当前列' },
      deleteTable: { text: '删除表格' }
    },
    color: true
  }
}

const underline = ['bold', 'italic', 'underline', 'strike']
const list = [{ list: 'ordered' }, { list: 'bullet' }]
const script = [{ script: 'sub' }, { script: 'super' }]

export const defaultToolbar = [
  ['undo', 'redo', 'clean'],
  [
    { font: fontFamilyConfig },
    { size: fontSizeConfig },
    { lineheight: lineHeightConfig },
    { header: [1, 2, 3, 4, 5, 6, false] }
  ],
  underline,
  ['blockquote', 'code-block'],
  [{ header: 1 }, { header: 2 }],
  list,
  script,
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ['link', 'image'],
  ['better-table'],
  ['fullscreen']
]

const toolbar = () => {
  return {
    container: defaultToolbar
  }
}

export const mention = (mentionObj) => ({
  search: async (term) => {
    const { data, searchKey } = mentionObj
    try {
      return data.filter((d) => {
        return d[searchKey] && String(d[searchKey]).includes(term)
      })
    } catch (e) {
      return []
    }
  }
})

const listAutofillHandler =
  ({ FluentEditor, state }) =>
  (range, context) => {
    const formats = state.quill.getFormat(range)
    if (formats['table-cell-line']) {
      return true
    }
    if (isNull(state.quill.scroll.query('list'))) {
      return true
    }
    const { length } = context.prefix
    const [line, offset] = state.quill.getLine(range.index)
    if (offset > length) {
      return true
    }
    let value
    let prefix = context.prefix.trim()

    if (~['[]', '[ ]'].indexOf(prefix)) {
      value = 'unchecked'
    } else if (prefix === '[x]') {
      value = 'checked'
    } else if (~['-', '*'].indexOf(prefix)) {
      value = 'bullet'
    } else {
      value = 'ordered'
    }

    state.quill.insertText(range.index, ' ', FluentEditor.sources.USER)
    state.quill.history.cutoff()
    // eslint-disable-next-line new-cap
    const delta = new FluentEditor.imports.delta()
      .retain(range.index - offset)
      .delete(length + 1)
      .retain(line.length() - 2 - offset)
      .retain(1, { list: { value } })
    state.quill.updateContents(delta, FluentEditor.sources.USER)
    state.quill.history.cutoff()
    state.quill.setSelection(range.index - length, FluentEditor.sources.SILENT)
    return false
  }

const listAutofill = ({ FluentEditor, state }) => ({
  key: ' ',
  shiftKey: null,
  collapsed: true,
  format: { list: false, 'code-block': false, blockquote: false, header: false, table: true },
  prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
  handler: listAutofillHandler({ FluentEditor, state })
})

const listIgnoreRight = ({ FluentEditor, state }) => ({
  key: 'ArrowRight',
  shiftKey: null,
  format: ['list'],
  collapsed: true,
  offset: 0,
  handler(range) {
    state.quill.setSelection(range.index + 1, FluentEditor.sources.SILENT)
  }
})

const listIgnoreLeft = ({ FluentEditor, state }) => ({
  key: 'ArrowLeft',
  shiftKey: null,
  format: ['list'],
  collapsed: true,
  offset: 0,
  handler(range) {
    state.quill.setSelection(range.index - 1, FluentEditor.sources.SILENT)
  }
})

const listSoftBreak = ({ FluentEditor, state }) => ({
  key: 'Enter',
  format: ['list'],
  shiftKey: true,
  collapsed: true,
  handler(range) {
    const [line, offset] = state.quill.getLine(range.index)
    const length = line.length()
    // li的末尾不能添加软回车
    if (length > offset + 1) {
      state.quill.insertEmbed(range.index, 'soft-break', true, FluentEditor.sources.USER)
    }
  }
})

export const keyboard = ({ FluentEditor, state }) => {
  // 表格
  const BetterTable = FluentEditor.imports['modules/better-table']
  return {
    bindings: {
      ...BetterTable.keyboardBindings,
      'list autofill': listAutofill({ FluentEditor, state }),
      // fix:在list的offset为0时（即只在最左侧触发）加键盘事件，使其跳过contenteditable=false的span进行移动
      'list ignoreRight': listIgnoreRight({ FluentEditor, state }),
      'list ignoreLeft': listIgnoreLeft({ FluentEditor, state }),
      'list softBreak': listSoftBreak({ FluentEditor, state })
    }
  }
}

const defaultOption = ({ FluentEditor, state, mentionObj }) => {
  return {
    theme: 'snow',
    modules: {
      file: true, // 上传文件需开启
      image: FluentEditor.imports['modules/image-spec'],
      counter: false,
      toolbar: toolbar(),
      'better-table': betterTable,
      mention: mention(mentionObj),
      keyboard: keyboard({ FluentEditor, state })
    },
    // 上传：图片、视频和文件,相关配置
    uploadOption: {
      fileAccept: '.mp4,.xls,.xlsx,.doc,.docx,.ppt,.pptx',
      imageAccept: '.gif,.png,.tiff,image/jpeg',
      isVideoPlay: true,
      imageUploadToServer: true // 是否需要上传到服务器
    },
    placeholder: 'Insert text here ...',
    readOnly: false
  }
}

export { defaultOption }

export const iconOption = {
  align: {
    default: 'IconEditorAlignLeft',
    center: 'IconEditorAlignCenter',
    right: 'IconEditorAlignRight'
  },
  background: 'IconEditorBackground',
  'better-table': 'IconEditorTable',
  blockquote: 'IconEditorQuote',
  bold: 'IconEditorBold',
  clean: 'IconEditorEraser',
  code: '',
  'code-block': 'IconEditorCode',
  color: 'IconEditorTextcolor',
  direction: {
    default: 'IconEditorRightBorder',
    rtl: 'IconEditorLeftBorder'
  },
  emoji: '',
  file: 'IconCloudUpload',
  font: '',
  formula: '',
  fullscreen: 'IconFullscreen',
  'global-link': '',
  header: {
    1: 'IconEditorTitle',
    2: 'IconEditorSubtitle'
  },
  help: '',
  image: 'IconPicture',
  indent: {
    '+1': 'IconEditorMenuRight',
    '-1': 'IconEditorMenuLeft'
  },
  italic: 'IconEditorItalic',
  link: 'IconLink',
  list: {
    bullet: 'IconEditorListDot',
    check: '',
    ordered: 'IconEditorListNum'
  },
  redo: 'IconEditorRedo',
  screenshot: '',
  script: {
    sub: 'IconEditorSub',
    super: 'IconEditorSuper'
  },
  size: '',
  strike: 'IconEditorDeleteline',
  table: '',
  underline: 'IconEditorUnderline',
  undo: 'IconEditorUndo',
  video: 'IconEditorVideo'
}

export const iconOptionMobileFirst = {
  ...iconOption,
  align: {
    default: `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path id="矢量 245" d="M21 3L3 3C2.58 3 2.25 3.33 2.25 3.75C2.25 4.16 2.58 4.5 3 4.5L21 4.5C21.41 4.5 21.75 4.16 21.75 3.75C21.75 3.33 21.41 3 21 3ZM3 8.5L15 8.5C15.41 8.5 15.75 8.83 15.75 9.25C15.75 9.66 15.41 10 15 10L3 10C2.58 10 2.25 9.66 2.25 9.25C2.25 8.83 2.58 8.5 3 8.5ZM21 14L3 14C2.58 14 2.25 14.33 2.25 14.75C2.25 15.16 2.58 15.5 3 15.5L21 15.5C21.41 15.5 21.75 15.16 21.75 14.75C21.75 14.33 21.41 14 21 14ZM15 19.5L3 19.5C2.58 19.5 2.25 19.83 2.25 20.25C2.25 20.66 2.58 21 3 21L15 21C15.41 21 15.75 20.66 15.75 20.25C15.75 19.83 15.41 19.5 15 19.5Z"/></svg>`,
    center: `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path id="矢量 247" d="M21 3L3 3C2.58 3 2.25 3.33 2.25 3.75C2.25 4.16 2.58 4.5 3 4.5L21 4.5C21.41 4.5 21.75 4.16 21.75 3.75C21.75 3.33 21.41 3 21 3ZM6 8.5L18 8.5C18.41 8.5 18.75 8.83 18.75 9.25C18.75 9.66 18.41 10 18 10L6 10C5.58 10 5.25 9.66 5.25 9.25C5.25 8.83 5.58 8.5 6 8.5ZM21 14L3 14C2.58 14 2.25 14.33 2.25 14.75C2.25 15.16 2.58 15.5 3 15.5L21 15.5C21.41 15.5 21.75 15.16 21.75 14.75C21.75 14.33 21.41 14 21 14ZM18 19.5L6 19.5C5.58 19.5 5.25 19.83 5.25 20.25C5.25 20.66 5.58 21 6 21L18 21C18.41 21 18.75 20.66 18.75 20.25C18.75 19.83 18.41 19.5 18 19.5Z"/></svg>`,
    right: `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path id="矢量 248" d="M21 3L3 3C2.58 3 2.25 3.33 2.25 3.75C2.25 4.16 2.58 4.5 3 4.5L21 4.5C21.41 4.5 21.75 4.16 21.75 3.75C21.75 3.33 21.41 3 21 3ZM9 8.5L21 8.5C21.41 8.5 21.75 8.83 21.75 9.25C21.75 9.66 21.41 10 21 10L9 10C8.58 10 8.25 9.66 8.25 9.25C8.25 8.83 8.58 8.5 9 8.5ZM21 14L3 14C2.58 14 2.25 14.33 2.25 14.75C2.25 15.16 2.58 15.5 3 15.5L21 15.5C21.41 15.5 21.75 15.16 21.75 14.75C21.75 14.33 21.41 14 21 14ZM21 19.5L9 19.5C8.58 19.5 8.25 19.83 8.25 20.25C8.25 20.66 8.58 21 9 21L21 21C21.41 21 21.75 20.66 21.75 20.25C21.75 19.83 21.41 19.5 21 19.5Z"/></svg>`
  },
  clean: `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path id="矢量 250" d="M7.2 11.15L20.25 11.15L20.25 9.82C20.25 9.66 20.23 9.51 20.19 9.36C20.17 9.25 20.13 9.14 20.09 9.03C20.04 8.92 19.98 8.81 19.92 8.71C19.84 8.6 19.75 8.49 19.65 8.39C19.55 8.28 19.44 8.2 19.32 8.12C19.22 8.05 19.12 8 19.01 7.95C18.9 7.91 18.8 7.87 18.68 7.85C18.54 7.81 18.38 7.79 18.23 7.79L14.64 7.79C14.43 7.79 14.25 7.72 14.11 7.58C13.96 7.43 13.89 7.25 13.89 7.04L13.89 2.79C13.89 2.77 13.85 2.69 13.84 2.67C13.82 2.65 13.74 2.63 13.72 2.62L11.85 2.62C11.82 2.62 11.75 2.66 11.73 2.67C11.71 2.68 11.68 2.77 11.67 2.79L11.67 7.04C11.67 7.25 11.6 7.43 11.45 7.58C11.31 7.72 11.13 7.79 10.92 7.79L7.18 7.79C7.02 7.79 6.87 7.81 6.72 7.85C6.61 7.87 6.5 7.91 6.39 7.95C6.28 8 6.18 8.05 6.08 8.12C5.96 8.19 5.85 8.28 5.75 8.39C5.65 8.49 5.56 8.6 5.49 8.71C5.42 8.81 5.36 8.92 5.32 9.03C5.27 9.14 5.24 9.24 5.21 9.36Q5.16 9.58 5.16 9.82C5.21 15.68 5.2 19.01 5.13 19.8C5.1 20.06 5.05 20.32 4.98 20.56C4.89 20.84 4.78 21.11 4.63 21.37L7.3 21.37C7.42 21.36 7.53 21.34 7.64 21.31C7.74 21.29 7.84 21.26 7.94 21.22C8.07 21.16 8.19 21.1 8.31 21.02Q8.45 20.92 8.58 20.79C8.7 20.68 8.8 20.56 8.88 20.43C8.93 20.35 8.97 20.26 9.01 20.17C9.06 20.06 9.1 19.95 9.12 19.84C9.15 19.7 9.17 19.56 9.17 19.42L9.17 16.63C9.17 16.21 9.5 15.88 9.92 15.88C10.34 15.88 10.67 16.21 10.67 16.63L10.67 19.42C10.67 19.67 10.64 19.91 10.59 20.14C10.54 20.35 10.48 20.56 10.39 20.77C10.31 20.95 10.22 21.12 10.11 21.28C10.1 21.31 10.08 21.34 10.06 21.37L12.84 21.37Q13.01 21.35 13.18 21.31C13.28 21.29 13.38 21.26 13.48 21.22C13.61 21.16 13.73 21.1 13.84 21.02Q13.99 20.92 14.12 20.79Q14.29 20.63 14.42 20.43C14.47 20.35 14.51 20.26 14.55 20.17C14.6 20.06 14.63 19.95 14.66 19.84C14.69 19.7 14.71 19.56 14.71 19.42L14.71 16.63C14.71 16.21 15.04 15.88 15.46 15.88C15.88 15.88 16.21 16.21 16.21 16.63L16.21 19.42C16.21 19.67 16.18 19.91 16.13 20.14C16.08 20.35 16.02 20.56 15.93 20.77C15.85 20.95 15.76 21.12 15.65 21.28Q15.62 21.32 15.59 21.37L18.23 21.37C18.38 21.37 18.53 21.35 18.68 21.32C18.79 21.29 18.9 21.25 19.01 21.21C19.12 21.16 19.22 21.11 19.32 21.04C19.44 20.97 19.55 20.88 19.65 20.77C19.75 20.67 19.84 20.57 19.92 20.45C19.98 20.35 20.04 20.24 20.09 20.13C20.13 20.02 20.17 19.91 20.19 19.8C20.23 19.65 20.25 19.5 20.25 19.34L20.25 14.67C20.25 14.25 20.58 13.92 21 13.92C21.42 13.92 21.75 14.25 21.75 14.67L21.75 19.34C21.75 19.6 21.72 19.85 21.66 20.1C21.62 20.31 21.55 20.51 21.47 20.71Q21.35 20.99 21.19 21.25Q21.18 21.27 21.16 21.29C21.03 21.48 20.88 21.66 20.72 21.83C20.54 22.01 20.36 22.16 20.16 22.29C19.98 22.4 19.8 22.51 19.6 22.59C19.4 22.67 19.19 22.74 18.98 22.79C18.74 22.84 18.48 22.87 18.23 22.87L12.89 22.87C12.82 22.87 12.75 22.87 12.69 22.87L11.76 22.87C11.73 22.87 11.7 22.87 11.67 22.87L7.35 22.87C7.28 22.87 7.22 22.87 7.15 22.87L6.22 22.87C6.19 22.87 6.16 22.87 6.13 22.87L3 22.87C2.88 22.87 2.78 22.84 2.68 22.8C2.57 22.75 2.49 22.68 2.42 22.59C2.29 22.43 2.23 22.25 2.25 22.05C2.27 21.84 2.36 21.67 2.52 21.54C3.12 21.04 3.48 20.5 3.6 19.9Q3.62 19.79 3.63 19.66C3.7 18.92 3.71 15.64 3.66 9.82C3.66 9.56 3.68 9.3 3.74 9.06C3.79 8.85 3.85 8.65 3.93 8.45C4.02 8.24 4.12 8.05 4.24 7.87C4.37 7.68 4.52 7.5 4.69 7.33C4.86 7.16 5.04 7 5.24 6.87C5.42 6.76 5.61 6.66 5.81 6.57C6.01 6.49 6.21 6.42 6.42 6.37C6.67 6.32 6.92 6.29 7.18 6.29L10.17 6.29L10.17 2.79C10.17 2.67 10.19 2.55 10.21 2.44C10.23 2.34 10.26 2.24 10.31 2.14C10.35 2.04 10.4 1.95 10.45 1.86C10.51 1.77 10.58 1.69 10.66 1.61C10.74 1.53 10.83 1.46 10.92 1.4C11.01 1.34 11.1 1.29 11.2 1.25Q11.32 1.2 11.44 1.17Q11.47 1.16 11.5 1.15C11.61 1.13 11.73 1.12 11.85 1.12L13.72 1.12C13.84 1.12 13.95 1.13 14.07 1.15Q14.22 1.19 14.37 1.25Q14.51 1.31 14.64 1.4C14.73 1.46 14.82 1.53 14.9 1.61C14.98 1.69 15.05 1.77 15.11 1.86C15.17 1.95 15.22 2.04 15.26 2.14C15.3 2.24 15.33 2.34 15.35 2.44C15.38 2.55 15.39 2.67 15.39 2.79L15.39 6.29L18.23 6.29C18.48 6.29 18.74 6.32 18.98 6.38Q18.99 6.38 19 6.38Q19.3 6.45 19.6 6.57C19.8 6.66 19.98 6.76 20.16 6.87C20.36 7.01 20.54 7.16 20.72 7.33C20.88 7.5 21.03 7.68 21.16 7.87C21.28 8.05 21.38 8.25 21.47 8.45Q21.6 8.75 21.66 9.06C21.72 9.31 21.75 9.56 21.75 9.82L21.75 11.9Q21.75 12.05 21.69 12.19Q21.64 12.32 21.53 12.43Q21.42 12.54 21.28 12.59Q21.15 12.65 21 12.65L7.2 12.65C6.78 12.65 6.45 12.32 6.45 11.9C6.45 11.48 6.78 11.15 7.2 11.15Z"/></svg>`,
  code: `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path id="矢量 242" d="M22.3 6.67C22.17 6.46 22.01 6.26 21.83 6.08L18.61 2.87C18.43 2.69 18.24 2.53 18.03 2.4C17.85 2.28 17.66 2.19 17.46 2.11C17.26 2.03 17.06 1.96 16.85 1.92C16.63 1.87 16.39 1.85 16.16 1.85C15.92 1.85 15.68 1.87 15.46 1.92C15.25 1.96 15.05 2.03 14.85 2.11C14.65 2.19 14.46 2.28 14.28 2.4C14.07 2.53 13.88 2.69 13.7 2.87L6.62 9.95L4.79 14.36L1.36 17.79C1.34 17.82 1.25 17.94 1.23 17.98C1.13 18.16 1.12 18.35 1.18 18.55C1.21 18.65 1.26 18.73 1.32 18.81C1.38 18.88 1.46 18.94 1.55 18.99L7.44 22.05C7.59 22.13 7.74 22.15 7.9 22.13C7.98 22.12 8.06 22.09 8.13 22.06C8.2 22.02 8.26 21.98 8.32 21.92L10.33 19.9L14.75 18.08L21.83 11C22.01 10.82 22.17 10.63 22.3 10.42C22.41 10.24 22.51 10.05 22.59 9.85C22.67 9.65 22.73 9.45 22.78 9.24C22.82 9.01 22.85 8.78 22.85 8.54C22.85 8.3 22.82 8.07 22.78 7.84C22.73 7.64 22.67 7.43 22.59 7.23C22.51 7.04 22.41 6.85 22.3 6.67ZM10.09 18.38L13.9 16.81L20.77 9.94C20.88 9.83 20.97 9.71 21.05 9.59C21.11 9.49 21.16 9.39 21.2 9.29C21.25 9.18 21.28 9.07 21.3 8.95C21.33 8.82 21.35 8.68 21.35 8.54C21.35 8.4 21.33 8.27 21.3 8.13C21.28 8.02 21.25 7.91 21.2 7.8C21.16 7.69 21.11 7.59 21.05 7.5C20.97 7.37 20.88 7.25 20.77 7.14L17.55 3.93C17.44 3.82 17.33 3.73 17.2 3.65C17.1 3.59 17 3.54 16.9 3.5C16.79 3.45 16.68 3.42 16.57 3.39C16.43 3.37 16.3 3.35 16.16 3.35C16.02 3.35 15.88 3.37 15.74 3.39C15.63 3.42 15.52 3.45 15.41 3.5C15.31 3.54 15.21 3.59 15.11 3.65C14.98 3.73 14.87 3.82 14.76 3.93L7.89 10.8L6.32 14.61L10.09 18.38ZM10.68 15.08L18.1 7.66C18.4 7.36 18.4 6.89 18.1 6.6C17.8 6.3 17.34 6.3 17.04 6.6L9.61 14.02C9.32 14.32 9.32 14.79 9.61 15.08C9.91 15.38 10.38 15.38 10.68 15.08ZM5.43 15.85L8.85 19.27L7.65 20.47L3.15 18.13L5.43 15.85Z"/></svg>`,
  'code-block': `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path id="矢量 244" d="M18.15 2.25C18.42 2.25 18.67 2.27 18.93 2.33C19.14 2.37 19.35 2.44 19.55 2.53C19.76 2.61 19.95 2.72 20.13 2.84Q20.43 3.04 20.69 3.3Q20.95 3.56 21.15 3.86C21.27 4.04 21.38 4.23 21.46 4.44C21.55 4.64 21.62 4.85 21.66 5.06C21.72 5.32 21.75 5.57 21.75 5.84L21.75 18.15C21.75 18.42 21.72 18.67 21.66 18.93C21.62 19.14 21.55 19.35 21.46 19.55C21.38 19.76 21.27 19.95 21.15 20.13Q20.95 20.43 20.69 20.69Q20.43 20.95 20.13 21.15C19.95 21.27 19.76 21.38 19.55 21.46C19.35 21.55 19.14 21.62 18.93 21.66C18.67 21.72 18.42 21.75 18.15 21.75L5.84 21.75C5.57 21.75 5.32 21.72 5.06 21.66C4.85 21.62 4.64 21.55 4.44 21.46C4.23 21.38 4.04 21.27 3.86 21.15Q3.56 20.95 3.3 20.69Q3.04 20.43 2.84 20.13C2.72 19.95 2.61 19.76 2.53 19.55C2.44 19.35 2.37 19.14 2.33 18.93C2.27 18.67 2.25 18.42 2.25 18.15L2.25 5.84C2.25 5.57 2.27 5.32 2.33 5.06C2.37 4.85 2.44 4.64 2.53 4.44C2.61 4.23 2.72 4.04 2.84 3.86Q3.04 3.56 3.3 3.3Q3.56 3.04 3.86 2.84C4.04 2.72 4.23 2.61 4.44 2.53C4.64 2.44 4.85 2.37 5.06 2.33C5.32 2.27 5.57 2.25 5.84 2.25L18.15 2.25ZM18.15 3.75L5.84 3.75C5.67 3.75 5.52 3.76 5.36 3.8C5.25 3.83 5.13 3.86 5.02 3.91C4.91 3.96 4.8 4.02 4.7 4.08C4.58 4.16 4.46 4.25 4.36 4.36C4.25 4.46 4.16 4.58 4.08 4.7C4.02 4.8 3.96 4.91 3.91 5.02C3.86 5.13 3.83 5.25 3.8 5.36C3.76 5.52 3.75 5.67 3.75 5.84L3.75 18.15C3.75 18.32 3.76 18.47 3.8 18.63C3.83 18.74 3.86 18.86 3.91 18.97C3.96 19.08 4.02 19.19 4.08 19.29C4.16 19.41 4.25 19.53 4.36 19.63C4.46 19.74 4.58 19.83 4.7 19.91C4.8 19.97 4.91 20.03 5.02 20.08C5.13 20.13 5.25 20.16 5.36 20.19C5.52 20.23 5.67 20.25 5.84 20.25L18.15 20.25C18.32 20.25 18.47 20.23 18.63 20.19C18.74 20.16 18.86 20.13 18.97 20.08C19.08 20.03 19.19 19.97 19.29 19.91C19.41 19.83 19.53 19.74 19.63 19.63C19.74 19.53 19.83 19.41 19.91 19.29C19.97 19.19 20.03 19.08 20.08 18.97C20.13 18.86 20.16 18.74 20.19 18.63C20.23 18.47 20.25 18.32 20.25 18.15L20.25 5.84C20.25 5.67 20.23 5.52 20.19 5.36C20.16 5.25 20.13 5.13 20.08 5.02C20.03 4.91 19.97 4.8 19.91 4.7C19.83 4.58 19.74 4.46 19.63 4.36C19.53 4.25 19.41 4.16 19.29 4.08C19.19 4.02 19.08 3.96 18.97 3.91C18.86 3.86 18.74 3.83 18.63 3.8C18.47 3.76 18.32 3.75 18.15 3.75ZM6.54 11.98L8.97 9.52C9.26 9.22 9.26 8.76 8.96 8.46C8.66 8.17 8.19 8.17 7.9 8.47L4.96 11.45C4.82 11.59 4.75 11.77 4.75 11.97C4.74 12.17 4.82 12.35 4.96 12.5L7.9 15.52C8.19 15.82 8.65 15.83 8.96 15.53C9.26 15.24 9.26 14.77 8.97 14.47L6.54 11.98ZM15.03 8.46C14.73 8.75 14.73 9.22 15.02 9.52L17.45 12.01L15.02 14.47C14.73 14.77 14.73 15.23 15.03 15.53C15.33 15.82 15.8 15.82 16.09 15.52L19.03 12.54C19.17 12.4 19.24 12.22 19.25 12.02C19.25 11.82 19.17 11.64 19.03 11.49L16.09 8.47C15.8 8.17 15.34 8.16 15.03 8.46ZM11.51 15.27L13.87 9.27C14.03 8.88 13.84 8.45 13.45 8.3C13.06 8.14 12.63 8.33 12.48 8.72L10.12 14.72C9.96 15.11 10.15 15.54 10.54 15.69C10.93 15.84 11.36 15.66 11.51 15.27Z"/></svg>`,
  header: {
    1: `<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g stroke-width="1" fill-rule="evenodd"><g><rect opacity="0" x="0" y="0" width="16" height="16"></rect><path d="M13.5713675,7.75269698 L13.578407,7.837994 L13.578407,13.0760491 C13.578407,13.3521915 13.3545494,13.5760491 13.078407,13.5760491 C12.8329471,13.5760491 12.6287986,13.3991739 12.5864627,13.1659247 L12.578407,13.0760491 L12.578,8.686 L11.6206466,9.21688158 C11.4059176,9.3358018 11.1416356,9.27997662 10.9915956,9.09644047 L10.9410056,9.02171982 C10.8220854,8.80699084 10.8779106,8.54270884 11.0614467,8.39266882 L11.1361674,8.34207882 L12.8361674,7.40059262 C13.1437867,7.23022831 13.5159343,7.42248511 13.5713675,7.75269698 Z M9,2.49644165 C9.24545989,2.49644165 9.44960837,2.67331681 9.49194433,2.90656602 L9.5,2.99644165 L9.5,12.9964417 C9.5,13.272584 9.27614237,13.4964417 9,13.4964417 C8.75454011,13.4964417 8.55039163,13.3195665 8.50805567,13.0863173 L8.5,12.9964417 L8.5,8.49944165 L3.5,8.49944165 L3.5,12.9964417 C3.5,13.272584 3.27614237,13.4964417 3,13.4964417 C2.75454011,13.4964417 2.55039163,13.3195665 2.50805567,13.0863173 L2.5,12.9964417 L2.5,2.99644165 C2.5,2.72029928 2.72385763,2.49644165 3,2.49644165 C3.24545989,2.49644165 3.44960837,2.67331681 3.49194433,2.90656602 L3.5,2.99644165 L3.5,7.49944165 L8.5,7.49944165 L8.5,2.99644165 C8.5,2.72029928 8.72385763,2.49644165 9,2.49644165 Z"></path></g></g></svg>`,
    2: `<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g stroke-width="1" fill-rule="evenodd"><g><rect opacity="0" x="0" y="0" width="16" height="16"></rect><path d="M8.5,2.49644165 C8.74545989,2.49644165 8.94960837,2.67331681 8.99194433,2.90656602 L9,2.99644165 L9,12.9964416 C9,13.272584 8.77614237,13.4964416 8.5,13.4964416 C8.25454011,13.4964416 8.05039163,13.3195665 8.00805567,13.0863173 L8,12.9964416 L8,8.49944165 L3,8.49944165 L3,12.9964416 C3,13.272584 2.77614237,13.4964416 2.5,13.4964416 C2.25454011,13.4964416 2.05039163,13.3195665 2.00805567,13.0863173 L2,12.9964416 L2,2.99644165 C2,2.72029928 2.22385763,2.49644165 2.5,2.49644165 C2.74545989,2.49644165 2.94960837,2.67331681 2.99194433,2.90656602 L3,2.99644165 L3,7.49944165 L8,7.49944165 L8,2.99644165 C8,2.72029928 8.22385763,2.49644165 8.5,2.49644165 Z M13.3535741,7.87538235 C14.0803728,8.6021811 14.1186254,9.7567876 13.4683283,10.5286222 L13.35357,10.6535782 L11.706,12.3 L13.7607097,12.3000121 C14.0061696,12.3000121 14.2103181,12.4768873 14.252654,12.7101365 L14.2607097,12.8000121 C14.2607097,13.045472 14.0838345,13.2496205 13.8505853,13.2919564 L13.7607097,13.3000121 L10.4999715,13.3000121 C10.0842133,13.3000121 9.86216672,12.8308519 10.0905053,12.5122062 L10.1464222,12.4464546 L12.6464673,9.94646732 C13.0231195,9.56981513 13.0231195,8.95914129 12.6464673,8.58248912 C12.2698151,8.20583695 11.6591413,8.20583695 11.2824891,8.58248912 C11.1281904,8.73678781 11.0337606,8.93352153 11.0074836,9.1434112 L10.999962,9.27068948 C11.0016597,9.54682663 10.7791825,9.77205624 10.5030453,9.77375389 C10.2269082,9.77545154 10.0016786,9.55297436 9.99998091,9.2768372 C9.99677516,8.75539501 10.1992171,8.25154756 10.5753823,7.87538232 C11.3425589,7.10820589 12.5863977,7.10820589 13.3535741,7.87538235 Z"></path></g></g></svg>`
  },
  redo: `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path id="path4 (边框)" d="M16 6.11L19.4 8.53L6.43 8.53C6.12 8.53 5.81 8.56 5.5 8.62C5.15 8.69 4.82 8.81 4.49 8.96C4.31 9.04 4.15 9.13 3.99 9.23C3.6 9.47 3.24 9.77 2.92 10.12C2.77 10.29 2.63 10.45 2.51 10.63C2.25 11 2.04 11.39 1.87 11.82C1.78 12.06 1.71 12.3 1.65 12.54C1.55 12.98 1.5 13.43 1.5 13.89C1.5 14.35 1.55 14.8 1.65 15.23C1.71 15.48 1.78 15.71 1.87 15.95C2.04 16.38 2.25 16.78 2.51 17.14C2.63 17.32 2.77 17.49 2.92 17.65C3.24 18 3.6 18.3 3.99 18.54C4.15 18.64 4.31 18.73 4.49 18.81C4.82 18.97 5.15 19.08 5.5 19.15C5.81 19.21 6.12 19.25 6.43 19.25L19.97 19.25C20.39 19.25 20.72 18.91 20.72 18.5C20.72 18.07 20.39 17.75 19.97 17.75L6.43 17.75C6.23 17.75 6.02 17.73 5.83 17.69C5.58 17.64 5.35 17.56 5.12 17.45C5.04 17.41 4.96 17.37 4.88 17.33C4.56 17.15 4.28 16.92 4.03 16.64C3.94 16.55 3.86 16.45 3.79 16.35C3.58 16.07 3.41 15.75 3.27 15.41C3.22 15.26 3.17 15.11 3.13 14.96C3.04 14.61 3 14.26 3 13.89C3 13.52 3.04 13.16 3.13 12.82C3.17 12.66 3.22 12.51 3.27 12.36C3.41 12.02 3.58 11.71 3.79 11.42C3.86 11.32 3.94 11.23 4.03 11.13C4.28 10.85 4.56 10.62 4.88 10.45C4.96 10.4 5.04 10.36 5.12 10.32C5.35 10.21 5.58 10.14 5.83 10.09C6.02 10.05 6.23 10.03 6.43 10.03L21.75 10.03C21.87 10.03 21.98 10 22.09 9.95C22.2 9.89 22.29 9.81 22.36 9.71C22.48 9.55 22.52 9.36 22.48 9.15C22.45 8.95 22.35 8.79 22.18 8.67L16.87 4.88C16.53 4.64 16.07 4.72 15.82 5.06C15.58 5.4 15.66 5.86 16 6.11Z"/></svg>`,
  size: `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>`,
  undo: `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path id="path4 (边框)" d="M7.99 6.11L4.59 8.53L17.56 8.53C17.87 8.53 18.18 8.56 18.49 8.62C18.84 8.69 19.17 8.81 19.5 8.96C19.68 9.04 19.84 9.13 20 9.23C20.39 9.47 20.75 9.77 21.07 10.12C21.22 10.29 21.36 10.45 21.48 10.63C21.74 11 21.95 11.39 22.12 11.82C22.21 12.06 22.28 12.3 22.34 12.54C22.44 12.98 22.5 13.43 22.5 13.89C22.5 14.35 22.44 14.8 22.34 15.23C22.28 15.48 22.21 15.71 22.12 15.95C21.95 16.38 21.74 16.78 21.48 17.14C21.36 17.32 21.22 17.49 21.07 17.65C20.75 18 20.39 18.3 20 18.54C19.84 18.64 19.68 18.73 19.5 18.81C19.17 18.97 18.84 19.08 18.49 19.15C18.18 19.21 17.87 19.25 17.56 19.25L4.02 19.25C3.6 19.25 3.27 18.91 3.27 18.5C3.27 18.07 3.6 17.75 4.02 17.75L17.56 17.75C17.76 17.75 17.97 17.73 18.16 17.69C18.41 17.64 18.64 17.56 18.87 17.45C18.95 17.41 19.03 17.37 19.11 17.33C19.43 17.15 19.71 16.92 19.96 16.64C20.05 16.55 20.13 16.45 20.2 16.35C20.41 16.07 20.58 15.75 20.72 15.41C20.77 15.26 20.82 15.11 20.86 14.96C20.95 14.61 21 14.26 21 13.89C21 13.52 20.95 13.16 20.86 12.82C20.82 12.66 20.77 12.51 20.72 12.36C20.58 12.02 20.41 11.71 20.2 11.42C20.13 11.32 20.05 11.23 19.96 11.13C19.71 10.85 19.43 10.62 19.11 10.45C19.03 10.4 18.95 10.36 18.87 10.32C18.64 10.21 18.41 10.14 18.16 10.09C17.97 10.05 17.76 10.03 17.56 10.03L2.25 10.03C2.12 10.03 2.01 10 1.9 9.95C1.79 9.89 1.7 9.81 1.63 9.71C1.51 9.55 1.47 9.36 1.51 9.15C1.54 8.95 1.64 8.79 1.81 8.67L7.12 4.88C7.46 4.64 7.92 4.72 8.17 5.06C8.41 5.4 8.33 5.86 7.99 6.11Z"/></svg>`
}

export const simpleToolbar = [
  'bold',
  'italic',
  'underline',
  'strike',
  { list: 'bullet' },
  { list: 'ordered' },
  { align: '' },
  { align: 'center' },
  { align: 'right' }
]
