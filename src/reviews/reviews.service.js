const knex = require("../db/connection");


async function listWithCritic(movie_id) {
    return knex("movies as m")
    .join("reviews as r", "r.movie_id", "m.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movie_id })
}

async function read(review_id) {
    return knex("reviews").select("*").where({ review_id }).first();
}

async function readWithCritic(review_id) {
    return knex("reviews as r")
        .join("critics as c")
        .select("r.*", "c.preferred_name", "c.surname", "c.organization_name")
        .where({ "r.review_id": review_id }).first();
}

function update(updatedReview) {
    return knex("reviews")
      .where({ "review_id": updatedReview.review_id })
      .update(updatedReview)
  }

function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
  }

module.exports = {
    listWithCritic,
    readWithCritic,
    read,
    update,
    delete: destroy,
}