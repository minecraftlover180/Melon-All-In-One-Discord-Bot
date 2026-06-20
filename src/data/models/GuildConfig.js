// © Author: itsfizys
// https://discord.gg/aerox

const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const BaseModel = require('../BaseModel');

class GuildConfig extends BaseModel {
    static init(sequelize) {
        super.init(
            {
                id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
                guildId: { type: DataTypes.STRING, allowNull: false, unique: true, comment: 'Discord Guild ID' },
                autoreactEnabled: { type: DataTypes.BOOLEAN, defaultValue: true, comment: 'Whether AutoReact is enabled' },
                loggingEnabled: { type: DataTypes.BOOLEAN, defaultValue: false, comment: 'Master toggle for logging' },
                welcomeInOn: { type: DataTypes.BOOLEAN, defaultValue: false, comment: 'Master toggle for welcome messages' },
                welcomeOutOn: { type: DataTypes.BOOLEAN, defaultValue: false, comment: 'Master toggle for farewell messages' },
                aiChannelIds: { type: DataTypes.JSON, defaultValue: [], comment: 'Channels where AI is enabled' },
            },
            {
                sequelize,
                modelName: 'GuildConfig',
                tableName: 'guild_config',
                timestamps: true,
                indexes: [
                    {
                        unique: true,
                        fields: ['guildId'],
                    },
                ],
            }
        );
        return this;
    }
}

module.exports = GuildConfig;

/*
: ! Aegis !
    + Discord: itsfizys
    + Portfolio: https://itsfiizys.com
    + Community: https://discord.gg/8wfT8SfB5Z  (Melon )
    + for any queries reach out Community or DM me.
*/

/**
 * Project: Melon
 * Author: itsfizys (Aegis)
 * Organization: AeroX Development
 * GitHub: https://github.com/itsfizys
 * License: Custom
 * © 2026 AeroX Development. All rights reserved.
 */