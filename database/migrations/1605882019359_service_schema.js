"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ServiceSchema extends Schema {
  up() {
    this.create("services", (table) => {
      table.increments();
      table.string("path", 254).notNullable().unique();
      table.string("token", 254).notNullable().unique();
      table.string("encrypt_key", 254).notNullable().unique();
      table.text("value", 2000).nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("services");
  }
}

module.exports = ServiceSchema;
