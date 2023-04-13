import { Controller } from "@nestjs/common";
import { UserService } from "src/providers/user.service";

@Controller("user")
export class UserController {
  constructor(private readonly _userService: UserService) {}
}
