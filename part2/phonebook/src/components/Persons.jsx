const Persons = ({filterValue, persons}) => {

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
                </div>
            ))}
        </div>
    );
}

export default Persons;