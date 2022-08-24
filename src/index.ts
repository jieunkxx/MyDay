import { ExpressApp } from './app';
import {
  BudgetRouter,
  CategoryRouter,
  ContentsRouter,
  FriendsRouter,
  UserRouter,
} from './routes';

const PORT = Number(process.env.PORT) || 10010;

const app = new ExpressApp([
  new BudgetRouter(),
  new CategoryRouter(),
  new ContentsRouter(),
  new FriendsRouter(),
  new UserRouter(),
]);
app.listen(PORT);
