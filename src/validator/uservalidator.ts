import {z} from 'zod';
import {User} from '../interface/userinterface'
export const userSchema= z.object({
	firstName:z.string().min(1),  
    lastName:z.string().min(1), 
    email:z.string().email(),
    password:z.string().min(6),
});

export const validateUserData=(userData:any):{isValid:boolean, errors?:any}=>{
try{
    const validateData=userSchema.parse(userData);
    return  {isValid:true};
}
catch (error) {
    if(error instanceof z.ZodError){
        console.error('Validation error', error);
        return {isValid:false,errors:error.errors};
    }
    else{
    console.error('Error creating user', error);
    return {isValid:false,errors:{message:'Server error'}};
    }
}
    
    };