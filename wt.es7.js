"use strict";

require("babel-core/register");
require("babel-polyfill");
const permute = require("email-permutator");

const verify = email => {
  return new Promise((resolve, reject) => {
    verifier.verify(email, (err, info) => {
      if (err) resolve(false);
      else {
        if (info.success == true) resolve(true);
        else resolve(false);
      }
      reject(null);
    });
  });
};
const filterEmails = emails => {
  return new Promise((resolve, reject) => {
    let filteredEmails = [];
    emails.map(async (email, i) => {
      const isVerified = await verify(email);
      if (isVerified) filteredEmails.push(email);
      if (i == emails.length - 1) {
        resolve(filteredEmails);
      }
    });
  });
};

module.exports = async function(context, cb) {
  const input = context.data;
  let emails = permute(input);
  emails = await filterEmails(emails);
  res.json(emails);
  cb(null, emails);
};
