const service = require("./reviews.service");
const mapProperties = require("../utils/map-properties");

async function reviewIdExists(req, res, next) {
    const review = await service.read(req.params.reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    next({ status: 404, message: `Review cannot be found.` });
};

const addCriticCategory = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at"
});

async function list(req, res) {
    const { movieId } = req.params;
    if (movieId) {
        const data = await service.listWithCritic(movieId);
        
        let criticData = [];
        for (let i = 0; i < data.length; i++) {
            criticData.push(addCriticCategory(data[i]))
        }
        res.json({ data: criticData });
    }
};

const addCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

async function update(req, res) {
    const updatedReview = {
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };
  
    await service.update(updatedReview);

    const updated = await service.readWithCritic(updatedReview.review_id);
    const updatedWithCritic = addCritic(updated);
    
    res.json({ data: updatedWithCritic });
}

async function destroy(req, res) {
    await service.delete(res.locals.review.review_id);
    res.sendStatus(204);
}

module.exports = {
    list,
    update: [reviewIdExists, update],
    delete: [reviewIdExists, destroy],
}