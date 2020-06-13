import * as middlewares from '../config/middlewares/middlewares';
import {userModel} from "../config/database/collections/users/model";
import {itemModel} from "../config/database/collections/items/model";
import mongoose from "mongoose";

module.exports = function(app, currUser) {

    currUser = 'baodihuynh';

    middlewares.configMiddlewares(app);

    // GET request
    app.get('/sign-up', function(req, res) {
        res.render('signUp');
    });

    app.get('/login', function(req, res) {
        res.render('login');
    });

    app.get('/lisu-to-do-app', function(req, res) {
        if (currUser != ' ') {
            userModel.findOne({userName: currUser}).then( result => {
                if (result.userName === currUser) {
                    res.render('mainTheme', {todo: result.toDoList});
                } else {
                    console.log('404: user not found');
                }
            })
        } else {
            console.log('404: user not found');
        }
    })


    // POST request
    app.post('/redirect-to-sign-up', (req, res) => {
        res.json({redirect: '/sign-up'});
    })

    app.post('/save-new-item', middlewares.urlencodedParser, function(req, res) {
        if (currUser != ' ') {
            userModel.findOne({userName: currUser}).then( result => {
                if (result.userName === currUser) {
                    result.toDoList.push(req.body);
                    result.save().then(() => {

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
            res.json({redirect: '/lisu-to-do-app'});
        })
    })


    // DELETE request
    app.delete('/delete-item/:item', function(req, res) {
        userModel.findOne({userName: currUser}).then((result) => {
            if (result.userName === currUser) {
                for (let i = 0; i < result.toDoList.length; i++) {
                    if (result.toDoList[i].item === res.params.item) {
                        result.toDoList.splice(i, 1);
                        result.save().then(() => {
                            break;
                        })
                    }
                }
            }
        })
        res.end();
    })
}