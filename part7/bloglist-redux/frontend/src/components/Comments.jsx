import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notoficationReducer'
import { createComment, fetchComments } from '../reducers/commentReducer'
import { useEffect } from 'react'
import { useField } from '../hooks/index'


const Comments = ({ blogId }) => {
    const dispatch = useDispatch()
    const comments = useSelector((state) => state.comments) || []
    const { onReset: commentReset, ...commentField } = useField('text')

    const handleCommentSubmit = async (event) => {
        event.preventDefault()
        if (commentField.value.trim()) {
            try {
                dispatch(createComment(blogId, { content: commentField.value }))
                dispatch(setNotification(`Comment added: ${commentField.value}`, 5))
                commentReset()
            } catch (error) {
                console.error('Error adding comment:', error)
                dispatch(setNotification(`Error adding comment: ${error.message}`, 5))
            }
        }
    }

    useEffect(() => {
        dispatch(fetchComments(blogId))
    }, [dispatch, blogId])

    return (
        <div>
            <h2>Comments</h2>
            <ul>
                {comments.map((comment) => (
                    <li key={comment._id || comment.id}>{comment.content}</li>
                ))}
            </ul>
            <form onSubmit={handleCommentSubmit}>
                <input
                    placeholder="Add a comment"
                    name="comment"
                    {...commentField}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Comments