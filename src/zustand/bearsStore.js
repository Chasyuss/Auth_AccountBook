import axios from "axios";
import { create } from "zustand";

const useBearsStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("accessToken"), //로그인 여부 확인
  accessToken: localStorage.getItem("accessToken"),
  user: null, // 사용자 정보 가져오기
  login: async (id, password) => {
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login?expiresIn=10h",
        { id, password }
      );
      const accessToken = response.data.accessToken; //accesstoken 추출
      const user = response.data.user; // user 정보 추출

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        set({ isAuthenticated: true, accessToken, user }); //상태업데이트
        console.log("로그인 성공", response.data);
        alert("로그인되었습니다");
      } else {
        console.log("에러", error);
      }
    } catch (error) {
      console.error("로그인 실패 ", error.response?.data?.message);
      alert("로그인에 실패하였습니다");
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ isAuthenticated: false, accessToken: null, user: null });
  },

  //토큰 유효성 확인
  checkToken: async () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken) {
      try {
        const response = await axios.get(
          "https://moneyfulpublicpolicy.co.kr/user",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const user = response.data.user;
        set({ isAuthenticated: true, accessToken, user });
      } catch (error) {
        console.error("토큰이 유효하지 않습니다.");
        localStorage.removeItem("accessToken");
        set({ isAuthenticated: false, accessToken: null, user: null });
        console.log("token 제거", localStorage.accessToken);
      }
    } else {
      console.error("토큰이 없습니다.");
      set({ isAuthenticated: false, accessToken: null, user: null });
    }
  },
}));

export default useBearsStore;
