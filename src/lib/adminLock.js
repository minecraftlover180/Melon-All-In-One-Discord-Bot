// © Author: itsfizys
// https://discord.gg/aerox



let adminLockEnabled = false;

function isAdminLockEnabled() {
  return adminLockEnabled;
}

function toggleAdminLock() {
  adminLockEnabled = !adminLockEnabled;
  return adminLockEnabled;
}

function setAdminLock(state) {
  adminLockEnabled = state;
  return adminLockEnabled;
}

module.exports = {
  isAdminLockEnabled,
  toggleAdminLock,
  setAdminLock
};

/**
 * Project: Melon
 * Author: itsfizys (Aegis)
 * Organization: AeroX Development
 * GitHub: https://github.com/itsfizys
 * License: Custom
 * © 2026 AeroX Development. All rights reserved.
 */