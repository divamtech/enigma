"use strict";
const Service = use("App/Models/Service");
const EncryptDecrypt = use("App/Helper/EncryptDecrypt");

class ServiceController {
  async apiServiceDetails({ request, response }) {
    const data = request.only(["path", "token"]);
    const service = await Service.findBy("path", data.path);
    const token = EncryptDecrypt.decrypt(service.token, process.env.ENC1);
    const encryptKey = EncryptDecrypt.decrypt(
      service.encrypt_key,
      process.env.ENC1
    );
    if (data.token != token) {
      return response.status(401).json({ error: "unauthorized" });
    }
    const cipher1 = EncryptDecrypt.decrypt(
      EncryptDecrypt.decrypt(service.value, process.env.ENC1),
      process.env.ENC2
    );
    const encryptedValue = EncryptDecrypt.encrypt(cipher1, encryptKey);
    response.json({ value: encryptedValue });
  }

  async index({ view }) {
    const services = await Service.all();
    console.log(services);
    return view.render("service.index", { services: services.toJSON() });
  }

  async details({ params, view }) {
    const service = await Service.find(params.id);
    service.token = EncryptDecrypt.decrypt(service.token, process.env.ENC1);
    service.encrypt_key = EncryptDecrypt.decrypt(
      service.encrypt_key,
      process.env.ENC1
    );
    if (!!service.value && service.value.length > 0) {
      service.value = JSON.stringify(
        JSON.parse(
          EncryptDecrypt.decrypt(
            EncryptDecrypt.decrypt(service.value, process.env.ENC1),
            process.env.ENC2
          )
        ),
        null,
        2
      );
    }
    return view.render("service.details", { service });
  }

  async createNew({ view }) {
    return view.render("service.createNew");
  }

  async create({ request, response }) {
    const service = new Service();
    service.path = request.input("path");
    service.token = EncryptDecrypt.encrypt(
      EncryptDecrypt.keyGenerator(),
      process.env.ENC1
    );
    service.encrypt_key = EncryptDecrypt.encrypt(
      EncryptDecrypt.keyGenerator(),
      process.env.ENC1
    );
    await service.save();
    return response.redirect(`/service/details/${service.id}`);
  }

  async update({ params, request, response }) {
    const service = await Service.find(params.id);
    const value = JSON.stringify(
      JSON.parse(request.input("json-input").trim())
    );
    service.value = EncryptDecrypt.encrypt(
      EncryptDecrypt.encrypt(value, process.env.ENC2),
      process.env.ENC1
    );
    await service.save();
    return response.redirect("/services");
  }

  async edit({ params, view }) {
    const service = await Service.find(params.id);
    return view.render("service.editPath", { service });
  }

  async editPathName({ params, request, response }) {
    const service = await Service.find(params.id);
    service.path = request.input("path").trim();
    await service.save();
    return response.redirect(`/service/details/${params.id}`);
  }

  async regenerateKeys({ params, response }) {
    const service = await Service.find(params.id);
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

  async delete({ params, response }) {
    const service = await Service.find(params.id);
    await service.delete();
    response.redirect("/services");
  }
}

module.exports = ServiceController;
