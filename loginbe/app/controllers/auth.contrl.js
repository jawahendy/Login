const db = require("../models");
const config = require("../config/auth");
var nodemailer = require('nodemailer');
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const firebaseAdmin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

const serviceAccount = require('../firebase/assasment-fbc66-firebase-adminsdk-foyh1-a29653d0d6.json');

const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

const storageRef = admin.storage().bucket(`gs://assasment-fbc66.appspot.com/`);

async function uploadFile(path, filename) {

    // Upload the File
    const storage = await storageRef.upload(path, {
        public: true,
        destination: `/uploads/image/${filename}`,
        metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
        }
    });


    return storage[0].metadata.mediaLink;
}


exports.signup = (req, res) => {

    User.create({
        username: req.body.username,
        email: req.body.email,
        fullname: req.body.fullname,
        password: bcrypt.hashSync(req.body.password, 8),
        // filephoto: url
    })
        .then(() => {
            var transport = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "de6676794a8d7b",
                    pass: "d831ae139b1d20"
                }
            });
            var mailOptions = {
                from: 'from@example.com',
                to: req.body.email,
                subject: 'Welcome To our website',

                html: '<h1>Welcome to our Website</h1>',
            };

            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Email sent: ' + info.response);
            });

            (async () => {
                const url = await uploadFile('../loginbe/app/img/bedil.png', "bedil.png");
                console.log(url);
            })();

            res.send({ message: "user registed please check Mail" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                fullname: user.fullname,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.updatepass = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var transport = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "de6676794a8d7b",
                    pass: "d831ae139b1d20"
                }
            });
            var mailOptions = {
                from: 'from@example.com',
                to: req.body.email,
                subject: 'Welcome To our website',

                html: '<a href="http://localhost:3000/updatedpass">Visit Here For new pasword</a>',
            };

            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Email sent: ' + info.response);
            });

            res.send({ message: "Check Email for update pass" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.updatepassToDb = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            User.update({ password: bcrypt.hashSync(req.body.password, 8) }, {
                where: {
                    username: req.body.username
                }
            }).then(() => {
                res.send({ message: "password updated" });
            }).catch(err => {
                res.status(500).send({ message: err.message });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};