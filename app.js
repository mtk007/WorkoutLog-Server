require('dotenv').config();
const Express = require('express');
const app = Express();
app.use(Express.json());
const dbConnection = require('./db');
const controllers = require('./controllers');
const middleware = require('./middleware');

//app.use(Express.static(__dirname +'/public'))
// console.log(__dirname);
// app.get('/', (req,res) => res.render('index'));
// app.get('/log', (req, res) => res.send('I love working out!'));

app.use(middleware.headers);
app.use('/user', controllers.usercontroller);
app.use('/log', controllers.workoutcontroller);

//app.use('/log', middleware.validateSession, controllers.workoutcontroller);  // validates ALL routes within the workout controller

dbConnection.authenticate()
    .then(()    => dbConnection.sync())
    .then(()    => {
        app.listen(3000, () => {
            console.log('[server]: app is hinging on your every word on port 3000.');
        });
    })
.catch((err)    =>{
    console.log(`[server]: Server crashed and implores you to figure out its existential issues. Err = ${err}`);
}); 