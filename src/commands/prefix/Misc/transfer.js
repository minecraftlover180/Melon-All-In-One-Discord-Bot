// © Author: itsfizys
// https://discord.gg/aerox

module.exports = {
    name: 'transfer',
    description: 'Transfer the current ticket to another staff member',
    async execute(message, args) {
        const subcommand = require('../../hybrid/ticket/subcommands/transfer');
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