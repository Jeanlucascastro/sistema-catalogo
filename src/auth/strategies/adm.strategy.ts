import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService) {
      }
    
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('user', user);

    // Verifique se o usuário possui permissões de admin
    if (user) {
      return this.authService.validateAdmin(user.email)
    }

    return false;
  }
}