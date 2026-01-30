import { useState } from "react"
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";


const EDIT_BIRTHYEAR = gql `
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

const ALL_AUTHORS = gql `
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`

const Authors = ({show, authors, setError, token}) => {
  const [ name, setName ] = useState('');
  const [ born, setBorn ] = useState('');
  const [editBirthyear] = useMutation(EDIT_BIRTHYEAR, {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS}, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.concat(response.data.editBirthyear)
        }
      })
    },
  })

  const submit = async (event) => {
    event.preventDefault()

    try{
      await editBirthyear({variables: {name, setBornTo: parseInt(born)}})

    }catch(error){
      setError(error.message)
    }


    // setName('')
    setBorn('')
  }

  if (!show) {
    return null
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
        {token != null && (
        <div>
          <h3>Set Birthyear</h3>
          <form onSubmit={submit}>
              <div>
                  name
                  <select name="selectedAuthors" onChange={({ target }) => setName(target.value)}>
                      {authors.map((a) => (
                          <option key={a.id} value={a.name}>{a.name}</option>
                      ))}
                  </select>
              </div>
              <div>
                  born
                  <input
                      type= "number"
                      value={born}
                      onChange={({ target }) => setBorn(target.value)}
                  />
              </div>
              <button type="submit">update author</button>
          </form>
        </div>
        )
        }

        
    </div>
  )
}

export default Authors