import { test, expect } from '@playwright/test'

test('旗子数据来源', async ({ page }) => {
  page.on('pageerror', (exception) => expect(exception).not.toBeNull())
  await page.goto('milestone#flag-before')

  const flags = page.locator('.tiny-milestone__flag-content')
  const flagLines = page.locator('.tiny-milestone__flag-line')
  const flagLineDots = flagLines.locator('.tiny-milestone__dot')
  const nodes = page.locator('.tiny-milestone__icon.tiny-milestone__icon-custom')
  const flagCount = 4
  const flagAfterContents = [/引导用户按照流程完成任务/, /test7欢迎使用 vui/, /test8/, /test6/]
  const flagBeforeContents = [/test1已完成/, /引导用户按照流程完成任务/, /test7欢迎使用 vui/, /test8/]
  const button = page.getByRole('button').filter({ hasText: '设置 flag-before 值为 true' })
  const flagAfterLineColors = ['rgb(194, 194, 194)', 'rgb(194, 194, 194)', 'rgb(158, 219, 88)', 'rgb(179, 214, 255)']
  const flagBeforeLineColors = ['rgb(179, 214, 255)', 'rgb(194, 194, 194)', 'rgb(194, 194, 194)', 'rgb(158, 219, 88)']

  for (let i = 0; i < flagCount; i++) {
    const { x, y, width, height } = await flags.nth(i).boundingBox()
    const { y: lineY, height: lineHeight } = await flagLines.nth(i).boundingBox()
    let index = i
    if (i === 1 || i === 3) {
      index = i + 1
    }
    const { x: nodeX } = await nodes.nth(index).boundingBox()

    await expect(x).toBeGreaterThanOrEqual(nodeX)
    await expect(lineY - lineHeight).toBeGreaterThanOrEqual(y)
    await expect(width).toEqual(96)
    await expect(height).toBeGreaterThanOrEqual(34)
    await expect(flags.nth(i)).toHaveText(flagAfterContents[i])
    await expect(flagLines.nth(i)).toHaveCSS('width', '1px')
    await expect(flagLines.nth(i)).toHaveCSS('height', '30px')
    await expect(flagLines.nth(i)).toHaveCSS('background-color', flagAfterLineColors[i])
    await flagLineDots.nth(i).isVisible()
  }

  await button.click()

  for (let i = 0; i < flagCount; i++) {
    const { x, y, width, height } = await flags.nth(i).boundingBox()
    const { y: lineY, height: lineHeight } = await flagLines.nth(i).boundingBox()
    let index = i
    if (i === 2) {
      index = i + 1
    }
    const { x: nodeX } = await nodes.nth(index).boundingBox()

    await expect(x).toBeGreaterThanOrEqual(nodeX, 2)
    await expect(lineY - lineHeight).toBeGreaterThanOrEqual(y)
    await expect(width).toEqual(96)
    await expect(height).toBeGreaterThanOrEqual(34)
    await expect(flags.nth(i)).toHaveText(flagBeforeContents[i])
    await expect(flagLines.nth(i)).toHaveCSS('width', '1px')
    await expect(flagLines.nth(i)).toHaveCSS('height', '30px')
    await expect(flagLines.nth(i)).toHaveCSS('background-color', flagBeforeLineColors[i])
    await flagLineDots.nth(i).isVisible()
  }
})
