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
const Service = use("App/Models/Service");
const User = use("App/Models/User");

Route.get("/", "UserController.index").as("home");
// Route.on("/").render("Layout");
// Route.get("/users", "UserController.index");
Route.post("/user/login", "UserController.login").as("user_login");
Route.post("/user/create", "UserController.create").as("user_create");
Route.get("/user/logout", "UserController.logout").as("user_logout");

Route.group(() => {
  Route.get("/services", "ServiceController.index");
  Route.get("/service/details/:id", "ServiceController.details");
  Route.get("/service/new", "ServiceController.createNew");
  Route.post("/service/create", "ServiceController.create").as(
    "create_new_service"
  );
  Route.post("/service/update/:id", "ServiceController.update");
}).middleware(["auth"]);

Route.post("/api1/service", "ServiceController.apiServiceDetails");
