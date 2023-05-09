import { Controller } from "@nestjs/common";
import { PostService } from "src/providers/post.service";

@Controller("photo")
export class PostController {
    constructor(private readonly _postService :PostService){}
    
}