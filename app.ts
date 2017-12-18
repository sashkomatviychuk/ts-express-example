import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as moment from 'moment';

import * as config from './app/config'; 
import applyControllers from './app/controllers';
// import applyPassport from './app/services/auth/setup';

class App {

    // ref to Express instance
    public express: express.Application;

    /**
     * Setup express application
     */
    constructor() {
        this.express = express();

        this.middlewares();
        this.setupViews();
        this.setupDb();
        this.setupRoutes();
        this.handleErrors();
    }

    /**
     * Setup express middlewares
     */
    private middlewares(): void {
        // uncomment after placing your favicon in /public
        //this.express.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(cookieParser());
        this.express.use(express.static(config.publicPath));
    }

    /**
     * View engine setup
     */
    private setupViews(): void {
        this.express.set('views', config.viewsPath);
        this.express.set('view engine', 'jade');
        this.express.locals.moment = moment;
    }

    /**
     * Setup database
     */
    private setupDb(): void {
    }

    /**
     * Setup routes
     */
    private setupRoutes(): void {
        applyControllers(this.express);
        // applyPassport(this.express);
    }

    /**
     * Handle errors
     */
    private handleErrors(): void {
        // catch 404 and forward to error handler
        this.express.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
            const err: Error = new Error('Not Found');
            next(err);
        });

        const env: string = this.express.get('env');

        if (env === 'dev') {
            this.express.use((err: Error, req: express.Request, res: express.Response, next): void => {
                res.status(500).render("error", {
                    message: err.message,
                    error: err
                });
            });
        }
    }
}

export default new App().express
