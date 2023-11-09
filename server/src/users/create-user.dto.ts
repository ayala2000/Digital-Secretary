import { Role } from "src/roles/role.enum";

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: Role;
  
}