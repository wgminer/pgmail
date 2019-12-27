// Read each user
// Send each mailer depending on where they are in the listconst pug = require('pug');

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");

const mailer = require("./mailer");
const Essay = require("./models/essay");
const User = require("./models/user");

const shuffle = function(v) {
  //+ Jonas Raoni Soares Silva
  //@ http://jsfromhell.com/array/shuffle [rev. #1]

  for (
    var j, x, i = v.length;
    i;
    j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x
  );
  return v;
};

mongoose.set("debug", false);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

(async () => {
  let email = "wgminer@gmail.com";
  let essays = await Essay.find({}).catch(err => console.error(err));
  let user = await User.find({ email }).catch(err => console.error(err));

  let sentUrls = [];

  if (user.sends && user.sends.length > 0) {
    sentUrls = user.sends.map(s => s.url);
  }

  let unsentEssays = [];

  essays.forEach(e => {
    if (sentUrls.indexOf(e.url) === -1) {
      unsentEssays.push(e);
    }
  });

  let { title, html } = shuffle(unsentEssays)[0];

  await mailer.send({
    from: "amazonses.com",
    to: email,
    subject: `Paul Graham: ${title}`,
    html
  });
  console.log("Sent: " + title);
  process.exit(0);
})();
