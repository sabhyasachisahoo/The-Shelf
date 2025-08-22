export const validatePassword = (password, confirmPassword = null)=>{
    if(!password) return "Password is required";
    if(password.length < 8 || password.length >16){
        return "Password must be between 8 and 16 characters.";
    }
    if(confirmPassword !==null && password !== confirmPassword){
        return "Password and Confirm Password do not match.";
    }
    return null;
}