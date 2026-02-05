import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
      id
      title
      author {
        id
        name
      }
      published
      genres
    }
`

const AUTHOR_DETAILS = gql`
    fragment AuthorDetails on Author {
        name
        born
        bookCount
        id
    }
`

export const ALL_BOOKS = gql `
  query {
    allBooks {
      ...BookDetails
    }
  }
   
  ${BOOK_DETAILS}
`

export const ALL_GENRES = gql `
  query {
    allGenres
  }
`

export const GENRE_BOOKS = gql `
  query genreBooks($genre: String!) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  
  ${BOOK_DETAILS}

`

export const EDIT_BIRTHYEAR = gql `
  mutation editBirthyear (
    $name: String!,
    $setBornTo: Int!
    ) {
    editAuthor(
      name: $name
      setBornTo: $setBornTo
    ) {
        name
        born
        id
       }
    }
`

export const ALL_AUTHORS = gql `
    query {
        allAuthors {
            ...AuthorDetails
        }
    }

    ${AUTHOR_DETAILS}
`

export const LOGIN = gql `
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const CREATE_BOOK = gql`
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
            ...BookDetails
          }
      }

    ${BOOK_DETAILS}
`

export const FAVORITE_GENRE = gql `
  query favoriteGenre {
    me {
        favoriteGenre
    }
  }
`

export const FAVORITE_BOOKS = gql `
  query favoriteBooks($genre: String!) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }

    ${BOOK_DETAILS}
`