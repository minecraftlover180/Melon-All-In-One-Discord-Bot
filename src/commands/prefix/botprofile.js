// © Author: itsfizys
// https://discord.gg/aerox



module.exports = {
    name: 'botprofile',
    description: 'Show bot profile commands',
    aliases: [],
    async execute(message, args) {
        if (!args || !args.length) {
            return require('../../lib/helpMenu').sendHelp('botprofile', message);
        }
        return require('../../lib/helpMenu').sendHelp('botprofile', message);
    }
};

/**
 * Project: Melon
 * Author: itsfizys (Aegis)
 * Organization: AeroX Development
 * GitHub: https://github.com/itsfizys
 * License: Custom
 * © 2026 AeroX Development. All rights reserved.
 */