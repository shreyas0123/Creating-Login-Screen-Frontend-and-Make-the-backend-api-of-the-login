const alldetails = require('../models/define');

//adding new record into a database table using add method
//first step:
//how we can add means we need to first get the values of form fields like name,email,phone (req.body holds all these variables)
//we we make an http request(means when we click on submit button) forms fileds like expens,descript,categ values stored in an request.body


exports.addexpense = async(req,res,next) =>{
    try{
        const expens = req.body.expens;
        const descript = req.body.descript;
        const categ = req.body.categ;
        console.log('from req.body>>>>>',expens,descript,categ);

//second step:
//Use the addexpense.create() method to create a new addexpense record in the database with the extracted values.
//Await the completion of the create() method and assign the result to the data variable

        const data = await alldetails.create({
            expens:expens,
            descript:descript,
            categ:categ
        })
        res.json({expensedata:data});
        console.log('res from addexpense method',data);
    } catch(error){
        res.json({Error:error});
        console.log('error from addexpense method',error);
    }
}

//1st step
// the code calls user.findAll() to retrieve data. 
//It assumes that there is a user model or database table defined and connected.

//2nd step:
//The retrieved data is then transformed using the map method. 
//For each user object, a new object is created with additional properties, 
//including an _id property that corresponds to the id property of the original user object.
//The transformed data is stored in the modifiedData variable.

//3rd step:
//Finally, the res.json() method is used to send a JSON response back to the client. 
//It sends an object with a property named alluser, which contains the modifiedData array.

exports.getexpense = async (req,res) =>{
    try{
        const data = await alldetails.findAll();
        res.json({getexpense:data});
        console.log('res from getexpense method',data);
    }catch(error){
        console.log('error from getexpense method',error);
    }
}


exports.deleteexpense = async (req,res) =>{
    try{
        console.log('params id',req.params.id);
        if(!req.params.id){
            throw new error('id is mandatory to delete');
        }
        const detailsId = req.params.id;
        const data  = await alldetails.destroy({where:{id:detailsId}});
        res.json({deleted:data});
    }catch(error){
        res.json({Error:error});
        console.log('error from delete expense method',error);
    }
}

exports.editexpense = async (req,res) =>{
    try{
        console.log('params id',req.params.id);
        if(!req.params.id){
            throw new error('id is mandatory to delete');
        }
        const detailsId = req.params.id;
        const data  = await alldetails.destroy({where:{id:detailsId}});
        res.json({deleted:data});
    }catch(error){
        res.json({Error:error});
        console.log('error from delete expense method',error);
    }
}