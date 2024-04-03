import { Schema, model, Document } from "mongoose";

class RefrechToken extends Document{
    private _username : string;
    private _token : string;
    
    public constructor (username:string,token: string) {
        super();
        this._username =  username;
        this._token = token;
    }
    
    public get username():string {
        return this._username;
    }
    public set username(username : string){
        this._username = username;
    }
    public get token(): string {
        return this._token;
    }

    public setToken(token: string) {
        if (token.length < 100 || token.length > 400) {
            throw new Error('Độ dài của token phải từ 100 đến 400 ký tự.');
        }
        this._token = token;
    }
}
const tokenSchema = new Schema<RefrechToken>({
    username: {
        type: String,
        required : false,
        minlength:6,
        maxlength:20,
        unipue:true
      
    },
    token: {
        type: String,
        required: false,
        minlength: 100,
        maxlength: 400,
        unipue:true
      
    }
}, { timestamps: true });



const RefrechTokenModel = model<RefrechToken>("refrechtokens", tokenSchema);

export default RefrechTokenModel;
