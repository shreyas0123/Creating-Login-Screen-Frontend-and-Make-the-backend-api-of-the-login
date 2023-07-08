const signUpUserDetails = require('../models/signup');

//for eg if we keep email column in form as blank and if i submit data will not be added to the database table (remove required text from signup.html page then only it works)
/*
function isstringvalid(string){
    if(string === undefined || string.length === 0){
        return true;
    }else{
        return false;
    }
} */

//Sign Up page:
exports.adduserDB = async (req,res,next) =>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        console.log('from req.body>>>',name,email,password);

        /*
        if(isstringvalid(name) || isstringvalid(email) || isstringvalid(password)){
            return res.status(400).json({success:false,message:'please fill all the details of the form'});
        } */
        //for eg if we keep email column in form as blank and if i submit data will not be added to the database table (remove required text from signup.html page then only it works)
        if(name ==="" || email ==="" || password === ""){
            return res.status(400).json({success:false,message:"please fill all the details of the form"});
        }

        //when executing this code, it will search the signUpUserDetails table for any records where the email column matches the email value you provided.
        //The result, stored in the uniqueEmail variable, will be an array of objects representing the matching user details.
        //You can then check the length of the uniqueEmail array to determine if a user with the provided email already exists in the database.
        //If the length is not zero, it indicates that there is a matching record, meaning the email is already taken.

        //if user trying to add existing mail id sending error from backend
        const uniqueEmail = await signUpUserDetails.findAll({where:{email:email}});
        //it will find wheather the entered mail id matches with existing mail id
        if(uniqueEmail.length !== 0){
            //if email id matches we comes to know that 
            return res.status(400).json({success:false,message:'user already exist,change the Email'})
        }
        /* 
        else if(uniqueEmail.length === 0){
        const data = await signUpUserDetails.create({
            name:name,
            email:email,
            password:password
        });
        
        
        res.json({success:true,message:'Signup succesfull,login to enter a page'});
        }
        */

        const data = await signUpUserDetails.create({
            name:name,
            email:email,
            password:password
        });
        
        
        res.json({success:true,message:'Signup succesfull,login to enter a page'});
    }catch(error){
        console.log('error from adduserdb',error);
        res.json({success:false,message:'user already exist..please signup with new email'});
    }
}

//login page
exports.login = async (req,res) =>{
    try{

        const email = req.body.email;
        const password = req.body.password;

        if(email.length === 0 || password.length === 0){
            res.status(400).json({success:false,message:'email or password is missing'})
        }
        //find wheather entered email matches with existing email in database
        //matched email is stored in uniqEmail
        //then compare matched email password from databse with entered password
        //if matches then user logged in succesfully
        //if password does not match then incorrect password
        //if email length ===0 then user does not exist
        const uniqEmail = signUpUserDetails.findAll({where:{email:email}})
        if(uniqEmail.length !==0){
            if(uniqEmail[0].password === password){
                res.status(200).json({success:true,message:'user logged in succesfully'})
            }else{
                res.status(400).json({success:false,message:'incorrect password'})
            }
        }else{
            res.status(400).json({success:false,message:'user does not exist'})
        }
    }catch(error){
        console.log('error from login page',error);
    }
}