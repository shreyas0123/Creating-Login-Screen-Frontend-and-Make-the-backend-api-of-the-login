const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const signUpUserDetails = sequelize.define('users',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

async function createUsersTable(){
    try{
        const data = await signUpUserDetails.sync() //{force:true}
        console.log('table called users created successfully on database table');
    }catch(error){
        console.log('error while creating users table on database table',error);
    }
}

createUsersTable();

module.exports = signUpUserDetails;