const loginWith = async (page, usename, password) => {
    await page.getByRole('button', {name: 'login'}).click()
    await page.getByTestId('username').fill(usename)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', {name: 'login'}).click()
}

const createBlog = async(page, title, author, url) => {
    await page.getByRole('button', {name: 'new blog'}).click()
    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(url)
    await page.getByRole('button', {name: 'create'}).click()
    
}

const logOut = async(page) => {
    await page.getByRole('button', {name: 'logout'}).click()
}

const logInCreateBlogAndLogOut = async(page, username,password, title, author, url) => {
    await loginWith(page,username,password)
    await createBlog(page,title,author,url)
    await logOut(page)
}

const likeBlog = async(page,title) => {
    const blogElement = await page.getByRole('heading', { name: title}).locator('..')
            
    await blogElement.getByRole('button', {name: 'view'}).click()

    await blogElement.getByRole('button', {name: 'like'}).click()

    await page.waitForTimeout(200)
}

export { loginWith, createBlog, logOut, logInCreateBlogAndLogOut, likeBlog}