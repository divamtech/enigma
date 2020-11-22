"use strict";

class ConvertEmptyStringsToNull {
  async handle({ request, response }, next) {
    if (Object.keys(request.body).length) {
      request.body = Object.assign(
        ...Object.keys(request.body).map((key) => ({
          [key]: request.body[key] !== "" ? request.body[key] : null,
        }))
      );
    }

    try {
      await next();
    } catch (e) {
      console.log("Error and redirect to home", e);
      response.redirect("/");
    }
  }
}

module.exports = ConvertEmptyStringsToNull;
