import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '74721862' }
  ]) 
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleAddPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newPhone
    }
    if(newName === '' || newPhone === ''){
      alert("missing value");
    }else{
      const array = persons.filter(person => person.name === newName);
      (array.length > 0) ? alert(`${newName} is already added to phonebook`)  : setPersons(persons.concat(newPerson));  
      setNewName('');
      setNewPhone('');
    } 
  }

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  }

  const handleFilter = (e) => {
    setFilterValue(e.target.value);
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input type='text' onChange={handleFilter} value={filterValue}></input>
      </div>
      <form>
        <h2>Add a new</h2>
        <div>
          name: <input type='text' onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          number: <input type='text' onChange={handlePhoneChange} value={newPhone}></input>
        </div>
        <div>
          <button type="submit" onClick={handleAddPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {(filterValue.trim() === '' 
        ? persons 
        : filteredPersons
      ).map(person => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  )
}

export default App