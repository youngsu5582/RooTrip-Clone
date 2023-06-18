import { TypedParam } from "@nestia/core";

/**
 * Param 에 담겨져 있는 postId 를 추출해주는 Decorator
 * Nestia Library 를 사용하므로 TypedParam 으로 추출
 */
export const PostId = () => TypedParam("postId");
