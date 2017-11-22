const verify = require("./verify");
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

module.exports = filterEmails;
