import { Context } from 'koa';
import Router, { RouterContext } from 'koa-router';
import { installDientRouter } from './dienst';
import { installEventRouter } from './event';
import { installPakketRouter } from './pakket';
import { installProductRouter } from './product';
import { installWinkelRoutes } from './winkel';

const sendHello = async (ctx: Context) => {
    ctx.body = "Welcome to the EVentus API";
}

export async function installRest(app) : Promise<void>{
    const apiRouter : Router = new Router({
        prefix: '/api',
    });

    // app.use(async (ctx : RouterContext, next) => {
    //     try {
    //       if (ctx.state.user.sub) {
    //         await next();
    //       }
    //     } catch (err) {
    //       ctx.throw(401, 'Unauthorized');
    //       return;
    //     }
    //   })

    apiRouter.get('/', sendHello);

    installWinkelRoutes(apiRouter);    
    installProductRouter(apiRouter);
    installDientRouter(apiRouter);
    installPakketRouter(apiRouter);
    installEventRouter(apiRouter);
    app.use(apiRouter.routes()).use(apiRouter.allowedMethods());
}