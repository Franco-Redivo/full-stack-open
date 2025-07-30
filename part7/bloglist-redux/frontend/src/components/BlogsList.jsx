import { useDispatch, useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import { useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'

const BlogsList = () => {
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    
    const blogFormRef = useRef()

    return(
        <div>
            { user && (
                <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm/>
            </Togglable>
            )}

            <Table striped className='mt-3'>
                <tbody>
                    {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
                        <tr key={blog.id}>
                            <td>
                                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                            </td>
                            <td>
                                {blog.author}
                            </td>
                        </tr>
                    )}

                </tbody>
            </Table>
        </div>
    )
}

export default BlogsList