"use strict";

const User = use("App/Models/User");

class UserController {
  async index({ view, auth, response }) {
    if (!!auth.user) {
      return response.redirect("/services");
    } else {
      const user = await User.findBy("access_level", "Admin");
      if (!!user) {
        return view.render("login");
      } else {
        return view.render("create_admin");
      }
    }
  }

  async create({ auth, request, response }) {
    const user = await User.findBy("access_level", "Admin");
    if (!!user) {
      //TODO: session.flash
      return response.redirect("/");
    } else {
      const user = new User();
      user.fill(request.only(["password", "email"]));
      user.access_level = "admin";
      await user.save();
      await auth.attempt(user.email, user.password);
      response.redirect("/");
    }
  }

  async login({ auth, request, response }) {
    const { email, password } = request.all();
    await auth.attempt(email, password);
    return response.redirect("/");
  }

  async logout({ auth, response }) {
    await auth.logout();
    return response.redirect("/");
  }
}

module.exports = UserController;
