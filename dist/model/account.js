'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passportLocalMongoose = require('passport-local-mongoose');

var _passportLocalMongoose2 = _interopRequireDefault(_passportLocalMongoose);

var _foodtruck = require('../controller/foodtruck');

var _foodtruck2 = _interopRequireDefault(_foodtruck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Account = new Schema({
    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    }

});

Account.plugin(_passportLocalMongoose2.default);
module.exports = _mongoose2.default.model('Account', (0, _foodtruck2.default)({ config: config, db: db }));
//# sourceMappingURL=account.js.map