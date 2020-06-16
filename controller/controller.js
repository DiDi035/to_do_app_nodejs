import * as middlewares from '../config/middlewares/middlewares';
import {userModel} from "../config/database/collections/users/model";
import {itemModel} from "../config/database/collections/items/model";
import mongoose from "mongoose";

module.exports = function(app, currUser) {

    middlewares.configMiddlewares(app);

    // GET request
    app.get('/sign-up', function(req, res) {
        res.render('signUp');
    });

    app.get('/login', function(req, res) {
        res.render('login');
    });

    app.get('/lisu-to-do-app/:curUser', function(req, res) {
        userModel.findOne({userName: req.params.curUser}).then( result => {
            if (result.userName === req.params.curUser) {
                currUser = req.params.curUser;
                res.render('mainTheme', {todo: result.toDoList});
            } else {
                console.log('404: user not found');
            }
        })
    })


    // POST request
    app.post('/redirect-to-sign-up', (req, res) => {
        res.json({redirect: 'http://localhost:3000/sign-up'});
    })

    app.post('/save-new-item', middlewares.urlencodedParser, function(req, res) {
        if (currUser != ' ') {
            userModel.findOne({userName: currUser}).then( result => {
                if (result.userName === currUser) {
                    result.toDoList.push(req.body);
                    result.save().then(() => {
                        res.end();
                    })
                } else {
                    console.log('404: user not found');
                }
            })
        } else {
            console.log('404: user not found');
        }
        res.end();
    })

    app.post('/new-user', middlewares.urlencodedParser, (req, res) => {
        const newUser = new userModel({
            userName: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        newUser.save().then(() => {
            currUser = req.body.username;
            res.json({redirect: 'http://localhost:3000/lisu-to-do-app/' + req.body.username});
        })
    })

    app.post('/user-login', middlewares.urlencodedParser, async (req, res) => {
        let users = await userModel.findOne({userName: req.body.username});
        if (users.userName == req.body.username) {
            currUser = req.body.username;
            res.json({redirect: 'http://localhost:3000/lisu-to-do-app/' + req.body.username});
        }
    })

    // DELETE request
    app.delete('/delete-item/:item', function(req, res) {
        userModel.findOne({userName: currUser}).then((result) => {
            console.log(result);
            if (result.userName == currUser) {
                for (let i = 0; i < result.toDoList.length; i++) {
                    if (result.toDoList[i].item == res.params.item) {
                        result.toDoList.splice(i, 1);
                        result.save().then(() => {
                            return res.end();
                        })
                    }
                }
            }
        })
        res.end();
    })
}