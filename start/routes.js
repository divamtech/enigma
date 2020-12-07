"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", "UserController.index").as("home");
Route.post("/user/login", "UserController.login").as("user_login");
Route.post("/user/create", "UserController.create").as("user_create");
Route.get("/user/logout", "UserController.logout").as("user_logout");

Route.group(() => {
  Route.get("/service/new", "ServiceController.createNew");
  Route.post("/service/create", "ServiceController.create");
  Route.get("/services", "ServiceController.index");
  Route.get("/service/details/:id", "ServiceController.details");
  Route.get("/service/regenerate_keys/:id", "ServiceController.regenerateKeys");
  Route.post("/service/update/:id", "ServiceController.update");
  Route.get("/service/edit_path/:id", "ServiceController.editPath");
  Route.post("/service/update_path/:id", "ServiceController.updatePath");
  Route.get("/service/delete/:id", "ServiceController.delete");
}).middleware(["auth"]);

Route.post("/api1/service", "ServiceController.apiServiceDetails");
