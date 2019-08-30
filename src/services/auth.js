import md5 from 'md5';

export function signUpUser(user) {
    const response = {success: false, payload: {}};
    const latestID = localStorage.getItem("latest_id", 0);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const res = users.find((item) => {return user.email === item.email});
    if(!res) {
        user.id = latestID + 1;
        user.password = md5(user.password);
        localStorage.setItem("latest_id", user.id);
        localStorage.setItem("user_id", user.id);
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        response.success = true;
        response.payload = user.id;
    }
    return response;
}

export function signinUser(user) {
    const response = {success: false, payload: {}};
    const password = md5(user.password);
    const users = JSON.parse(localStorage.getItem("users"));
    if(users) {
        const res = users.find(item => item.email === user.email && item.password === password);
        if(res) {
            localStorage.setItem("user_id", res.id);
            response.success = true;
            response.payload = res.id;
        }
    }
    return response;
}

export function logoutUser() {
    const response = {success: false, payload: {}};
    localStorage.removeItem('user_id');
    response.success = true;
    return response;
}