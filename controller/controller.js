let bodyParser = require('body-parser');

let urlencodedParser = bodyParser.urlencoded({ extended: false });

let data = [{item: 'asdasd'}];

module.exports = function(app) {
    app.get('/lisu-to-do-app', function(req, res) {
        res.render('mainTheme', {todo: data});
    })

    app.post('/lisu-to-do-app', urlencodedParser, function(req, res) {
        data.push(req.body);
        res.json(data);
    })

    app.delete('/lisu-to-do-app/:item', function(req, res) {
        for (let i = 0; i < data.length; ++i) {
            if (data[i].item.replace(" ", "-") == req.params.item) {
                data.splice(i, 1);
                break;
            }
        }        
        res.json(data);
    })
}