import { useState } from "react"
import { useQuery } from "@apollo/client/react"
import { ALL_GENRES, ALL_BOOKS, GENRE_BOOKS } from "../queries"


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