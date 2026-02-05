import { useQuery } from "@apollo/client/react"
import { FAVORITE_GENRE, FAVORITE_BOOKS } from "../queries"


const RecommendedBooks = ( {show} ) => {
    
    const favoriteGenreResult = useQuery(FAVORITE_GENRE, {
        skip: !show
    })

    const genre = favoriteGenreResult.data?.me.favoriteGenre

    const favoriteBooksResult = useQuery(FAVORITE_BOOKS, {
        variables: { genre: genre },
        skip: !show || !genre
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
                    {favoriteBooksResult.data?.allBooks.map((a) => (
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