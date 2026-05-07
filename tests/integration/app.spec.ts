import { expect, test } from '@playwright/test'

test.describe('course app integration', () => {
  test('loads cover and starts course flow', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: /업무 자동화 & AI 활용/i })).toBeVisible()

    await page.getByRole('button', { name: '학습 시작하기 →' }).click()

    await expect(page.getByText('15 Chapters · Practical Python')).toBeVisible()
    await expect(page.locator('header .ch-badge')).toHaveText('1 / 15')
    await expect(page.locator('header .topbar-title')).toHaveText('🚀 시작하기')
  })

  test('navigates to next chapter and updates top badge', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: '학습 시작하기 →' }).click()
    await page.getByRole('button', { name: '다음 →' }).click()

    await expect(page.locator('header .ch-badge')).toHaveText('2 / 15')
    await expect(page.locator('header .topbar-title')).toHaveText('📁 파일 정리하기')
  })
})
