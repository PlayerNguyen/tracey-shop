import AxiosHelper from "../helpers/AxiosHelper";

async function createSignInRequest(phone, password) {
  return AxiosHelper.post("/users/signin", { phone, password });
}

const UserRequest = {
  createSignInRequest,
};
export default UserRequest;
