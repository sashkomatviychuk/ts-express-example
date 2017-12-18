import { register } from 'express-decorators';
import { Application } from 'express';

import indexController from './indexController'

/**
 * Register controllers
 */
export default (app: Application): void => {
    register(app, indexController);
};
