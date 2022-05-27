const verifySignUp = require("../middleware/signupver");
const controller = require("../controllers/auth.contrl");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/signup",
        [
            verifySignUp.Checkemail,
        ],
        controller.signup
    );
    app.post("/api/signin", controller.signin);
    app.post("/api/forgotpass", controller.updatepass);
    app.post("/api/updatepassDb", controller.updatepassToDb);
};