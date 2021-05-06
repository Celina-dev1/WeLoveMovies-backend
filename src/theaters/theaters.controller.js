const service = require("./theaters.service")
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
  });


async function list(req, res) {
    //for the movies/:movieId/theaters route, check if params contains a movieId
    //if so use a different service func that selects the theaters for that specific movieId 
    const { movieId } = req.params;
    if (movieId) {
        const data = await service.list(movieId);

        return res.json({ data });
    } 
    const data = await service.listWithMovies();
    
    res.json({ data: reduceMovies(data) });
};

module.exports = {
    list,
}