import axios from "axios";
import { create } from "zustand";

const useBearsStore = create((set) => ({
  isAuthenticated: false,
  accessToken: localStorage.getItem("acessToken"),
  user: null,
  login: async (id, password) => {
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        { id, password }
      );
      const accessToken = response.data.accessToken;
      const user = response.data.user;

      if (accessToken) {
        localStorage.setItem("acessToken", accessToken);
        set({ isAuthenticated: true, accessToken, user });
        console.log("로그인 성공", response.data);
        alert("로그인되었습니다");
      } else {
        console.log("에러", error);
      }
    } catch (error) {
      console.error("로그인 실패 ");
      alert("로그인에 실패하였습니다");
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ isAuthenticated: false, accessToken: null, user: null });
  },

  checkToken: async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const response = await axios.get(
          "https://moneyfulpublicpolicy.co.kr/user",
          {
            Headers: { Authorization: "Bearer AccessToken" },
          }
        );
        const user = response.data.user;
        set({ isAuthenticated: true, accessToken, user });
      } catch (error) {
        localStorage.removeItem("accessToken");
        set({ isAuthenticated: false, accessToken: null, user: null });
      }
    }
  },
}));

export default useBearsStore;
