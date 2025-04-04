import { useState,useEffect } from 'react';
import axios from 'axios';
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  },[]);

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


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} filterValue={filterValue}/>
      <h2>Add a new</h2>
      <PersonForm handleNameChange={handleNameChange} newName={newName} handlePhoneChange={handlePhoneChange} newPhone={newPhone} handleAddPerson={handleAddPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterValue={filterValue}/>
    </div>
  )
}

export default App