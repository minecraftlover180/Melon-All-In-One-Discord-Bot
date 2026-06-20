// © Author: itsfizys
// https://discord.gg/aerox



module.exports = {
    name: 'reactionroles',
    description: 'Show reaction roles commands',
    aliases: ['rr'],
    async execute(message, args) {
        if (!args || !args.length) {
            return require('../../lib/helpMenu').sendHelp('reactionroles', message);
        }
        const hybrid = require('../hybrid/reactionroles/reactionroles');
        if (hybrid && hybrid.execute) {
            return hybrid.execute(message, args);
        }
        return require('../../lib/helpMenu').sendHelp('reactionroles', message);
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