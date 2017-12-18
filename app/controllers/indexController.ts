import { basePath, get, post, del } from 'express-decorators'
import { Request, Response, NextFunction } from 'express'
import { ensureLoggedIn } from 'connect-ensure-login'

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
    pageAction(req: Request, res: Response, next: NextFunction): void {
        res.json({
            message: 'Page',
            id: req.params.id,
        });
    }

    // @get('/secret', [ensureLoggedIn()])
    // secretAction(req: Request, res: Response, next: NextFunction): void {
    //     res.send('Secret page');
    // }
}

export default new IndexController();