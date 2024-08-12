"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banner = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const Banner = db_1.sq.define('Banner', {
    BannerID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    Description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    ValidTill: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    Link: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    IsVisible: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: true,
    freezeTableName: true,
    tableName: 'Banner'
});
exports.Banner = Banner;
