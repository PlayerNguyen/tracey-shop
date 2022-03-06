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

const UserRequest = {
    createSignInRequest,
    register,
    getAllUser,
};
export default UserRequest;
