import bodyParser from 'body-parser';
import morgan from 'morgan';

module.exports = {
    configMiddlewares: app => {
        app.use(bodyParser.json());
        app.use(morgan('dev'));
    },
    urlencodedParser: bodyParser.urlencoded({ extended: false })
}