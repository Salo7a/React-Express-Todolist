const Todo = require('../models/TodoSchema');
const User = require('../models/UserSchema');
const {faker} = require('@faker-js/faker');
const randomstring = require("randomstring");

let SeedDB = async ()=>{
    try {
        let todos = []
        let user = User.findOne({id: "123"})
        let hashedPass = bcrypt.hashSync("password", 10)
        if(!user){
            user = await User.create({
            id: 123,
            email: "test@example.com",
            password: hashedPass,
            name: "John Doe",
        })
        }
        for (let i = 0; i<10; i++){
            let id = randomstring.generate(10);
            todos.push({
                id: id,
                UserId: 123,
                TaskName: `Meet ` + faker.name.firstName()
            })
        }
        
        await Todo.create(todos)
        console.log("Added 10 Todos")
        process.exit()
    } catch (e) {
        console.error(e);
        process.exit();
    }
}

SeedDB();


