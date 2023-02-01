import Router from 'koa-router';
import { Context } from 'koa';
import * as eventService from '../service/event.service';
import { body, validationResults } from 'koa-req-validation';
import { getByIDValidation, RequestError } from './requestError';
import ValidationResult from 'koa-req-validation/dist/lib/ValidationResult';
import { getLogger } from '../logging';

const getAll = async (ctx: Context) : Promise<void> => {
    try {
        ctx.body = await eventService.getAll();
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
        const winkel = await eventService.getByID(Number(ctx.params.id));
        ctx.body = winkel;
    } catch (error) {
        getLogger().error(error);
        return ctx.throw(400, {message : error.message})
    }
}
const create = async (ctx: Context) : Promise<void> => {
    try{
        const errors : ValidationResult = validationResults(ctx);
        
        if(errors.hasErrors()){
            ctx.body = RequestError(400, errors.mapped());
            return;
        }
        const event = await eventService.create(ctx.request.body);
        if(event.errors.length > 0){
            ctx.body = RequestError(400, event.errors);
            return;
        }
        ctx.body = event.result;
    }catch(error){
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
        const event = await eventService.updateByID(Number(ctx.params.id), ctx.request.body);
        if(event.errors.length > 0){
            ctx.body = RequestError(400, event.errors);
            return;
        }
        ctx.body = event.result;
    }catch(error){
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
        const event = await eventService.deleteByID(Number(ctx.params.id));
        if(event.errors.length > 0){
            ctx.body = RequestError(400, event.errors);
            return;
        }
        ctx.body = event.result;
    }catch(error){
        getLogger().error(error);
        return ctx.throw(400, {message : error.message})
    }
}

export function installEventRouter(app) : void{
    const eventRouter : Router = new Router({
        prefix: '/event',

    });

    const createValidation = [
        body('naam').isLength({ min: 1 }).withMessage('Naam is required').build(),
        body('prijs').isFloat().isLength({ min: 1 }).withMessage('Prijs is required').build(),
    ]

    eventRouter.get('/', getAll);
    eventRouter.get('/:id',...getByIDValidation, getByID)
    eventRouter.post('/', ...createValidation,  create);
    eventRouter.put('/:id', updateByID);
    eventRouter.delete('/:id', deleteByID);

    app.use(eventRouter.routes()).use(eventRouter.allowedMethods());
}   
