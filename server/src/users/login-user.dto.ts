import { Role } from "src/roles/role.enum";

export class LoginUserDto {

    id:number;
    name:string;
    email: string;
    password: string;
    role:Role;
  }