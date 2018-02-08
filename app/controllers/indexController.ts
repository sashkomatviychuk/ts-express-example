import { basePath, get, post, del } from 'express-decorators'
import { Request, Response, NextFunction } from 'express'
import { ensureLoggedIn } from 'connect-ensure-login'
import { ISpecialRequest } from '../../types/global';

@basePath("/")
class IndexController {
    
    /**
     * Home page view
     * @param req 
     * @param res 
     * @param next 
     */
    @get("/")
    indexAction(req: Request, res: Response, next: NextFunction): void {
        res.render('index', { title: 'TypeScript' });
    }

    /**
     * Some unique page view
     * @param req 
     * @param res 
     * @param next 
     */
    @get('/page/:id')
    pageAction(req: ISpecialRequest, res: Response, next: NextFunction): Response {
        
        return res.json({
            message: 'Page',
            id: req.params.id,
        });
    }

    /**
     * This page can see only logged in users
     * @param req 
     * @param res 
     * @param next 
     */
    @get('/secret', [ensureLoggedIn()])
    secretAction(req: Request, res: Response, next: NextFunction): void {
        res.send('Secret page');
    }

    /**
     * Login page
     * @param req 
     * @param res 
     * @param next 
     */
    @get('/login')
    loginAction(req: Request, res: Response, next: NextFunction): Response {
        return res.send('Login page');
    }
}

export default new IndexController();
