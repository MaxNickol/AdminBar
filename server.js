const express = require('express');
const http = require('http');
const db = require('./models');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('./config/keys');
const errHandler = require('./utils/errorHandler');
const path = require('path');

const app = express();

const port = process.env.PORT || 5000;

const server = http.createServer(app);

const onListener = () => {
    const addr = server.address();
    const listener =`Listening on ${addr.port}`;
    console.log(listener);
}

server.on('listening', onListener);
//Set middlewares to parse the POST requests
app.use(cors());
app.use('*', cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());




//Synchronizing the sequelize with DB, if synchronized listen to the server;
db.sequelize.sync().then(() => {
    server.listen(port);
}).catch(err => console.log(err));



if(process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'));

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Make all the routes and logics with interaction with db
//Authorization and registration
app.post('/auth/register', async (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const name = req.body.name.trim();
    const email = req.body.email;
    const blocked = req.body.blocked;


    const candidate = await db.users.findOne({where:{email:email}});

    //checks if  the user exists
    if(candidate) {
        console.log(candidate.username);
        res.status(400).json({message:"The user with this email already exists"});
    }
    //If not, creates it
    else {
        console.log(`Username: ${username}, name: ${name}, password: ${password}`)
        if(name == '' || password == '' || username == '') { 
            res.status(400).json({message:"All the fileds are required!"});
        }
        else {
            try{
                const salt = bcrypt.genSaltSync(10);
    
                const user = await db.users.create({
                    username: username,
                    password: bcrypt.hashSync(password, salt),
                    name: name,
                    email: email,
                    blocked: blocked,
                    registrDate: new Date(),
                    lastOnline: 0,
                })
                res.status(201).json({message:'User created!', user: user})
            }
            catch(e) {
                res.status(500).json({message:'Email should be real(contains .com/ru/any)'})
            }
        }
    }

});

app.post('/auth/login', async (req, res) => {
    const candidate = await db.users.findOne({where:{
        email: req.body.email
    }})

    if(candidate) { 
        //checks the password
        const comparedPassword = bcrypt.compareSync(req.body.password, candidate.password);
        if(comparedPassword) {
            //generates the token as if passwords are equal
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate.id,
            }, key.jwt, {expiresIn: 60*60})
            
            if(!candidate.blocked) { 
                
                db.users.update({lastOnline: new Date()},{where: {email: candidate.email}});

                res.status(200).json({token: `Bearer ${token}`, userId: candidate.id})
            }
            else { 
                res.status(200).json({message: 'Your are blocked!'})
            }

            
        }
        else {
            res.status(401).json({message:'Invalid password'})
        }
    } else {
        //
        res.status(404).json({message:"No such user with this email!"})
    }
});

//Gets the whole list of users
app.get('/users', async (req, res) => {
    try{
        const usersList = await db.users.findAll()
        res.status(200).json(usersList)
    }
    catch(e){
        errHandler(res, e);
    }
})

//Gets the particular user
app.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    const user = await db.users.findOne({where:{id:id}})
    try{ 
        res.status(200).json(user)
    }
    catch(e) {
        errHandler(res, e)
    }
})

//Blocks the specified users
app.post('/users/block', async (req, res) => {
    
    const ids = req.body.ids;
    
    try { 
        for (const user_id of ids) {
            console.log(user_id)
            await db.users.update({
                blocked: 1
            },
            {
                where: {id: user_id}
            })
        }
        res.status(200).json({message:'Users have been blocked.'})
    }
    catch(err) { 
        res.status(500).json({err: err})
    }
    
})

//unblocks the users
app.post('/users/unblock', async (req, res) => {
    
    const ids = req.body.ids;
    
    try { 
        for (const user_id of ids) {
            console.log(user_id)
            await db.users.update({
                blocked: 0
            },
            {
                where: {id: user_id}
            })
        }
        res.status(200).json({message:'Users have been unbanned.'})
    }
    catch(err) { 
        res.status(500).json({err: err})
    }
    
})

//Deletes the users or user
app.post('/users/delete', async (req, res) => { 
    
    //requires the body array-like {ids: [1,2,3,4]};
    const ids = req.body.ids
    if(ids.length === 0) { 
        res.status(500).json({message:'Error occured'})
    }
    
    try { 
        for (let user_id of ids) {
            const foundUser = await db.users.findOne({where:{id:user_id}})

            if(foundUser == null) { 
                res.json({message:'Some id is not in the db'})
            }
            else {
                await db.users.destroy({where:{id: foundUser.id}})
            }
        }
    
        res.status(200).json({message:'Success deletion'})
    }
    catch(e) { 
        res.status(500).json({message:e.message})
    }

})

