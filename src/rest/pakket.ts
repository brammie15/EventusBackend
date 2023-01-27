import Router from 'koa-router';
import { Context } from 'koa';
import * as pakketenService from '../service/pakket.service';
import { RequestContext } from '@mikro-orm/core';
import { DI } from '../data/data-index';
import { Winkel } from '../entities/Winkel.entity';
import { Product } from '../entities/Product.entity';
import { body, validationResults } from 'koa-req-validation';
import { getByIDValidation, RequestError } from './requestError';
import ValidationResult from 'koa-req-validation/dist/lib/ValidationResult';

const getAll = async (ctx: Context) : Promise<void> => {
    try {
        ctx.body = await pakketenService.getAll();
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
        ctx.body = await pakketenService.getByID(Number(ctx.params.id));
    } catch (error) {
        console.log(error);
        return ctx.throw(400, {message : error.message})
    }
}

const create = async (ctx: Context) : Promise<void> => {
    try {
        const pakket = await pakketenService.create(ctx.request.body);
        ctx.body = pakket;
    }
    catch (error) {
        console.log(error);
        return ctx.throw(400, {message : error.message})
    }
}
        


export function installPakketRouter(app) : void{
    const pakketRouter : Router = new Router({
        prefix: '/pakket',

    });

    const createValidation = [
        body('naam').isLength({ min: 1 }).withMessage('Naam is required').build(),
        body('prijs').isFloat().isLength({ min: 1 }).withMessage('Prijs is required').build(),
        // body('diensten').withMessage('Diensten is required').build(), //Not sure to not make this required cuz paketten could only have diesnt of producten ? eh fuck it
        // body('producten').withMessage('Producten is required').build(),
    ]

    pakketRouter.get('/', getAll);
    pakketRouter.get('/:id',...getByIDValidation, getByID);
    pakketRouter.post('/', ...createValidation, create);

    app.use(pakketRouter.routes()).use(pakketRouter.allowedMethods());
}   
