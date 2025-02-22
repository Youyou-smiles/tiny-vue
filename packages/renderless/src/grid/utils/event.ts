/**
 * MIT License
 *
 * Copyright (c) 2019 Xu Liangzhan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { browserInfo } from '@opentiny/utils'
import { remove } from '../static'
import { on } from '@opentiny/utils'

// 监听全局事件
const wheelName = browserInfo.isDoc && /Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel'
const eventStore = []

const invoke = ({ comp, type, cb }, event) => {
  if (type === event.type || (type === 'mousewheel' && event.type === wheelName)) {
    cb.call(comp, event)
  }
}

const GlobalEvent = {
  on(comp, type, cb, capture = false) {
    if (cb) {
      eventStore.push({ comp, type, cb, capture })
    }
  },
  off(comp, type, capture = false) {
    remove(eventStore, (item) => item.comp === comp && item.type === type && item.capture === capture)
  },
  trigger(event) {
    eventStore.filter((item) => !item.capture).forEach((item) => invoke(item, event))
  },
  capture(event) {
    eventStore.filter((item) => item.capture).forEach((item) => invoke(item, event))
  }
}

if (browserInfo.isDoc) {
  on(document, 'keydown', GlobalEvent.trigger)
  on(document, 'contextmenu', GlobalEvent.trigger)
  on(window, 'mousedown', GlobalEvent.trigger)
  on(window, 'mousedown', GlobalEvent.capture, true)
  on(window, 'blur', GlobalEvent.trigger)
  on(window, 'resize', GlobalEvent.trigger)
  on(window, wheelName, GlobalEvent.trigger)
}

export default GlobalEvent
