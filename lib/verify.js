const verifier = require("email-verify");
const verify = email => {
  return new Promise((resolve, reject) => {
    verifier.verify(email, (err, info) => {
      if (err) resolve(false);
      else {
        if ((info.success == true)) resolve(true);
        else resolve(false);
      }
      reject(null);
    });
  });
};

module.exports = verify;
