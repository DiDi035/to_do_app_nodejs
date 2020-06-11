import * as middlewares from '../config/middlewares/middlewares';
import {itemModel} from "../config/database/collections/items/model" 
import mongoose from "mongoose";

module.exports = function(app) {

    middlewares.configMiddlewares(app);

    app.get('/login', function(req, res) {
        res.render('login');
    });

    app.get('/lisu-to-do-app', function(req, res) {
        itemModel.find({}, (obj, arr) => {
            res.render('mainTheme', {todo: arr});
        })
    })

    app.post('/save-new-item', middlewares.urlencodedParser, function(req, res) {
        const newItem = new itemModel(req.body);
        newItem.save().then(result => {
            res.json(result);
        })
    })

    app.delete('/delete-item/:item', function(req, res) {
        itemModel.findOneAndRemove({item: req.params.item}).then(() => {
            res.json();
        })
    })
}