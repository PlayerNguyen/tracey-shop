import AxiosHelper from "../helpers/AxiosHelper";

async function createSignInRequest(phone, password) {
    return AxiosHelper.post("/users/signin", { phone, password });
}

async function register(user) {
    return AxiosHelper({
        url: "/users/new",
        method: "POST",
        data: user,
    });
}

async function getAllUser() {
    return AxiosHelper({
        url: "/users",
        method: "GET",
    });
}

async function createSignUpRequest(phone, name, password, email) {
    console.log({ phone, password, name, email });
    return AxiosHelper.post("/users/new", { phone, password, name, email });
}

const UserRequest = {
    createSignInRequest,
    register,
    getAllUser,
    createSignUpRequest,
};
export default UserRequest;
