import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Service from 'App/Models/Service'
import EncryptDecrypt from 'App/Helper/EncryptDecrypt'

export default class ServicesController {
    public async apiServiceDetails({ request, response }:HttpContextContract) {
        const data = request.only(["path", "token"]);
        const service = await Service.findByOrFail('path', data.path);
        const token = EncryptDecrypt.decrypt(service.token, process.env.ENC1);
        const encryptKey = EncryptDecrypt.decrypt(service.encrypt_key, process.env.ENC1);
        if (data.token != token) {
          return response.status(401).json({ error: "unauthorized" });
        }
        let cipher1 = '{}'
        if (!!service.value && service.value.length > 0) {
          cipher1 = EncryptDecrypt.decrypt(
            EncryptDecrypt.decrypt(service.value, process.env.ENC1),
            process.env.ENC2
          );
        }
        const encryptedValue = EncryptDecrypt.encrypt(cipher1, encryptKey);
        response.json({ value: encryptedValue });
    }
    
    public async createNew({ view }:HttpContextContract) {
        return view.render("service/createNew");
      }
    
    public async create({ request, response }:HttpContextContract) {
        const service = new Service();
        service.path = request.input("path");
        service.token = EncryptDecrypt.encrypt(EncryptDecrypt.keyGenerator(), process.env.ENC1);
        service.encrypt_key = EncryptDecrypt.encrypt(EncryptDecrypt.keyGenerator(), process.env.ENC1);
        await service.save();
        return response.redirect(`/service/details/${service.id}`);
    }
    
    public async index({ view }: HttpContextContract) {
        const services = await Service.all();
        return view.render("service/index", { services });
    }
    
    public async details({ params, view }:HttpContextContract) {
        const service = await Service.findOrFail(params.id);
        service.token = EncryptDecrypt.decrypt(service.token, process.env.ENC1);
        service.encrypt_key = EncryptDecrypt.decrypt(service.encrypt_key, process.env.ENC1);
        if (!!service.value && service.value.length > 0) {
          const cipher1 = EncryptDecrypt.decrypt(
            EncryptDecrypt.decrypt(service.value, process.env.ENC1),
            process.env.ENC2
            );
          service.value = JSON.stringify(JSON.parse(cipher1), null, 2);
        } else {
          service.value = '{}';
        }
        return view.render("service/details", { service });
    }
    
    public async update({ params, request, response }:HttpContextContract) {
        const service = await Service.findOrFail(params.id);
        const value = JSON.stringify(JSON.parse(request.input("json-input").trim()));
        service.value = EncryptDecrypt.encrypt(
          EncryptDecrypt.encrypt(value, process.env.ENC2),
          process.env.ENC1
        );
        await service.save();
        return response.redirect("/services");
    }
    
    public async editPath({ params, view }:HttpContextContract) {
        const service = await Service.find(params.id);
        return view.render("service/editPath", { service });
    }
    
    public async updatePath({ params, request, response }:HttpContextContract) {
        const service = await Service.findOrFail(params.id);
        service.path = request.input("path").trim();
        await service.save();
        return response.redirect(`/service/details/${params.id}`);
    }
    
    public async regenerateKeys({ params, response }:HttpContextContract) {
        const service = await Service.findOrFail(params.id);
        service.token = EncryptDecrypt.encrypt(
          EncryptDecrypt.keyGenerator(),
          process.env.ENC1
        );
        service.encrypt_key = EncryptDecrypt.encrypt(
          EncryptDecrypt.keyGenerator(),
          process.env.ENC1
        );
        await service.save();
        return response.redirect(`/service/details/${params.id}`);
    }
    
    public async delete({ params, response }:HttpContextContract) {
        const service = await Service.findOrFail(params.id);
        await service.delete();
        response.redirect("/services");
    }
}
