"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ServiceSchema extends Schema {
  up() {
    this.create("services", (table) => {
      table.increments();
      table.text("path").notNullable().unique();
      table.text("token").notNullable().unique();
      table.text("encrypt_key").notNullable().unique();
      table.text("value").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("services");
  }
}

module.exports = ServiceSchema;
