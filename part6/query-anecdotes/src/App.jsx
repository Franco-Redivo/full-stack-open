import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateVote } from './services/anecdotes'
import { useNotificationHandler } from './context/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const notificationHandler = useNotificationHandler()

  const updateVoteMutation = useMutation({
    mutationFn: updateVote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['anecdotes']})
      
    },
  })

  const handleVote = (anecdote) => {
    updateVoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationHandler({content: `anecdote "${anecdote.content}" voted`})
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry:1,
    refetchOnWindowFocus:false
  })

  if(result.isLoading){
    return <span>Loading...</span>
  }
  if(result.isError){
    return <span>anecdote service not available due to problems in server</span>
  }


  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
