import Router from 'koa-router';
import { Context } from 'koa';
import * as productenService from '../service/product.service';
import { body, param, query, validationResults } from 'koa-req-validation';
import ValidationResult from 'koa-req-validation/dist/lib/ValidationResult';
import { getByIDValidation, RequestError } from './requestError';
import { getLogger } from '../logging';

const getAll = async (ctx: Context) : Promise<void> => {
    try {
        ctx.body = await productenService.getAll();
    } catch (error) {
        getLogger().error(error);
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
        const product = await productenService.create(ctx.request.body);
        ctx.body = product;
    }
    catch (error) {
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
        const product = await productenService.getByID(Number(ctx.params.id));
        ctx.body = product;
    } catch (error) {
        getLogger().error(error);
        return ctx.throw(400, {message : error.message})
    }
}

const updateByID = async (ctx: Context) : Promise<void> => {
    try{
        const errors: ValidationResult = validationResults(ctx);
        if(errors.hasErrors()){
            ctx.body = RequestError(400, errors.mapped());
            return;
        }
        const product = await productenService.updateByID(Number(ctx.params.id), ctx.request.body);
        if(product.errors.length > 0){
            ctx.body = RequestError(400, product.errors);
            return;
        }
        ctx.body = product;
    }catch (error) {
        getLogger().error(error);
        return ctx.throw(400, {message : error.message})
    }
}

const deleteByID = async (ctx: Context) : Promise<void> => {
    try{
        const errors: ValidationResult = validationResults(ctx);
        if(errors.hasErrors()){
            ctx.body = RequestError(400, errors.mapped());
            return;
        }
        const product = await productenService.deleteByID(Number(ctx.params.id));
        if(product.errors.length > 0){
            ctx.body = RequestError(400, product.errors);
            return;
        }
        ctx.body = product;
    } catch (error) {
        getLogger().error(error);
        return ctx.throw(400, {message : error.message})
    }
}


export function installProductRouter(app) : void{
    const productRouter : Router = new Router({
        prefix: '/product',

    });

    const createValidation = [
        body('naam').isLength({ min: 1 }).withMessage('Naam is required').build(),
        body('prijs').isFloat().isLength({ min: 1 }).withMessage('Prijs is required').build(),
        // body('winkel_id').isLength({ min: 1 }).withMessage('Winkel_id is required').build(),
    ]

    productRouter.get('/', getAll);
    productRouter.get('/:id', ...getByIDValidation, getByID);
    productRouter.post('/', ...createValidation, create);
    productRouter.put('/:id', updateByID);
    productRouter.delete('/:id', deleteByID);

    app.use(productRouter.routes()).use(productRouter.allowedMethods());
}   
