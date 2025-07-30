import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notoficationReducer'
import { createComment, fetchComments } from '../reducers/commentReducer'
import { useEffect } from 'react'
import { useField } from '../hooks/index'
import { Button, Form, ListGroup } from 'react-bootstrap'


const Comments = ({ blogId }) => {
    const dispatch = useDispatch()
    const comments = useSelector((state) => state.comments) || []
    const { onReset: commentReset, ...commentField } = useField('text')

    const handleCommentSubmit = async (event) => {
        event.preventDefault()
        if (commentField.value.trim()) {
            try {
                dispatch(createComment(blogId, { content: commentField.value }))
                dispatch(setNotification({ content: `Comment added: ${commentField.value}`, style: 'success' }, 5))
                commentReset()
            } catch (error) {
                console.error('Error adding comment:', error)
                dispatch(setNotification({ content: `Error adding comment: ${error.message}`, style: 'danger' }, 5))
            }
        }
    }

    useEffect(() => {
        dispatch(fetchComments(blogId))
    }, [dispatch, blogId])

    return (
        <div className="mt-3">
            <h3>Comments</h3>
            <ListGroup>
                {comments.map((comment) => (
                    <ListGroup.Item className="list-group-item-dark" key={comment._id || comment.id}>{`"${comment.content}"`}</ListGroup.Item>
                ))}
            </ListGroup>
            <Form className='mt-3' onSubmit={handleCommentSubmit}>
                <Form.Group>
                    <Form.Control
                        placeholder="Add a comment"
                        name="comment"
                        {...commentField}
                    />
                </Form.Group>
                <Button className='mt-2' type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default Comments