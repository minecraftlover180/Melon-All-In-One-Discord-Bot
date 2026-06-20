// © Author: itsfizys
// https://discord.gg/aerox



module.exports = {
    name: 'userprofile',
    description: 'Show user profile commands',
    aliases: [],
    async execute(message, args) {
        if (!args || !args.length) {
            return require('../../lib/helpMenu').sendHelp('userprofile', message);
        }
        return require('../../lib/helpMenu').sendHelp('userprofile', message);
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