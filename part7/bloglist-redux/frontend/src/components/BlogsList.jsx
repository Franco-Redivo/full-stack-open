import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'

const BlogsList = () => {
    const blogs = useSelector(state => state.blogs)
    
    const blogFormRef = useRef()

    return(
        <div>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm/>
            </Togglable>
        
            {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
                <li key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </li>
            )}
        </div>
    )
}

export default BlogsList