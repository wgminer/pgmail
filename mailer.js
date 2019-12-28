const nodemailer = require("nodemailer");
const AWS = require("aws-sdk");

const transporter = nodemailer.createTransport({
  SES: new AWS.SES({
    apiVersion: "2010-12-01",
    region: "us-east-1"
  })
});

function send(email) {
  return new Promise(async (resolve, reject) => {
    transporter.sendMail(email, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
}

module.exports = {
  send
};
