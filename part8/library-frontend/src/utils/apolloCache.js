import { ALL_BOOKS } from "../queries";

export const addBookToCache = (cache, bookToAdd) => {
    cache.updateQuery({ query: ALL_BOOKS}, (data) => {
        if (!data?.allBooks) {
            return { allBooks: [bookToAdd] }
        }

        const bookExists = data.allBooks.some(
            book => book.id === bookToAdd.id
        )

        if(bookExists) {
            return { allBooks: data.allBooks }
        }

        return {
            allBooks: data.allBooks.concat(bookToAdd),
        }
    })
}