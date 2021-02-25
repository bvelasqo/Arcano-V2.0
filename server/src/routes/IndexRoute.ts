import { Router, text } from 'express';
class IndexRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', (req, res)=>{
            res.json({text: "hola chachos tqm"})
        });
    }

}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;