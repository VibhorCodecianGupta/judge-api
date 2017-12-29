"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const config = require("../../config");
const dbg = require("debug");
const debug = dbg('judge:db');
const db = new Sequelize(config.DB.DATABASE, config.DB.USERNAME, config.DB.PASSWORD, {
    dialect: 'postgres',
    host: config.DB.HOST,
    logging: debug,
    pool: {
        max: 10,
        idle: 10000
    }
});
exports.db = db;
const Langs = db.define('langs', {
    lang_slug: {
        type: Sequelize.STRING(10),
        primaryKey: true
    },
    lang_name: Sequelize.STRING(10),
    lang_version: Sequelize.STRING(5)
}, {
    timestamps: false
});
exports.Langs = Langs;
const Submissions = db.define('submissions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lang: {
        type: Sequelize.STRING(10),
        references: {
            model: Langs,
            key: 'lang_slug'
        }
    },
    start_time: Sequelize.DATE,
    end_time: Sequelize.DATE,
    results: Sequelize.ARRAY(Sequelize.INTEGER)
}, {
    paranoid: true,
    timestamps: false // Start and end times are already logged
});
exports.Submissions = Submissions;
const ApiKeys = db.define('apikeys', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    key: Sequelize.STRING(64)
});
exports.ApiKeys = ApiKeys;
Submissions.belongsTo(ApiKeys);
//# sourceMappingURL=models.js.map