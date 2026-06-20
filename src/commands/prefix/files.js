// © Author: itsfizys
// https://discord.gg/aerox



const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'files',
    description: 'Show server files commands',
    aliases: ['serverfiles'],
    async execute(message, args) {
        if (!args || !args.length) {
            return require('../../lib/helpMenu').sendHelp('files', message);
        }
        const sub = args[0].toLowerCase();
        const subPath = path.join(__dirname, 'dump', `${sub}.js`);
        if (fs.existsSync(subPath)) {
            return require(subPath).execute(message, args.slice(1));
        }
        return require('../../lib/helpMenu').sendHelp('files', message);
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