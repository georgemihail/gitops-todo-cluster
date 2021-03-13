const { Sequelize, DataTypes } = require('sequelize');

// Database setup
// Make connection
const user = process.env.USERNAME || 'postgres'
const password = process.env.PASSWORD || 'mysecretpassword'
const host = process.env.HOST || 'localhost:5432'
const db = process.env.DATABASE || 'postgres'
console.log(`connect with db: '${db}' and user: '${user}' at host: ${host}`)

const sequelize = new Sequelize(`postgres://${user}:${password}@${host}/${db}`)

// Authenticate
const auth = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
auth()

// Make schema
const Todo = sequelize.define('todo', {
    text: {
        type: DataTypes.TEXT
    },
    done: {
        type: DataTypes.BOOLEAN
    }
})

sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`);
});

module.exports = {
    Todo
}