import { test, expect } from '@playwright/test'

test.describe('以下 3 个测试将覆盖 3 个 demo: 数据源、收藏菜单标题、菜单内容超长时换行显示', () => {
  test('弹框功能是否正常', async ({ page }) => {
    page.on('pageerror', (exception) => expect(exception).toBeNull())
    await page.goto('link-menu#data-resource')
    const dialogBox = page.locator('.tiny-dialog-box')
    // 点击图标弹出对话框
    await page.locator('#data-resource').getByRole('button').click()
    // 弹框应该可见
    await expect(dialogBox).toBeVisible()
    // 关闭弹框
    await page.getByRole('button', { name: '取消' }).click()
    // 弹框应该不可见
    await expect(dialogBox).toBeHidden()
  })

  test('菜单内容超长时换行显示、收藏菜单标题', async ({ page }) => {
    page.on('pageerror', (exception) => expect(exception).toBeNull())
    await page.goto('link-menu#data-resource')
    const dialogBox = page.locator('.tiny-dialog-box')
    const dialogBoxTitle = page.locator('.tiny-dialog-box__header .tiny-dialog-box__title')
    const linkMenuList = page.locator('.tiny-tree.tiny-link-menu__wrap > div')
    // 点击图标弹出对话框
    await page.locator('#data-resource').getByRole('button').click()
    // 弹框应该可见
    await expect(dialogBox).toBeVisible()
    // 自定义标题
    await expect(dialogBoxTitle).not.toBeEmpty()
    // 判断选项是否换行显示
    await expect(linkMenuList.first().locator('span.tree-node-name')).toHaveCSS('word-break', 'break-word')
  })

  test('是否可以选中菜单项并展示', async ({ page }) => {
    await page.goto('link-menu#data-resource')
    const preview = page.locator('#data-resource')
    const dialogBox = preview.locator('.tiny-dialog-box')
    const linkMenuList = preview.locator('.tiny-tree.tiny-link-menu__wrap > div')
    // 点击图标弹出对话框
    await preview.getByRole('button').click()
    const firstOption = linkMenuList.first().locator('label.tiny-checkbox')
    // 点击第一个选项
    await firstOption.click()
    await expect(firstOption).toHaveClass(/is-checked/)
    // 取消选中
    await firstOption.click()

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
    await expect(subFirstOption.locator('.tiny-checkbox')).toHaveClass(/is-checked/)
    // 选中第二个子列表项
    const subSecondOption = subOptions.nth(1)
    await subSecondOption.locator('.tiny-checkbox').click()

    // 展开第三个父列表
    const thirdOption = linkMenuList.nth(2).locator('.tiny-tree-node')
    await thirdOption.locator('.tiny-tree-node__content').click({ force: true })
    // 子列表应该可见
    await expect(thirdOption.locator('.tiny-tree-node__children')).toBeVisible()
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
})
