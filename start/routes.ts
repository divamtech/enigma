/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.get("/", "UsersController.index").as("home");
Route.post("/user/login", "UsersController.login").as("user_login");
Route.post("/user/create", "UsersController.create").as("user_create");
Route.get("/user/logout", "UsersController.logout").as("user_logout");

Route.group(() => {
  Route.get("/service/new", "ServicesController.createNew");
  Route.post("/service/create", "ServicesController.create");
  Route.get("/services", "ServicesController.index");
  Route.get("/service/details/:id", "ServicesController.details");
  Route.get("/service/addDetails/:id", "ServicesController.addDetails");
  Route.get("/service/regenerate_keys/:id", "ServicesController.regenerateKeys");
  Route.post("/service/update/:id", "ServicesController.update");
  Route.post("/service/updateByForm/:id", "ServicesController.updateByForm");
  Route.get("/service/edit_path/:id", "ServicesController.editPath");
  Route.post("/service/update_path/:id", "ServicesController.updatePath");
  Route.get("/service/delete/:id", "ServicesController.delete");
}).middleware(['auth']);

Route.post("/api1/service", "ServiceController.apiServiceDetails");