<script lang="tsx">
import { renderless, api } from '@opentiny/vue-renderless/file-upload/vue'
import { props, setup, h, isVue3, defineComponent } from '@opentiny/vue-common'
import UploadList from '@opentiny/vue-upload-list'
import Upload from '@opentiny/vue-upload'
import Progress from '@opentiny/vue-progress'
import Modal from '@opentiny/vue-modal'
import DialogBox from '@opentiny/vue-dialog-box'
import Tooltip from '@opentiny/vue-tooltip'
import {
  IconAttachment,
  IconDownload,
  IconSuccessful,
  IconClose,
  IconFileCloudupload,
  IconPlus,
  IconPlusCircle,
  IconPicture,
  IconMic,
  IconStartCircle,
  IconHelpQuery
} from '@opentiny/vue-icon'
import Streamsaver from 'streamsaver'
import Button from '@opentiny/vue-button'
import Input from '@opentiny/vue-input'
import Switch from '@opentiny/vue-switch'
import type { IFileUploadApi } from '@opentiny/vue-renderless/types/file-upload.type'

export default defineComponent({
  inheritAttrs: false,
  emits: [
    'change',
    'hash-progress',
    'error',
    'progress',
    'success',
    'remove',
    'download',
    'trigger-click',
    'click-file-list'
  ],
  props: [
    ...props,
    'edm',
    'action',
    'headers',
    'data',
    'multiple',
    'name',
    'drag',
    'dragger',
    'withCredentials',
    'showFileList',
    'accept',
    'type',
    'beforeUpload',
    'beforeRemove',
    'fileList',
    'autoUpload',
    'listType',
    'httpRequest',
    'disabled',
    'limit',
    'openDownloadFile',
    'mergeService',
    'fileSize',
    'thumbOption',
    'isFolderTitle',
    'listOption',
    'maxNameLength',
    'scale',
    'showName',
    'sourceType',
    'showTitle',
    'title',
    'displayOnly',
    'customClass',
    'hwh5',
    'mode',
    'cacheToken',
    'lockScroll',
    'compact',
    'encryptConfig',
    'imageBgColor',
    'promptTip'
  ],
  setup(props, context) {
    return setup({
      props,
      context,
      renderless,
      api,
      extendOptions: { Modal, Streamsaver }
    }) as unknown as IFileUploadApi
  },
  components: {
    TinyProgress: Progress,
    UploadList,
    Upload,
    TinyDialogBox: DialogBox,
    TinyTooltip: Tooltip,
    IconAttachment: IconAttachment(),
    IconSuccessful: IconSuccessful(),
    IconCloseCircle: IconClose(),
    IconDownload: IconDownload(),
    IconFileCloudupload: IconFileCloudupload(),
    TinyButton: Button,
    IconPlus: IconPlus(),
    IconPlusCircle: IconPlusCircle(),
    IconPicture: IconPicture(),
    IconMic: IconMic(),
    IconStartCircle: IconStartCircle(),
    IconHelpQuery: IconHelpQuery(),
    TinyModal: Modal
  },
  render() {
    const {
      exceed = () => {},
      preview = undefined,
      'download-file': downloadFile,
      'download-all': downloadAll,
      're-upload': reUpload,
      'trigger-click': triggerClick,
      play
    } = this.state.listeners

    const {
      uploadFiles,
      isEdm,
      dialogConfigObj,
      isSuccess,
      uploadDisabled,
      url,
      accept,
      httpRequest,
      edmToken,
      iframeUrl,
      isDragover,
      selected,
      types,
      isHwh5
    } = this.state

    const {
      handleRemove,
      updateFile,
      slots,
      edm = {},
      $attrs,
      a,
      t,
      showTitle,
      isFolderTitle,
      listOption,
      maxNameLength,
      scale,
      showName,
      openDownloadFile,
      type,
      drag,
      multiple,
      withCredentials,
      headers,
      name,
      data,
      autoUpload,
      limit,
      handleStart,
      handleProgress,
      handleSuccess,
      handleError,
      fileSize,
      displayOnly,
      customClass,
      handleClickFileList,
      handleTriggerClick,
      showFileList,
      mode,
      lockScroll,
      compact,
      encryptConfig,
      encryptDialogConfirm,
      imageBgColor,
      promptTip
    } = this

    const listType = this.listType === 'saas' ? 'text' : this.listType
    const title = this.title || t('ui.fileUpload.attachment')
    const isDragSingle = listType === 'drag-single'
    const isText = listType === 'text'
    const isFolder = edm.upload ? edm.upload.isFolder : false

    // 标题
    const getDefaultTitle = ({
      listType,
      title,
      showTitle,
      isInside = false,
      displayOnly = false,
      mode
    }: {
      listType: string
      title: string
      showTitle: boolean
      isInside?: boolean
      displayOnly?: boolean
      mode?: String
    }) => {
      let defaultTitle

      if (isInside) {
        defaultTitle = (
          <span class={showTitle ? 'inline-block mr-1 text-sm text-color-text-primary font-bold' : 'hidden'}>
            {title}
          </span>
        )
      } else {
        let cls = 'text-sm text-color-text-primary font-bold leading-5.5 '

        if (listType !== 'text') {
          cls += 'hidden'
        } else if (!displayOnly && showTitle) {
          cls += 'hidden sm:block'
        } else {
          !displayOnly || !showTitle ? (cls += 'hidden') : (cls += 'mt-4 mb-2')
        }

        defaultTitle =
          mode !== 'bubble' ? (
            <div class={cls}>
              <span class="mr-1">{title}</span>
              {displayOnly && getDisplayOnlyTip({ isEdm, fileSize })}
            </div>
          ) : null
      }

      return defaultTitle
    }

    // 提示信息插槽
    const getDefaultTip = ({
      listType,
      title,
      showTitle,
      isEdm,
      accept,
      fileSize,
      slots
    }: {
      listType: string
      title: string
      showTitle: boolean
      isEdm: boolean
      accept: string
      fileSize: number
      slots: any
    }) => {
      let defaultTip
      const tipMsg = this.getTipMessage({
        accept: isEdm ? accept : this.accept,
        fileSize,
        limit: this.limit
      })
      const popperConfig = { bubbling: true }

      if (listType === 'text') {
        defaultTip = (
          <div class="inline-block w-full sm:pl-4 text-color-none">
            <div class="block sm:hidden">
              {getDefaultTitle({ listType, title, showTitle, isInside: true })}
              <tiny-tooltip effect="dark" content={tipMsg} placement="top" popper-options={popperConfig}>
                <icon-help-query class="-mt-0.5 fill-color-none-hover" />
              </tiny-tooltip>
            </div>
          </div>
        )
      } else if (listType === 'drag-single') {
        defaultTip = (
          <div title={tipMsg} class="leading-5 text-color-text-primary overflow-hidden text-ellipsis whitespace-nowrap">
            {(slots.tip && slots.tip()) || tipMsg}
          </div>
        )
      } else {
        defaultTip = slots.tip ? <div class="mb-4 text-color-none">{slots.tip()}</div> : null
      }

      return defaultTip
    }

    const getDisplayOnlyTip = ({ isEdm, fileSize }: { isEdm: boolean; fileSize: number }) => {
      const popperConfig = { bubbling: true }
      return (
        <tiny-tooltip
          class="inline-block sm:hidden"
          effect="dark"
          content={this.getTipMessage({
            accept: isEdm ? accept : this.accept,
            fileSize,
            limit: this.limit
          })}
          placement="top"
          popper-options={popperConfig}>
          <icon-help-query class="-mt-0.5  fill-color-none-hover" />
        </tiny-tooltip>
      )
    }

    // trigger插槽content
    const getTriggerContent = ({
      listType,
      t,
      type,
      disabled
    }: {
      listType: string
      t: any
      type: string
      disabled: Boolean
    }) => {
      const defaultList = {
        'picture': (
          <div>
            <icon-picture class="w-6 h-6 fill-color-icon-secondary" />
            <div class="mt-1 sm:mt-2 text-color-text-secondary text-xs">{t('ui.upload.addPicture')}</div>
          </div>
        ),
        'audio': (
          <div>
            <icon-mic class="w-6 h-6 fill-color-icon-secondary" />
            <div class="mt-1 sm:mt-2 text-color-text-secondary text-xs">{t('ui.upload.addAudio')}</div>
          </div>
        ),
        'video': (
          <div>
            <icon-start-circle class="w-6 h-6 fill-color-icon-secondary" />
            <div class="mt-1 sm:mt-2 text-color-text-secondary text-xs">{t('ui.upload.addVideo')}</div>
          </div>
        )
      }

      let defaultContent
      if (listType === 'text') {
        defaultContent = (
          <div class="inline-block">
            <tiny-button disabled={disabled} class="hidden sm:block">
              <div class="flex items-center">
                <icon-plus />
                <span class="ml-2">{t('ui.fileUpload.uploadFile')}</span>
              </div>
            </tiny-button>
            <icon-plus-circle custom-class="sm:hidden w-5 h-5" />
          </div>
        )
      } else if (listType === 'drag-single') {
        defaultContent = null
      } else {
        let defaultClass =
          'relative h-full border border-dashed border-color-border rounded bg-color-bg-2 align-top hover:cursor-pointer'
        listType === 'picture-single' && uploadFiles.length && (defaultClass += ' hidden')

        defaultContent = (
          <div class={defaultClass}>
            <div class="absolute w-full top-1/2 left-0 -translate-y-1/2 z-[1] text-center">
              {defaultList[type || 'picture']}
            </div>
          </div>
        )
      }

      return defaultContent
    }

    // 操作区域插槽
    const getOperateContent = ({
      listType,
      downloadAll,
      uploadFiles,
      t
    }: {
      listType: string
      downloadAll: any
      uploadFiles: Array<any>
      t: any
    }) => {
      let operateContent
      if (listType === 'text') {
        operateContent = downloadAll ? (
          <div class="hidden sm:inline-block align-middle">
            <tiny-button onClick={() => downloadAll(uploadFiles)}>
              <div class="flex items-center">
                <icon-download />
                <span class="ml-2">{t('ui.fileUpload.downloadAll')}</span>
              </div>
            </tiny-button>
          </div>
        ) : null
      }

      return operateContent
    }

    // trigger插槽
    const getTrigger = ({
      displayOnly,
      slots,
      listType,
      t,
      type,
      disabled
    }: {
      displayOnly: boolean
      slots: any
      listType: string
      t: any
      type: string
      disabled: Boolean
    }) => {
      return !displayOnly || (displayOnly && ['picture-card', 'picture-single'].includes(type))
        ? slots.trigger
          ? slots.trigger()
          : getTriggerContent({ listType, t, type, disabled })
        : null
    }

    const tip = !displayOnly ? getDefaultTip({ listType, title, showTitle, isEdm, accept, fileSize, slots }) : null
    tip && tip.data && (tip.data.slot = 'tip')

    const operate = !displayOnly ? getOperateContent({ listType, downloadAll, uploadFiles, t }) : null

    operate && operate.data && (operate.data.slot = 'operate')

    // 获取children
    const getChildren = (type: string) => {
      const trigger = getTrigger({ displayOnly, slots, listType, t, type, disabled: uploadDisabled })
      const childNodes = isVue3
        ? { default: () => trigger, tip: () => !isDragSingle && tip, operate: () => operate }
        : [trigger, !isDragSingle && tip, operate]

      return childNodes
    }

    const tipMessage =
      (slots.tip && slots.tip()) ||
      this.getTipMessage({
        accept: isEdm ? accept : this.accept,
        fileSize,
        limit: this.limit
      })

    const uploadData = {
      props: {
        type,
        drag,
        action: url,
        multiple,
        withCredentials,
        headers,
        name,
        data,
        edm,
        accept: isEdm ? accept : this.accept,
        fileList: uploadFiles,
        autoUpload,
        listType,
        disabled: uploadDisabled,
        limit,
        onExceed: exceed,
        onStart: handleStart,
        onProgress: handleProgress,
        onSuccess: handleSuccess,
        onError: handleError,
        onPreview: preview,
        httpRequest,
        isFolder,
        edmToken,
        scale,
        displayOnly,
        customClass,
        handleTriggerClick,
        mode,
        showTitle,
        isHwh5,
        tipMessage,
        promptTip,
        showFileList
      },
      ref: 'upload-inner'
    }

    const createUploadComponent = (type: string) => {
      uploadData.props.sourceType = type
      return h(Upload, uploadData, getChildren(type))
    }

    const uploadListDate = {
      props: {
        disabled: uploadDisabled,
        isFolder,
        isEdm,
        edm,
        displayOnly,
        listType,
        files: uploadFiles,
        isFolderTitle,
        listOption,
        maxNameLength,
        scale,
        showName,
        types,
        isDragover,
        handlePreview: preview,
        handleDownloadFile: downloadFile,
        handleReUpload: reUpload,
        openDownloadFile,
        selected,
        triggerClick,
        isHwh5,
        triggerPlay: play,
        mode,
        lockScroll,
        compact,
        imageBgColor
      },
      scopedSlots: {
        default: (props: any) => {
          if (slots.file) {
            return slots.file({
              file: props.file
            })
          }
        },
        upload: ({ type }: any) => {
          return !isText ? createUploadComponent(type) : null
        },
        tip: () => tip,
        'assist-content': (props: any) => {
          if (slots['assist-content']) {
            return slots['assist-content']({ file: props.file })
          }
        },
        operate: (props: any) => {
          if (slots.operate) {
            return slots.operate({ file: props.file })
          }
        }
      },
      on: {
        remove: handleRemove,
        update: updateFile,
        start: handleStart,
        'click-file-list': handleClickFileList,
        'update:visible': (visible: Boolean) => (this.state.visible = visible)
      },
      ref: 'upload-list-inner'
    }

    let uploadList

    if (showFileList) {
      uploadList = h(UploadList, uploadListDate)

      if (mode === 'bubble') {
        uploadList = h(
          'tiny-modal',
          {
            props: {
              customClass: 'sm:w-[theme(spacing.112)]',
              title: t('ui.fileUpload.uploadList'),
              position: 'bottom-right',
              mask: false,
              showClose: false,
              showFooter: false,
              modelValue: this.state.visible
            },
            on: {
              'update:modelValue': (val: Boolean) => (this.state.visible = val)
            }
          },
          [uploadList]
        )
      }
    }

    let previewComponent = null
    let encryptDialogComponent = null

    const notice = (this as any).slots.notice && (this as any).slots.notice()
    let noticePC = this.state.current !== 'default' ? notice : ''
    let noticeMF = this.state.current === 'default' ? notice : ''

    if (isEdm && isSuccess) {
      uploadData.props.accept = accept
      uploadData.props.edmToken = edmToken
    }

    if (edm.preview) {
      previewComponent = h('tiny-dialog-box', {
        minHeight: '600px',
        width: '60%',
        ...dialogConfigObj,
        scopedSlots: {
          default: () => {
            return (
              <iframe
                id="_iframe"
                style="display: block;width: 100%;height: 500px;display: inline-block;"
                allowfullscreen
                allowtransparency="true"
                frameborder="0"
                border="0"
                marginwidth="0"
                marginheight="0"
                scrolling="no"
                src={iframeUrl}></iframe>
            )
          }
        }
      })
    }

    if (encryptConfig.enabled) {
      encryptDialogComponent = h('tiny-dialog-box', {
        style: '',
        props: {
          dataTag: 'encrypt-config-dialog',
          lockScroll: true,
          visible: this.state.encryptDialogConfig.show,
          dragable: true,
          title: this.t('ui.fileUpload.encryptDialogTitle'),
          width: '380px',
          height: 'auto',
          'modal-append-to-body': false // tiny的dialogbox需要添加此属性，防止自动加到body下
        },
        on: {
          'update:visible': (value) => (this.state.encryptDialogConfig.show = value)
        },
        scopedSlots: {
          default: () => {
            return (
              <div data-tag="encrypt-config-dialog-body">
                <div>{this.t('ui.fileUpload.addWatermark')}</div>
                <div>
                  <Input v-model={this.encryptConfig.watermark}></Input>
                </div>
                <p>&nbsp;</p>
                <div>{this.t('ui.fileUpload.encrypted')}</div>
                <div>
                  <Switch v-model={this.encryptConfig.encrypt}></Switch>
                </div>
              </div>
            )
          },
          footer: () => {
            return [
              <Button onClick={() => (this.state.encryptDialogConfig.show = false)}>{this.t('ui.base.cancel')}</Button>,
              [
                <Button type="primary" customClass="ml-2" onClick={() => encryptDialogConfirm()}>
                  {this.t('ui.popupload.uploadButtonText')}
                </Button>
              ]
            ]
          }
        }
      })
    }

    const attrs = a($attrs, ['^on[A-Z]'])

    return (
      <div {...attrs} data-tag="tiny-file-upload" class={isDragSingle ? 'relative inline-block' : ''}>
        {getDefaultTitle({ listType, title, showTitle, displayOnly, mode })}
        {noticePC}
        {isText && !displayOnly ? (slots.trigger ? [createUploadComponent()] : createUploadComponent()) : null}
        {noticeMF}
        {uploadList}
        {previewComponent}
        {encryptDialogComponent}
      </div>
    )
  }
})
</script>
