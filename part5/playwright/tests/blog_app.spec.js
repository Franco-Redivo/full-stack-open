const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, logInCreateBlogAndLogOut, logOut, likeBlog } = require('./helper')

describe('Blog app', ()=> {
    beforeEach(async({page, request}) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        })
        await request.post('/api/users', {
            data: {
                name: 'Luka Modric',
                username: 'luka10',
                password: 'lm10'
            }
        })
        await page.goto('/')
        
    })

    test('Login form is shown', async ({ page }) => {
        await page.getByRole('button', {name: 'login'}).click()
        const locator = await page.getByText('Log in to application')
        await expect(locator).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page}) => {
            await loginWith(page, 'mluukkai', 'salainen')
            await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({page}) => {
            await loginWith(page, 'mluukkai', 'wrong')
            const errorDiv = await page.locator('.error')
            await expect(errorDiv).toContainText('Wrong credentials')

        })
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await logInCreateBlogAndLogOut(page,'luka10','lm10','lukas blog','luka10','www.lukasblog.com')
            await loginWith(page, 'mluukkai', 'salainen')
        })

        test('a new blog can be created', async ({page}) => {
            await createBlog(page,'playwright','mluukkai','www.test.com')
            await expect(page.getByText('a new blog "playwright" by mluukkai added')).toBeVisible()
        })

        test('a blog can be liked', async ({page}) =>{
            await createBlog(page,'test blog','mluukkai','www.testing.com')
            await likeBlog(page,'test blog')
            
            const blogs = await page.locator('.blog')
            const blog = blogs.nth(0) 
            await expect(blog.getByTestId('like')).toHaveText('1')
            
        })

        test('a blog can be deleted by author', async ({page}) =>{
            await createBlog(page,'delete this','mluukkai','www.deleted.com')
            const blogElement = await page.getByRole('heading', { name: /delete this/i }).locator('..')
            
            await blogElement.getByRole('button', {name: 'view'}).click()

            page.on('dialog', dialog => dialog.accept())
            await blogElement.getByRole('button', {name: 'remove'}).click()

            await expect(page.getByText('Blog "delete this" removed')).toBeVisible()
            
        })

        test("only the user who added the blog can see the blog's delete button", async ({page}) => {
            const blogText = await page.getByText('lukas blog')
            const blogElement = await blogText.locator('..')

            await blogElement.getByRole('button', {name: 'view'}).click()

            await expect(blogElement.getByRole('button', {name: 'remove'})).not.toBeVisible()
        })

        describe('and several blogs exist', () =>{
            beforeEach(async ({ page }) => {
                await createBlog(page,'blog1','mluukkai','www.blog1.com')
                await createBlog(page,'blog2','mluukkai','www.blog2.com')
                await createBlog(page,'blog3','mluukkai','www.blog3.com')
                await likeBlog(page,'blog3')

            })

            test('blogs are arranged based on amount of likes', async ({page}) => {

                const blogs = await page.locator('.blog') 
                const firstBlogTitle = await blogs.nth(0).getByRole('heading').textContent()

                expect(firstBlogTitle).toContain('blog3')

            })
        })
        
    })

})