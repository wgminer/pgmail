function handler (model) {
 
    const Model = require(`./models/${model}`);

    function populate (req, res, next) {
        req.populate = '';
        if (req.query.populate) {
            req.populate = req.query.populate;
            delete req.query.populate;
        }
        return next();
    }

    async function all(req, res) {

        let query = {}
        if (Object.keys(req.query).length > 0) {
            query = req.query;
        }
        
        let data = await Model
            .find(query)
            .populate(req.populate)
            .select('-password')
            .sort('-createdAt')
            .catch(err => console.error(err));
        return res.status(200).json(data);
    } 

    async function create(req, res) {         
        let data = await Model(req.body)
            .save()
            .catch(err => console.error(err));

        data = await Model
            .findById(data._id)
            .populate(req.populate)
            .catch(err => console.error(err));

        console.log(data);

        return res.status(200).json(data);
    }

    async function one(req, res) {
        const data = await Model
            .findById(req.params.id)
            .populate(req.populate)
            .catch(console.error);
        return res.status(200).json(data);
    }

    async function update(req, res) {
        await Model.findOneAndUpdate({ _id: req.params.id }, req.body);
        const data = await Model
            .findById(req.params.id)
            .populate(req.populate)
            .select('-password')
            .catch(console.error);
        return res.status(200).json(data);
    }

    async function remove(req, res) {
        await Model.findByIdAndRemove(req.params.id);
        res.sendStatus(200);
    }

    return { 
        populate,
        all,
        create,
        one,
        update,
        remove, 
    }
}

module.exports = handler;