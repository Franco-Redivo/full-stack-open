const Persons = ({filterValue, persons, handleDelete}) => {

    const filteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(filterValue.toLowerCase())
      );
      
    return(
        <div>
            {(filterValue.trim() === '' 
                ? persons 
                : filteredPersons
            ).map(person => (
                <div key={person.name}>
                {person.name} {person.number}
                <button value={person.id} onClick={handleDelete}>delete</button>
                </div>
            ))}
        </div>
    );
}

export default Persons;