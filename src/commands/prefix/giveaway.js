// © Author: itsfizys
// https://discord.gg/aerox



module.exports = {
    name: 'giveaway',
    description: 'Show giveaway commands',
    aliases: ['gw'],
    async execute(message, args) {
        if (!args || !args.length) {
            return require('../../lib/helpMenu').sendHelp('giveaway', message);
        }
        const hybrid = require('../hybrid/giveaway/giveaway');
        if (hybrid && hybrid.execute) {
            return hybrid.execute(message, args);
        }
        return require('../../lib/helpMenu').sendHelp('giveaway', message);
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