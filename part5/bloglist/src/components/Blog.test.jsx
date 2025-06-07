import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

let component

const blog = {
    title: 'test title',
    author: 'test author',
    url: 'http://testurl.com',
    likes: 0,
    user: {
        username: 'testuser',
        name: 'Test User'
    }
}

const user = {
    username: 'testuser',
    name: 'Test User'
}

const updateLikes = vi.fn()
const removeBlog = vi.fn()

beforeEach(() => {
    component = render(<Blog blog={blog} handleLike={updateLikes} handleRemove={removeBlog} user={user}/>)
})


test('renders title and author but not url and likes', () => {
    
    const titleElement = screen.getByText('test title')
    const authorElement = screen.getByText('test author')
    const urlElement = screen.queryByText('http://testurl.com')
    const likesElement = screen.queryByText(/0/)
    expect(titleElement).toBeVisible()
    expect(authorElement).toBeVisible()
    expect(urlElement).not.toBeVisible()
    expect(likesElement).not.toBeVisible()
})

test('should show url, number of likes and user when view button is clicked', async () => {
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  expect(screen.getByText(blog.url)).toBeInTheDocument()
  expect(screen.getByText(String(blog.likes))).toBeInTheDocument()
  expect(screen.getByText(blog.author)).toBeInTheDocument()
})

test('clicking like button twice calls event handler twice', async () => {
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(updateLikes.mock.calls).toHaveLength(2)
})