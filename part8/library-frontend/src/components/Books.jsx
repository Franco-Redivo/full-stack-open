import { gql } from "@apollo/client"
import { useState } from "react"
import { useQuery } from "@apollo/client/react"

const ALL_GENRES = gql `
  query {
    allGenres
  }
`

const Books = ( {show, books } ) => {
  const [genre, setGenre] = useState('all genres')

  const genresResult = useQuery(ALL_GENRES)

  if (!show) {
    return null
  }


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
            genre === 'all genres' || a.genres.includes(genre) ? (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author?.name}</td>
                <td>{a.published}</td>
              </tr>
            ) : null
          ))}
        </tbody>
      </table>
      <div>
        {genresResult.data.allGenres.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>{g}</button>
        ))}
        <button onClick={() => setGenre('all genres')}>all genres</button>
      </div>
    </div>
  )
}

export default Books