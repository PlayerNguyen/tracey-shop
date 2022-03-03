import AxiosHelper from "../helpers/AxiosHelper";

async function createSignInRequest(phone, password) {
  return AxiosHelper.post("/users/signin", { phone, password });
}

async function createSignUpRequest(phone, name, password, email) {
  console.log({ phone, password, name, email });
  return AxiosHelper.post("/users/new", { phone, password, name, email });
}

const UserRequest = {
  createSignInRequest,
  createSignUpRequest,
};
export default UserRequest;
