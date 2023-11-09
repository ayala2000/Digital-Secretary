import { Role } from "src/roles/role.enum";

export interface User {
    name: string;
    email: string;
    password: string;
    role: Role;

  }