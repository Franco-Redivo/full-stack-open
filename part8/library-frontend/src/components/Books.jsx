import { gql } from "@apollo/client"
import { useState } from "react"
import { useQuery } from "@apollo/client/react"

const ALL_GENRES = gql `
  query {
    allGenres
  }
`

const GENRE_BOOKS = gql `
  query genreBooks($genre: String!) {
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
      genres
    }
  }
`

const Books = ( {show} ) => {
  const [genre, setGenre] = useState(null)

  const genresResult = useQuery(ALL_GENRES)
  const allBooksResult = useQuery(ALL_BOOKS, {
    skip: genre !== null
  })
  const genreBooksResult = useQuery(GENRE_BOOKS, {
    variables: { genre },
    skip: genre === null
  })
  
  const booksResult = genre === null ? allBooksResult : genreBooksResult

  if (genresResult.loading || booksResult.loading) {
    return <div>Loading...</div>
  }

  if (booksResult.error) {
    return <div>Error loading books</div>
  }

  if (!show) {
    return null
  }

  const books = booksResult.data?.allBooks || []

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author?.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genresResult.data?.allGenres.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>{g}</button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books