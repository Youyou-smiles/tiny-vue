import { test, expect } from '@playwright/test'

test('自定义菜单数据服务', async ({ page }) => {
  page.on('pageerror', (exception) => expect(exception).toBeNull())
  await page.goto('link-menu#get-menu-data-sync')
  const preview = page.locator('#get-menu-data-sync')
  const dialogBox = preview.locator('.tiny-dialog-box')
  const linkMenuList = preview.locator('.tiny-tree.tiny-link-menu__overflow > div')
  // 点击图标弹出对话框
  await preview.getByRole('button').click()

  // 展开第二个父列表
  const secondOption = linkMenuList.nth(1).locator('.tiny-tree-node')
  await secondOption.locator('.tiny-tree-node__content').click({ force: true })
  // 子列表应该可见
  await expect(secondOption.locator('.tiny-tree-node__children')).toBeVisible()
  // 子列表
  let subOptions = secondOption.locator('.tiny-tree-node__children > div')
  // 选中第一个子列表项
  let subFirstOption = subOptions.first()
  await subFirstOption.locator('.tiny-checkbox').click()
  // 选中第二个子列表项
  let subSecondOption = subOptions.nth(1)
  await subSecondOption.locator('.tiny-checkbox').click()

  // 展开第三个父列表
  const thirdOption = linkMenuList.nth(2).locator('.tiny-tree-node')
  await thirdOption.locator('.tiny-tree-node__content').click({ force: true })
  // 子列表
  subOptions = thirdOption.locator('.tiny-tree-node__children > div')
  // 选中第一个子列表项
  subFirstOption = subOptions.first()
  await subFirstOption.locator('.tiny-checkbox').click()

  // 点击确定
  await preview.getByRole('button', { name: '确定' }).click()
  // 弹框应该不可见
  await expect(dialogBox).toBeHidden()
  // 页面上应该展示所选的 3 个菜单项
  await expect(preview.locator('.tiny-link-menu .tiny-link-menu__nav > a')).toHaveCount(3)
})
