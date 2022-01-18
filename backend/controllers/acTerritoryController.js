let ACTerritory = require('../data/ACDistributors.json');

exports.getIndex = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json(ACTerritory);
}