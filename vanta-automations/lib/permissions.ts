import type { NavModule, Role } from "./types";

export const canAccess = (role: Role, module: NavModule) => !module.roles || module.roles.includes(role);
