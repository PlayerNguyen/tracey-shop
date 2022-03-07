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
    console.log({ phone, password, name, email });
    return AxiosHelper.post("/users/register", { phone, password, name, email });
}

const UserRequest = {
    createSignInRequest,
    createUserByAdmin,
    getAllUser,
    createSignUpRequest,
};
export default UserRequest;
