import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

const ALL_AUTHORS = gql `
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`
const ALL_BOOKS = gql `
  query {
    allBooks {
      id
      title
      author{
        id
        name
      }
      published
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('user-token'))

  const authorsQueryResult = useQuery(ALL_AUTHORS)
  const booksQueryResult = useQuery(ALL_BOOKS)

  if(authorsQueryResult.loading || booksQueryResult.loading){
    return <div>Loading...</div>
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('login')} >Login</button>
      </div>

      <Authors show={page === 'authors'} authors={authorsQueryResult.data?.allAuthors || []} />

      <Books show={page === 'books'} books={booksQueryResult.data?.allBooks || []} />

      <NewBook show={page === 'add'} />

      <Login show={page === 'login'} setToken={setToken}/>
    </div>
    
  )
}

export default App
