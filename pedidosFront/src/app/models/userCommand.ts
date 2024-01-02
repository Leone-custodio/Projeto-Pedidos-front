import { UserModel } from "./userModel";

export class UserCommand{
    success: boolean = false ;
    message: string = "";
    user?: UserModel;
    users?: UserModel[];
}