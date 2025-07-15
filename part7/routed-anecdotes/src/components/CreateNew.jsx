import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useField } from "../hooks/index"

const CreateNew = (props) => {
  const {onReset: contentReset,...content} = useField('text')
  const {onReset: authorReset,...author} = useField('text')
  const {onReset: infoReset,...info} = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
    props.setNotification(`A new anecdote ${content.value} created successfully!`)
  }

  const handleReset = (e) => {
    e.preventDefault()
    contentReset()
    authorReset()
    infoReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input name='content' {...content}/>
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew