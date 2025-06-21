import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterInput from './components/filterInput'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <FilterInput/>
      <AnecdoteForm/>
    </div>
  )
}

export default App