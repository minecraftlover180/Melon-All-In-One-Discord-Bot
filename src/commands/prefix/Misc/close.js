// © Author: itsfizys
// https://discord.gg/aerox

module.exports = {
    name: 'close',
    description: 'Close the current ticket',
    async execute(message, args) {
        const subcommand = require('../../hybrid/ticket/subcommands/close');
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