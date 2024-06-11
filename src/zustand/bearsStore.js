import axios from "axios";
import { create } from "zustand";

const useBearsStore = create((set) => ({
  isAuthenticated: false,
  accessToken: localStorage.getItem("acessToken"),
  login: async (id, password) => {
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        { id, password }
      );
      const accessToken = response.data.accessToken;

      if (accessToken) {
        localStorage.setItem("acessToken", accessToken);
        set({ isAuthenticated: true, accessToken });
        console.log("로그인 성공", response.data);
      } else {
        console.log("에러", error);
      }
    } catch (error) {
      console.error("로그인 실패 ");
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ isAuthenticated: false, accessToken: null });
  },
}));

export default useBearsStore;
