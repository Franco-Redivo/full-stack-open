import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import RecommendedBooks from './components/RecommendedBooks'
import LoginForm from './components/LoginForm'
import { gql } from '@apollo/client'
import { useQuery, useApolloClient } from '@apollo/client/react'
import './App.css'

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

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const [errorMessage, setErrorMessage] = useState(null)

  const authorsQueryResult = useQuery(ALL_AUTHORS)
  const client = useApolloClient()

  if(authorsQueryResult.loading) {
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
    <div className='app-wrapper'>
      <div className='nav-bar'>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        {!token ? 
          <button onClick={() => setPage('login')} >Login</button>
          :
          <div className='nav-bar'>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={onLogout} >Logout</button>
          </div>
          
        }
        
      </div>
      <Notify errorMessage={errorMessage} />

      <Authors show={page === 'authors'} token={token} setError={notify} authors={authorsQueryResult.data?.allAuthors || []} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setError={notify} />

      <LoginForm show={page === 'login'} setError={notify} setToken={setToken} setPage={setPage}/>

      <RecommendedBooks show={page === 'recommended'} />
    </div>
    
  )
}

export default App
