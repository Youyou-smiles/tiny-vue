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

// 自适应
const adaptive = ({ autoArr, meanWidth, minCellWidth, tableWidth, fit, bodyWidth }) => {
  autoArr.forEach((column, index) => {
    let width = Math.max(meanWidth, minCellWidth)

    column.renderWidth = width
    tableWidth += width

    if (fit && index === autoArr.length - 1) {
      // 如果所有列足够放的情况下，修补列之间的误差
      let odiffer = bodyWidth - tableWidth

      if (odiffer > 0) {
        column.renderWidth += odiffer
        tableWidth = bodyWidth
      }
    }
  })

  return tableWidth
}

// 计算每一列的渲染宽度：renderWidth
const initTableWidth = ({ remainWidth, columnStore }) => {
  let tableWidth = 0
  let { resizeList: resizeArr, pxMinList: pxMinArr, pxList: pxArr } = columnStore
  let { scaleList: scaleArr, scaleMinList: scaleMinArr } = columnStore
  // 最小宽
  pxMinArr.forEach((column) => {
    let minWidth = parseInt(column.minWidth)

    tableWidth += minWidth
    column.renderWidth = minWidth
  })
  // 最小百分比
  let meanWidth = remainWidth / 100

  scaleMinArr.forEach((column) => {
    let scaleWidth = Math.floor(parseInt(column.minWidth) * meanWidth)

    tableWidth += scaleWidth
    column.renderWidth = scaleWidth
  })
  // 固定百分比
  scaleArr.forEach((column) => {
    let scaleWidth = Math.floor(parseInt(column.width) * meanWidth)

    tableWidth += scaleWidth
    column.renderWidth = scaleWidth
  })
  // 固定宽
  pxArr.forEach((column) => {
    let width = parseInt(column.width)

    tableWidth += width
    column.renderWidth = width
  })
  // 调整了列宽
  resizeArr.forEach((column) => {
    let width = parseInt(column.resizeWidth)

    tableWidth += width
    column.renderWidth = width
  })

  return { tableWidth, meanWidth }
}

export const calcTableWidth = ({ bodyWidth, columnStore, fit, minCellWidth, remainWidth }) => {
  let { tableWidth, meanWidth } = initTableWidth({ remainWidth, columnStore })
  let { pxMinList: pxMinArr, scaleMinList: scaleMinArr, autoList: autoArr } = columnStore

  remainWidth -= tableWidth
  meanWidth = remainWidth > 0 ? Math.floor(remainWidth / (scaleMinArr.length + pxMinArr.length + autoArr.length)) : 0

  if (fit) {
    if (remainWidth > 0) {
      scaleMinArr.concat(pxMinArr).forEach((column) => {
        tableWidth += meanWidth
        column.renderWidth += meanWidth
      })
    }
  } else {
    meanWidth = minCellWidth
  }

  // 自适应修补一些列的宽度
  tableWidth = adaptive({ autoArr, meanWidth, minCellWidth, tableWidth, fit, bodyWidth })
  const remainingSpace = bodyWidth - tableWidth
  // 如果还有空间剩余
  if (fit && remainingSpace > 0) {
    scaleMinArr
      .concat(pxMinArr)
      .slice(0, remainingSpace)
      .forEach((column) => {
        tableWidth += 1
        column.renderWidth += 1
      })
  }
  return tableWidth
}

const setLeftOrRightPosition = ({ columnList, direction, headerEl, bodyEl, scrollbarWidth }) => {
  // 这里需要浅拷贝一份，避免改变原始数据的顺序
  const colList = columnList.slice()

  // 如果是右测冻结则需要反转数组后再进行循环
  if (direction === 'right') {
    colList.reverse()
  }

  colList.reduce((pos, column) => {
    // 可能存在没有表头的情况，所以需要兼容处理下
    const ths = headerEl?.querySelectorAll(`[data-colid=${column.id}]`) || []
    const tds = bodyEl.querySelectorAll(`[data-colid=${column.id}]`)
    const allFixed = [...Array.from(ths), ...Array.from(tds)]
    allFixed.forEach((td) => {
      // 有纵向滚动条时，表头右冻结列需要补偿right定位
      let compensatingWidth = 0
      if (direction === 'right' && scrollbarWidth && td.className.includes('header__column')) {
        compensatingWidth = scrollbarWidth
      }

      td.style[direction] = `${pos + compensatingWidth}px`
    })
    column.style = column.style || {}
    column.style[direction] = pos
    pos += column.renderWidth

    return pos
  }, 0)
}

// 设置分组父表头冻结列sticky布局的left和right值
const setGroupHeaderPosition = ({ columnChart, direction }) => {
  // 这里需要浅拷贝一份，避免改变原始数据的顺序
  const colChart = columnChart.slice()
  const finishColumns = new Set()
  // 如果是右测冻结则需要反转数组后再进行循环
  if (direction === 'right') {
    colChart.reverse()
  }

  colChart.forEach((columns) => {
    const len = columns.length
    if (len === 1) {
      return
    }

    const leafColumn = columns[len - 1]
    const leafDirectionPos = leafColumn?.style?.[direction] ?? null

    if (leafDirectionPos !== null) {
      columns.forEach((column, index) => {
        // 叶子节点则返回
        if (index === columns.length - 1) {
          return
        }
        column.style = column.style || {}
        if (!finishColumns.has(column.id)) {
          column.style[direction] = leafDirectionPos
          finishColumns.add(column.id)
        }
      })
    }
  })
}

// 设置分组父表头冻结列是否左侧最后一项，或者是否右侧第一项
const setGroupHeaderLastOrFirst = ({ columnChart, leftList, rightList }) => {
  columnChart.forEach((columns) => {
    const len = columns.length
    const leafColumn = columns[len - 1]

    const isFixedLeftLast = leftList[leftList.length - 1] === leafColumn
    const isFixedRightFirst = rightList[0] === leafColumn

    columns.forEach((column) => {
      column.isFixedLeftLast = column.isFixedLeftLast || isFixedLeftLast
      column.isFixedRightFirst = column.isFixedRightFirst || isFixedRightFirst
    })
  })
}

export const calcFixedStickyPosition = ({ headerEl, bodyEl, columnStore, scrollbarWidth, columnChart, isGroup }) => {
  // 获取左侧和右侧冻结列
  const { leftList, rightList } = columnStore
  setLeftOrRightPosition({ columnList: leftList, direction: 'left', headerEl, bodyEl, scrollbarWidth })
  setLeftOrRightPosition({ columnList: rightList, direction: 'right', headerEl, bodyEl, scrollbarWidth })
  if (isGroup) {
    setGroupHeaderPosition({ columnChart, direction: 'left' })
    setGroupHeaderPosition({ columnChart, direction: 'right' })
    setGroupHeaderLastOrFirst({ columnChart, leftList, rightList })
  }
}
