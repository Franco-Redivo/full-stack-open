import { useState } from 'react'
import { gql } from '@apollo/client'
import { useMutation, useQuery } from '@apollo/client/react'

const CREATE_BOOK = gql`
    mutation createBook(
        $title: String!,
        $author: String!,
        $published: Int!,
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        )  {
                title
                author{
                  id
                  name
                }
                published
                id
                genres
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
const ALL_AUTHORS = gql `
    query {
        allAuthors {
            name
            id
        }
    }
`

const ALL_GENRES = gql `
  query {
    allGenres
  }
`

const FAVORITE_GENRE = gql `
  query favoriteGenre {
    me {
        favoriteGenre
    }
  }
`

const FAVORITE_BOOKS = gql `
  query favoriteBooks($genre: String!) {
    allBooks(genre: $genre) {
      id
      title
      author {
        id
        name
      }
      published
      genres
    }
  }
`

const NewBook = ({show, setError}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const favoriteGenreResult = useQuery(FAVORITE_GENRE, {
    skip: !show
  })

  const favoriteGenre = favoriteGenreResult.data?.me?.favoriteGenre

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: () => {
      const queries = [
        { query: ALL_BOOKS },
        { query: ALL_AUTHORS },
        { query: ALL_GENRES }
      ]

      if (favoriteGenre) {
        queries.push({
          query: FAVORITE_BOOKS,
          variables: { genre: favoriteGenre }
        })
      }

      return queries
    }
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    try{
      await createBook({ variables: {title, author, published: parseInt(published), genres}})
      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
    }catch (error) {
      setError(error.message)
    }
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook