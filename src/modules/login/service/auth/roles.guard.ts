import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

//import { User } from "./entities/user.entity";
import { Role } from "./role.enum";
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector,
        private jwtTokenService: JwtService
        ) { }
    canActivate(context: ExecutionContext): boolean {
        const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requireRoles) {
            return true;
        }

        const {rawHeaders} = context.switchToHttp().getRequest();

        const istoken = rawHeaders.find(x => x.indexOf("Bearer") !== -1);
        let token: string = "";
        if(!!istoken){
            token = istoken.split(" ")[1];
        }
        
        //console.log("DATAA ?>> " , this.jwtTokenService.decode(token))
        const user:any = this.jwtTokenService.decode(token);
        
     
        return requireRoles.some(role => user.role.includes(role));
    }
}