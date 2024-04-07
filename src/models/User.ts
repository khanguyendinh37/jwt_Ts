import { Schema, model, Document } from 'mongoose';


interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  admin?:boolean;
}

const userSchema = new Schema <IUser>({
    username:{
        type: String,
        required : true,
        minlength:6,
        maxlength:20,
        unipue:true
    },
    email:{
        type: String,
        required : true,
        minlength:10,
        maxlength:50,
        unipue:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    admin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

userSchema.index({username:1,email:1},{unique:true});


export default model<IUser>('User', userSchema);//todo