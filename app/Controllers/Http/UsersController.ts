import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import { schema, rules } from "@ioc:Adonis/Core/Validator";
import User from 'App/Models/User'

export default class UsersController {
    public async index({ view, auth, response }: HttpContextContract) {
        if(!!auth.user?.id) {
          return response.redirect('/services');
        } else {
          //return 'hello';
          const user = await User.findBy("access_level", "Admin");
          if (!!user) {
            return view.render("login");
          } else {
            return view.render("create_admin");
          }
        }
    }
    
    public async create({ auth, request, response }: HttpContextContract) {
        
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

     
    public async login({ auth, request, response }: HttpContextContract) {
      const email = request.input('email')
      const password = request.input('password')

      try {
      await auth.attempt(email, password)
      return response.redirect('/');
      } catch {
      return response.badRequest('Invalid credentials')
      }
  }

    public async logout({ auth, response }: HttpContextContract) {
        await auth.logout();
        return response.redirect("/");
    }


}
