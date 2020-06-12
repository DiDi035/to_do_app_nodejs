import * as middlewares from '../config/middlewares/middlewares';
import {userModel} from "../config/database/collections/users/model"
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

    app.get('/lisu-to-do-app', function(req, res) {
        if (currUser != ' ') {
            userModel.findOne({userName: currUser}).then( result => {
                if (result.userName === currUser) {
                    res.render('mainTheme', {todo: result.toDDoList});
                } else {
                    alert('404: user not found');
                }
            })
        } else {
            alert('404: user not found');
        }
    })


    // POST request
    app.post('/redirect-to-sign-up', (req, res) => {
        res.json({redirect: '/sign-up'});
    })

    app.post('/save-new-item', middlewares.urlencodedParser, function(req, res) {
        
    })

    app.post('/new-user', (req, res) => {
        const newUser = new userModel({
            userName: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        newUser.save().then(err => {
            if (err) {
                alert(err);
                res.end();
            } else {
                currUser = req.body.username;
                res.json({redirect: '/lisu-to-do-app'});
            }
        })
    })


    // DELETE request
    app.delete('/delete-item/:item', function(req, res) {
        itemModel.findOneAndRemove({item: req.params.item}).then((err) => {
            if (err) {
                alert(err);
            } else {
                res.end();
            }
        })
    })
}