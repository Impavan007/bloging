import joi from  'joi';
import passwordComplexity from 'joi-password-complexity'

export const Validate = (data) => {
    const schema = joi.object({
        userName: joi.string().required().label('userName'),
        email: joi.string().email().required().label('email'),
        password: passwordComplexity().required().label('password')
    });
    return schema.validate(data);
};

export const LoginValidate=(data)=>{
    const schema = joi.object({
        email:joi.string().email().required().label("email"),
        password:joi.string().required().label("password")
    })
    return schema.validate(data);
}