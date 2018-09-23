const Express = require('express');
const Router = Express.Router();
const dateFormat = require('dateformat');
const request = require("request");

Router.get("/time", function (req, res) {
    return res.status(200).json({ time: dateFormat(new Date(), "mm/dd/yyyy") });
});

Router.get("/test/:value", function (req, res) {
    return res.status(200).json({ result: req.params.value * 2 });
});

Router.get("/request", function (req, resRouter) {
    let options = {
        url: 'https://apis.sktelecom.com/v1/baas/data/Spot',
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "TDCProjectKey": process.env.BAAS_API_KEY,
            "Content-Type": "application/json;charset=utf-8"
        }
    };

    request(options, function (err, res, body) {
        return resRouter.status(200).json(JSON.parse(body));
    });
})


module.exports = Router;