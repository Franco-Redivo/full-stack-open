import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"

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

const RecommendedBooks = ( {show} ) => {
    
    const favoriteGenreResult = useQuery(FAVORITE_GENRE)

    const genre = favoriteGenreResult.data?.me.favoriteGenre

    const favoriteBooksResult = useQuery(FAVORITE_BOOKS, {
        variables: { genre: genre },
    })

    if (!show) {
        return null
    }

    if (favoriteBooksResult.loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>recommended books</h2>
            <p>books in your favorite genre <strong>{genre}</strong></p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {favoriteBooksResult.data.allBooks.map((a) => (
                        <tr key={a.id}>
                            <td>{a.title}</td>
                            <td>{a.author?.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RecommendedBooks