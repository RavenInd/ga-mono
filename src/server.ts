import Koa from 'koa';
import cors from '@koa/cors';
import { CLIENT_PORT } from './constants';
import { clientRouter } from './clientRouter';

const webServer = new Koa();
webServer.use(cors());

webServer.use(clientRouter.routes()).use(clientRouter.allowedMethods());

webServer.listen(CLIENT_PORT, () => {
  console.log(`Web server running on port ${CLIENT_PORT}`);
});
