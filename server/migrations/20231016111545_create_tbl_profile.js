/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("profiles", (tbl) => {
    tbl.text("id", 32).index().primary;
    tbl.text("userid", 25).notNullable();
    tbl.text("username", 25).notNullable();
    tbl.text("fname", 25).notNullable();
    tbl.text("lname", 25).notNullable();
    tbl.text("oname", 25);
    tbl.text("gender", 25);
    tbl.text("phno");
    tbl.text("dob");
    tbl.text("email", 25);
    tbl.text("classid", 25);
    tbl.text("parentid", 25);
    tbl.text("teacherid", 25);
    tbl.text("researchersid", 25);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
