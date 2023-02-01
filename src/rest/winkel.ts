import Router from 'koa-router';
import { Context } from 'koa';
import * as winkelService from '../service/winkel.service';
import { body, query, validationResults } from 'koa-req-validation';
import ValidationResult from 'koa-req-validation/dist/lib/ValidationResult';
import { getByIDValidation, RequestError } from './requestError';
import { getLogger } from '../logging';

const getAll = async (ctx: Context) : Promise<void> => {
    try {
        ctx.body = await winkelService.getAll();
    } catch (error) {
        getLogger().error(error);
        return ctx.throw(400, {message : error.message})        
    }
}

const getByID = async (ctx: Context) : Promise<void> => {
    try {
        const errors : ValidationResult = validationResults(ctx);
        if(errors.hasErrors()){
            ctx.body = RequestError(400, errors.mapped());
            return;
        }
        const winkel = await winkelService.getByID(Number(ctx.params.id));
        ctx.body = winkel;
    } catch (error) {
        getLogger().error(error)
        return ctx.throw(400, {message : error.message})
    }
}

const create = async (ctx: Context) : Promise<void> => {
    try {
        const errors : ValidationResult = validationResults(ctx);

        if(errors.hasErrors()){
            ctx.body = RequestError(400, errors.mapped());
            return;
        }
        const winkel = await winkelService.create(body);
        if(winkel.errors.length > 0){
            ctx.body = RequestError(400, winkel.errors);
            return;
        }
        ctx.body = winkel.result;
    }
    catch (error) {
        getLogger().error(error);
        return ctx.throw(400, {message : error.message})
    }
}

const updateByID = async (ctx: Context) : Promise<void> => {
    try{
        const errors : ValidationResult = validationResults(ctx);
        if(errors.hasErrors()){
            ctx.body = RequestError(400, errors.mapped());
            return;
        }
        const winkel = await winkelService.updateByID(Number(ctx.params.id), body);
        if(winkel.errors.length > 0){
            ctx.body = RequestError(400, winkel.errors);
            return;
        }
        ctx.body = winkel.result;
    }catch (error) {
        getLogger().error(error);
        return ctx.throw(400, {message : error.message})
    }
}

const deleteByID = async (ctx: Context) : Promise<void> => {
    try{
        const errors : ValidationResult = validationResults(ctx);
        if(errors.hasErrors()){
            ctx.body = RequestError(400, errors.mapped());
            return;
        }
        const winkel = await winkelService.deleteByID(Number(ctx.params.id));
        if(winkel.errors.length > 0){
            ctx.body = RequestError(400, winkel.errors);
            return;
        }
        ctx.body = winkel.result;
    }catch (error) {
        getLogger().error(error);
        return ctx.throw(400, {message : error.message})
    }
}
        
export function installWinkelRoutes(app) : void{
    const winkelRouter : Router = new Router({
        prefix: '/winkel',

    });

    const createValidation = [ 
        body('naam').isLength({min: 1}).withMessage('Name is required').build(),
    ]

    winkelRouter.get('/', getAll);
    winkelRouter.get('/:id', ...getByIDValidation, getByID);
    winkelRouter.post('/', ...createValidation, create);
    winkelRouter.put('/:id', updateByID);
    winkelRouter.delete('/:id', deleteByID);


    app.use(winkelRouter.routes()).use(winkelRouter.allowedMethods());
}