
export const setToken = (token) =>{
     localStorage.setItem('token', JSON.stringify(token));
}

export const getToken  = () => {
    const token = localStorage.getItem('token');
    if(!token) return null;
    return JSON.parse(token);
}

export const removeToken  = () => {
   localStorage.removeItem('token')
}