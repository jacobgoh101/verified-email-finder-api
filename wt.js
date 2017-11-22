"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("babel-core/register");
require("babel-polyfill");
var permute = require("email-permutator");

var verify = function verify(email) {
  return new Promise(function (resolve, reject) {
    verifier.verify(email, function (err, info) {
      if (err) resolve(false);else {
        if (info.success == true) resolve(true);else resolve(false);
      }
      reject(null);
    });
  });
};
var filterEmails = function filterEmails(emails) {
  return new Promise(function (resolve, reject) {
    var filteredEmails = [];
    emails.map(function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email, i) {
        var isVerified;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return verify(email);

              case 2:
                isVerified = _context.sent;

                if (isVerified) filteredEmails.push(email);
                if (i == emails.length - 1) {
                  resolve(filteredEmails);
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  });
};

module.exports = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(context, cb) {
    var input, emails;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            input = context.data;
            emails = permute(input);
            _context2.next = 4;
            return filterEmails(emails);

          case 4:
            emails = _context2.sent;

            res.json(emails);
            cb(null, emails);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
