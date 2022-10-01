import Router from '@koa/router';
import { BaseContext } from 'koa';
import pages from './pages/index';

const clientRouter = new Router();

Object.entries(pages).forEach(([pageName, content]) => {
  const route = pageName === 'index' ? '' : pageName;
  clientRouter.get(`/${route}`, (ctx: BaseContext) => {
    ctx.body = content;
  });
});

export { clientRouter };
