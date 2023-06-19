// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { UsersService } from '../users/users.service';
// import { AuthService } from '../auth/auth.service';


// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   constructor(private readonly userService: UsersService, private readonly authService: AuthService) {}

//   async use(req: Request, res: Response, next: NextFunction) {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (token) {
//       const payload = this.authService.validateToken(token);
//       if (payload) {
//         const user = await this.userService.findByEmail(payload.email);
//         if (user) {
//           req.user = user;
//         }
//       }
//     }
//     next();
//   }
// }