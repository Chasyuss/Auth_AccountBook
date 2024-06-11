import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useBearsStore from "../zustand/bearsStore";

const Login = () => {
    const navigate = useNavigate();
    const [loginid, setLoginid] = useState("");
    const [loginpassword, setLoginpassword] = useState("");
    const login = useBearsStore((state) => state.login);

    const handleLogin = async (e) => {
        e.preventDefault();
        // Login();
        await login(loginid, loginpassword);
        if (useBearsStore.getState().isAuthenticated) { // 로그인 성공했을때 홈으로 넘어가기 
            navigate('/');
        } else {
            navigate("/join");
        }
        setLoginid("");
        setLoginpassword("");
    }

    // const Login = async () => {
    //     e.preventDefault();

    //     // try {
    //     //     const response = await axios.post("https://moneyfulpublicpolicy.co.kr/login", {
    //     //         id: loginid,
    //     //         password: loginpassword,
    //     //     });
    //     //     console.log(response.data);

    //     //     const accessToken = response.data.accessToken;

    //     //     if (accessToken) {
    //     //         localStorage.setItem('accessToken', accessToken);
    //     //         console.log("token 저장 완료", accessToken);
    //     //     } else {
    //     //         console.error("에러 ");
    //     //     }
    //     //     // navigate("/");
    //     // } catch (error) {
    //     //     console.error("로그인 실패");
    //     // }
    // };

    const gotoJoin = () => {
        navigate("/join");
    };
    return (
        <LoginWrapper>
            <Form>
                <Text> 로그인 </Text>
                <LoginInput>
                    <Label>아이디:</Label>
                    <Input type="email" placeholder="아이디를 입력하세요" required value={loginid} onChange={(e) => setLoginid(e.target.value)} />
                </LoginInput>
                <LoginInput>
                    <Label>비밀번호:</Label>
                    <Input type="password" placeholder="비밀번호를 입력하세요" required value={loginpassword} onChange={(e) => setLoginpassword(e.target.value)} />
                </LoginInput>
                <Button type="submit" onClick={handleLogin}>
                    로그인
                </Button>
                <SignUpButton onClick={gotoJoin}>회원가입</SignUpButton>
            </Form>
        </LoginWrapper>
    )
}

export default Login;

const LoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;
const Text = styled.div`
    text-align: center;
    font-size: 35px;
    margin-top: 15px;
`;
const Form = styled.div`
    border: 1px solid #ccc;
    margin: 20px;
    padding: 15px; 
    display: flex;
    flex-direction: column;
    width: 50vw;
    height: 50vh;
    background-color: #f9f9f9;
    border-radius: 20px;
    align-items: center;
`;

const LoginInput = styled.div`
    margin: 10px;
    text-align: center;
`;
const Label = styled.label`
    font-size: 15px;
`;

const Input = styled.input`
    padding: 10px;
    margin: 10px;
    border: 1px solid;
    border-radius: 20px;
    width: 300px;
`;

const Button = styled.button`
    border: 1px solid #A3C6C4;
    border-radius: 40px ;
    padding: 10px;  
    background-color: #A3C6C4;
    cursor: pointer;
    width: 80%;

    &:hover{
    background-color: #71b0a4;
  }

`;

const SignUpButton = styled.button`
    border: 1px solid #E0E7E9;
    border-radius: 40px ;
    padding: 10px;  
    background-color: #375f70;
    cursor: pointer;
    width: 80%;
    margin: 10px;
    color: white;

    &:hover{
    background-color: #4d8e94;
  }
`;
