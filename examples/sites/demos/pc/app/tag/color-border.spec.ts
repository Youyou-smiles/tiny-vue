import { test, expect } from '@playwright/test'

test('边框和自定义背景色', async ({ page }) => {
  page.on('pageerror', (exception) => expect(exception).not.toBeNull())
  await page.goto('tag#color-border')

  const tags = page.locator('.all-demos-container').locator('.tiny-tag')
  const red = tags.getByText('red 标签')
  const custom = tags.getByText('自定义背景色', { exact: true })

  await expect(red).toHaveClass(/tiny-tag--red/)
  await expect(custom).toHaveCSS('background-color', 'rgba(82, 196, 26, 0.8)')
})
