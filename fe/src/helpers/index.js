import { PURE_BACKEND_HOST } from "../constants";

export const avatarUrl = ( userID ) => {
    return `${PURE_BACKEND_HOST}/avatars/${userID}.jpg`
}