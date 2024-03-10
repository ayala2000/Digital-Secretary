  import { CanActivate, ExecutionContext, Injectable, UnauthorizedException,} from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        console.log("no token");               
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync( token );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch(err) {
        console.log("cath token", err);
        
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      console.log("55",request.headers)
      const [type, token] = request.headers.authorization.split(' ');
      console.log("tokenn",token);''
      return token;
    }
  }