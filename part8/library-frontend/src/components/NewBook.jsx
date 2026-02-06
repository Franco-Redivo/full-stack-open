import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client/react'
import { FAVORITE_GENRE, FAVORITE_BOOKS, ALL_GENRES, ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries'
import { addBookToCache } from '../utils/apolloCache'

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
    onError: (error) => setError(error.message),
    update: (cache, response) => {
      const addedBook = response.data.addBook
      addBookToCache(cache, addedBook)

      cache.updateQuery({ query: ALL_AUTHORS}, (data) => {
        if (!data?.allAuthors) {
          return { allAuthors: [addedBook.author] }
        }

        const authorExists = data.allAuthors.some(
          author => author.name === addedBook.author.name
        )

        if(authorExists) {
          return { allAuthors: data.allAuthors }
        }

        return {
          allAuthors: data.allAuthors.concat(addedBook.author),
        }
      })

      cache.updateQuery({ query: ALL_GENRES}, (data) => {
        if (!data?.allGenres) {
          return { allGenres: addedBook.genres }
        }

        const genresToAdd = addedBook.genres.filter(
          genre => !data.allGenres.includes(genre)
        )

        if(genresToAdd.length === 0) {
          return { allGenres: data.allGenres }
        }

        return {
          allGenres: data.allGenres.concat(genresToAdd),
        }
      })

      if (favoriteGenre) {
        cache.updateQuery(
          { query: FAVORITE_BOOKS, variables: { genre: favoriteGenre } },
          (data) => {
            if (!data?.favoriteBooks) {
              if (addedBook.genres.includes(favoriteGenre)) {
                return { favoriteBooks: [addedBook] }
              }

              return data
            }

            if (addedBook.genres.includes(favoriteGenre)) {
              return {
                favoriteBooks: data.favoriteBooks.concat(addedBook),
              }
            } else {
              return { favoriteBooks: data.favoriteBooks }
            }
          }
        )
      }
    }

    // refetchQueries: () => {
    //   const queries = [
    //     { query: ALL_BOOKS },
    //     { query: ALL_AUTHORS },
    //     { query: ALL_GENRES }
    //   ]

    //   if (favoriteGenre) {
    //     queries.push({
    //       query: FAVORITE_BOOKS,
    //       variables: { genre: favoriteGenre }
    //     })
    //   }

    //   return queries
    // }
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