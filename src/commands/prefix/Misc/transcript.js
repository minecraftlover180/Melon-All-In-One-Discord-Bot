// © Author: itsfizys
// https://discord.gg/aerox

module.exports = {
    name: 'transcript',
    description: 'Send the current ticket transcript',
    async execute(message, args) {
        const subcommand = require('../../hybrid/ticket/subcommands/transcript');
        return subcommand.execute(message, args);
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