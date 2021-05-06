const knex = require("../db/connection");

async function list() {
    return knex("movies").select("*");
};

function listCurrentlyShowing() {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select("m.*", "mt.*")
      .where({ "mt.is_showing": true })
      //.distinctOn("mt.movie_id");
};

async function read(movie_id) {
    return knex("movies").select("*").where({ movie_id }).first();
};

module.exports = {
    list,
    listCurrentlyShowing,
    read,
};