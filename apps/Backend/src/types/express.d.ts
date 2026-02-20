import {User} from "@hooli/shared"


declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}