const Express = require('express');
const Router = Express.Router();
const dateFormat = require('dateformat');
const request = require("request");

Router.get("/time", function (req, res) {
    return res.status(200).json({time: dateFormat(new Date(), "mm/dd/yyyy")});
});

Router.get("/suggestion-upload", function (req, routerRes) {
    let options = {
        url: 'https://apis.sktelecom.com/v1/baas/data/Suggestion',
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "TDCProjectKey": process.env.BAAS_API_KEY,
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            "id": routerRes.params.id,
            "suggest": routerRes.params.suggest
        })
    };

    request(options, function (err, res, body) {
        console.log(body);
    });
});

Router.get("/request", function (req, routerRes) {
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
        return routerRes.status(200).json(JSON.parse(body));
    });
});


module.exports = Router;