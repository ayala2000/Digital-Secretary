import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,private authService:AuthService ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization.split(' ');
    const user = request.query;

    // console.log(
    // this.authService.decodeToken(token));

    console.log(user);
    
   // console.log('req \n\tuest',request);
    console.log(requiredRoles.some((role) => user.roles?.includes(role)));

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}