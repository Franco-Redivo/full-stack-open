const PersonForm = ({
    handleNameChange,
    handlePhoneChange,
    handleAddPerson,
    newName,
    newPhone
}) => {
    return(
        <form>
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
    );
}

export default PersonForm;