import AxiosHelper from "../helpers/AxiosHelper";

async function createSignInRequest(phone, password) {
    return AxiosHelper.post("/users/signin", { phone, password });
}

async function createUserByAdmin(user) {
    return AxiosHelper({
        url: "/users/create",
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
    return AxiosHelper.post("/users/register", { phone, password, name, email });
}

async function getProfile() {
    return AxiosHelper.get("/users/me");
}

const UserRequest = {
    createSignInRequest,
    createUserByAdmin,
    getAllUser,
    createSignUpRequest,
    getProfile,
};
export default UserRequest;
