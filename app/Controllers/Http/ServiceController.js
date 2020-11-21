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
    return view.render("service.details", { service });
  }

  async createNew({ view }) {
    return view.render("service.createNew");
  }

  async create({ request, response }) {
    const service = new Service();
    service.path = request.input("path");
    service.token = EncryptDecrypt.encrypt(
      EncryptDecrypt.uuidv4(),
      process.env.ENC1
    );
    service.encrypt_key = EncryptDecrypt.encrypt(
      EncryptDecrypt.uuidv4(),
      process.env.ENC1
    );
    await service.save();
    return response.redirect(`/service/details/${service.id}`);

    // const service = new Service();
    // const data = request.all();
    // const pathval = request.only(["path"]);
    // const serve = await Service.findBy("path", pathval.path);
    // if (serve) {
    //   return response.status(401).json({ error: "Path already exists" });
    // }
    // const json = {
    //   path: data.path,
    //   token: EncryptDecrypt.encrypt(data.token, process.env.ENC1),
    //   encrypt_key: EncryptDecrypt.encrypt(data.encrypt_key, process.env.ENC1),
    //   value: EncryptDecrypt.encrypt(
    //     EncryptDecrypt.encrypt(data.value, process.env.ENC2),
    //     process.env.ENC1
    //   ),
    // };
    // service.fill(json);
    // await service.save();
    // return response.status(200).json({ message: "Path created" });
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
}

module.exports = ServiceController;

// TODO: the thing is we will have 2 encryption keys which will be stored in environment variables and then we have encrypt the token and auth token
// TODO: Finally when we will be sending the value of JSON then we will encrypt it with encrypt_key.
