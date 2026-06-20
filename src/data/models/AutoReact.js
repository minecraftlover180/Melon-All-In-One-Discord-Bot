const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const BaseModel = require('../BaseModel');

class AutoReact extends BaseModel {
    static init(sequelize) {
        super.init(
            {
                id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
                guildId: { type: DataTypes.STRING, allowNull: false },
                trigger: { type: DataTypes.STRING, allowNull: false },
                emoji: { type: DataTypes.STRING, allowNull: false },
            },
            {
                sequelize,
                modelName: 'AutoReact',
                tableName: 'auto_react',
                timestamps: true,
                indexes: [
                    { fields: ['guildId'] },
                ],
            }
        );

        return this;
    }
}

module.exports = AutoReact;

/**
 * Project: Melon
 * Author: itsfizys (Aegis)
 * Organization: AeroX Development
 * GitHub: https://github.com/itsfizys
 * License: Custom
 * © 2026 AeroX Development. All rights reserved.
 */