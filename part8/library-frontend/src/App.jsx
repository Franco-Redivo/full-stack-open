import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import { gql } from '@apollo/client'
import { useQuery, useApolloClient } from '@apollo/client/react'

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
  const [errorMessage, setErrorMessage] = useState(null)

  const authorsQueryResult = useQuery(ALL_AUTHORS)
  const booksQueryResult = useQuery(ALL_BOOKS)
  const client = useApolloClient

  if(authorsQueryResult.loading || booksQueryResult.loading){
    return <div>Loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const onLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  // if(!token) {
  //   return (
  //     <div>
  //       <Notify errorMessage={errorMessage}/>
  //       <h2>Login</h2>
  //       <LoginForm setToken={setToken} setError={notify}/>
  //     </div>
  //   )
  // }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? 
          <button onClick={() => setPage('login')} >Login</button>
          :
          <div>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={onLogout} >Logout</button>
          </div>
          
          
        }
        
      </div>

      <Authors show={page === 'authors'} token={token} setError={notify} authors={authorsQueryResult.data?.allAuthors || []} />

      <Books show={page === 'books'} books={booksQueryResult.data?.allBooks || []} />

      <NewBook show={page === 'add'} setError={notify} />

      <LoginForm show={page === 'login'} setError={notify} setToken={setToken} setPage={setPage}/>
    </div>
    
  )
}

export default App
