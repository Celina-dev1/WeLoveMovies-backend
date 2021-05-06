const service = require("./movies.service");

function movieIdExists(req, res, next) {
    service
    .read(req.params.movieId)
    .then((movie) => {
      if (movie) {
        res.locals.movie = movie;
        return next();
      }
      next({ status: 404, message: `Movie cannot be found.` });
    })
    .catch(next);
}

async function list(req, res) {
    if (req.query.is_showing === 'true') {
        const data = await service.listCurrentlyShowing();
        for (let i = 0; i < data.length-1; i++) {
            if(data[i].movie_id === data[i+1].movie_id) {
                data.splice(i, 2)
            }
        }
        return res.json({data});
    }
    const data = await service.list();
    res.json({
    data,
    });
};

function read(req, res) {
    res.json({ data: res.locals.movie });
  }

module.exports = {
    list,
    read: [movieIdExists, read],
}