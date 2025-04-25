const mongoose = require('mongoose');



if (process.argv.length < 3) {
  console.log('give password as argument');;
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.8tvxr1i.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery',false);

mongoose.connect(url);

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model('Contact', phoneSchema);

if(process.argv.length > 3){
    const name = process.argv[3];
    const number = process.argv[4];
    
    const contact = new Contact({
      name: name,
      number: number,
    });
    
    contact.save().then(result => {
      console.log('contact saved!');
      mongoose.connection.close();
    });

}

if(process.argv.length == 3){
    Contact.find({}).then(result => {
        result.forEach(contact => {
            console.log(contact.name, contact.number);
        });
        mongoose.connection.close();
    });
}