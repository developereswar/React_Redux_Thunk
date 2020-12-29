
export const  authHeader = ()=>{
    // return authorization header with basic auth credentials
    let user = "Bearer " + localStorage.getItem("token");
    if (user) {
        return user;
    } 
}

