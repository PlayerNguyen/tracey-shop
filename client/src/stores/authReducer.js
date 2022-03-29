import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import userApi from "../requests/UserRequest";

const initialState = {
    isAuthenticated: false,
    profile: {
        info: {
            username: "",
            phone: "",
            email: "",
            password: "",
        },
        modal: false,
        loading: false,
    },
};

const auth = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setProfileModal: (state, action) => {
            state.profile.modal = action.payload;
        },
        setProfileInfo: (state, action) => {
            state.profile.info = action.payload;
        },
        updateProfileInfo: (state, action) => {
            const { field, value } = action.payload;
            state.profile.info[field] = value;
        },
        setProfileLoading: (state, action) => {
            state.profile.loading = action.payload;
        },
    },
});

export const {
    setAuthenticated,
    updateProfileInfo,
    setProfileModal,
    setProfileInfo,
    setProfileLoading,
} = auth.actions;

function getProfile() {
    return async (dispatch) => {
        const profileResp = await userApi.getProfile();
        const { username, nickname, introduction, email } = profileResp.data;
        dispatch(
            setProfileInfo({
                username,
                nickname: nickname || "",
                introduction: introduction || "",
                email: email || "",
            })
        );
    };
}

function updateProfile() {
    return async (dispatch, getState) => {
        try {
            const appState = getState();
            const {
                profile: { info },
            } = appState.auth;
            dispatch(setProfileLoading(true));
            await userApi.updateProfile(info);
            toast.success("Cập nhật thành công.");
            dispatch(getProfile());
        } catch (e) {
            toast.error(
                e.response?.data?.error?.message ||
                    "Cập nhật tài khoản thất bại, vui lòng thử lại sau."
            );
            console.error(e);
        } finally {
            dispatch(setProfileLoading(false));
        }
    };
}

function logout() {
    return (dispatch) => {
        dispatch(setAuthenticated(false));
        localStorage.removeItem("token");
        toast.success("Đăng xuất thành công, hẹn gặp lại.");
    };
}

export { getProfile, updateProfile, logout };

export default auth.reducer;
