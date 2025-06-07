import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('should call event handler with rigth details when new blog is created', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()
    
     const component = render(<BlogForm createBlog={createBlog} />)
    
    const titleInput = component.container.querySelector('.title')
    const authorInput = component.container.querySelector('.author')
    const urlInput = component.container.querySelector('.url')
    const submitButton = screen.getByText('create')
    
    await user.type(titleInput, 'New Blog Title')
    await user.type(authorInput, 'New Blog Author')
    await user.type(urlInput, 'http://newblogurl.com')
    await user.click(submitButton)
    
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
        title: 'New Blog Title',
        author: 'New Blog Author',
        url: 'http://newblogurl.com'
    })
})