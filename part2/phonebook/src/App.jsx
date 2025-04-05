import { useState,useEffect } from 'react';
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import contactService from "./services/contacts.js";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [notification, setNotification] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts);
      });
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
      const existingContact = persons.find(p => p.name === newName);
      const array = persons.filter(person => person.name === newName);
      console.log(existingContact);
      if(array.length > 0){
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          contactService
          .update(existingContact.id,newPerson)
          .then(returnedContact => {
            setPersons(persons.filter(contact => contact.id !== existingContact.id).concat(returnedContact));
          })
          .catch(error => {
            setNotification(`Information of ${newName} has already been removed from server`);
            setMessageType('error');
            setTimeout(() => {
              setNotification(null);
              setMessageType(null);
            },5000);
          })
          setNotification(`${newName}'s number updated`);
          setMessageType('message');
          setTimeout(() =>{
            setNotification(null);
            setMessageType(null);
          },5000);
        }
      }else{
        contactService
          .create(newPerson)
          .then(returnedContact => {
            setPersons(persons.concat(returnedContact))
          });
        setNotification(`Added ${newName}`);
        setMessageType('message');
        setTimeout(() =>{
          setNotification(null);
          setMessageType(null);
        },5000);   
      } 
      
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

  const handleDelete = (e) => {
    const contact = persons.find(c => c.id === e.target.value);
    if(window.confirm(`Delete ${contact.name} ?`)){
      contactService
        .deleteContact(e.target.value)
        .then(deletedContact => {
          setPersons(persons.filter(p => p.id !== deletedContact.id))
        });
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} messageType={messageType}/>
      <Filter handleFilter={handleFilter} filterValue={filterValue}/>
      <h2>Add a new</h2>
      <PersonForm handleNameChange={handleNameChange} newName={newName} handlePhoneChange={handlePhoneChange} newPhone={newPhone} handleAddPerson={handleAddPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterValue={filterValue} handleDelete={handleDelete}/>
    </div>
  )
}

export default App