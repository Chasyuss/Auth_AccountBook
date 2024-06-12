import axios from "axios";

const JSON_SEVER_HOST = "http://localhost:5003";

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${JSON_SEVER_HOST}/expenses`);
    return response.data;
  } catch (err) {
    alert("데이터 불러오기 실패");
  }
};

export const postExpense = async (newExpense) => {
  try {
    const response = await axios.post(
      `${JSON_SEVER_HOST}/expenses`,
      newExpense
    );
    return response.data;
  } catch (err) {
    console.log(err);
    alert("데이터가 쓰기 실패");
  }
};
