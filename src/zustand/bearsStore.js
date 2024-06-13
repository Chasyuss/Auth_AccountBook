import axios from "axios";
import { create } from "zustand";

const useBearsStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("accessToken"), //로그인 여부 확인
  accessToken: localStorage.getItem("accessToken"),
  user: null, // 사용자 정보 가져오기

  //로그인
  login: async (id, password) => {
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login?expiresIn=10h",
        { id, password }
      );
      const accessToken = response.data.accessToken; //accesstoken 추출
      const user = {
        // user 정보 추출
        userId: response.data.userId,
        avatar: response.data.avatar,
        nickname: response.data.nickname,
      };

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        set({ isAuthenticated: true, accessToken, user }); //상태업데이트
      } else {
        console.log("에러", error);
      }
    } catch (error) {
      alert("로그인에 실패하였습니다 ", error.response?.data?.message);
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ isAuthenticated: false, accessToken: null, user: null });
  },

  //토큰 유효성 확인
  checkToken: async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const response = await axios.get(
          "https://moneyfulpublicpolicy.co.kr/user",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const user = {
          userId: response.data.id,
          nickname: response.data.nickname,
          avatar: response.data.avatar,
        };
        set({ isAuthenticated: true, accessToken, user });
      } catch (error) {
        localStorage.removeItem("accessToken");
        set({ isAuthenticated: false, accessToken: null, user: null });
      }
    } else {
      set({ isAuthenticated: false, accessToken: null, user: null });
    }
  },

  //프로필 변경
  updateProfile: async (avatar, nickname) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const body = {
        avatar,
        nickname,
      };

      const response = await axios.patch(
        "https://moneyfulpublicpolicy.co.kr/profile",
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      //성공시
      const user = response.data;
      set({ user: { ...user } });
    } catch (error) {
      alert("프로필 변경에 실패하였습니다");
    }
  },
}));

export default useBearsStore;
