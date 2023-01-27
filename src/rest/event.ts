import Router from 'koa-router';
import { Context } from 'koa';
import * as eventService from '../service/event.service';
import { RequestContext } from '@mikro-orm/core';
import { DI } from '../data/data-index';
import { Winkel } from '../entities/Winkel.entity';
import { Product } from '../entities/Product.entity';
import { body, validationResults } from 'koa-req-validation';
import { getByIDValidation, RequestError } from './requestError';
import ValidationResult from 'koa-req-validation/dist/lib/ValidationResult';

const getAll = async (ctx: Context) : Promise<void> => {
    try {
        ctx.body = await eventService.getAll();
    } catch (error) {
        console.log(error);
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
        console.log(error);
        return ctx.throw(400, {message : error.message})
    }
}
const create = async (ctx: Context) : Promise<void> => {
    try {
        const pakket = await eventService.create(ctx.request.body);
        ctx.body = pakket;
    }
    catch (error) {
        console.log(error);
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

    app.use(eventRouter.routes()).use(eventRouter.allowedMethods());
}   
