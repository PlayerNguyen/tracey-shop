import AxiosHelper from "../helpers/AxiosHelper";

async function createSignInRequest(phone, password) {
  return AxiosHelper.post("/users/signin", { phone, password });
}

async function createSignUpRequest(phone, password) {
  return AxiosHelper.post("/users/new", { phone, password });
}

const UserRequest = {
  createSignInRequest,
  createSignUpRequest,
};
export default UserRequest;
