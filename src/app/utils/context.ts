import { getContext } from "../../libs/async-context";
import { USER_KEY } from "../middleware/auth";
import type { User } from "../models/users";

/**
 * Get the app storage from the current request context.
 */
export function getStorage() {
  return getContext().storage;
}

/**
 * Get the current authenticated user from app storage.
 */
export function getCurrentUser(): User {
  return getStorage().get(USER_KEY);
}
