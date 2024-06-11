import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { valid } from "uuid4";

const Join = () => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");

    const postTest = async () => {
        try {
            const response = await axios.post("https://moneyfulpublicpolicy.co.kr/register", {
                id: id,
                password: password,
                nickname: nickname,
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const JoinHandler = (e) => {
        e.preventDefault();
        postTest();

        setId("");
        setPassword("");
        setNickname("");

    };

    const gotoLogin = () => {
        navigate("/login");
    }
    return (
        <JoinWrapper>
            <Form>
                <Text> 회원가입 </Text>
                <JoinInput>
                    <Label>아이디:</Label>
                    <Input type="email" placeholder="아이디를 입력하세요" required minLength={4} maxLength={10} value={id} onChange={(e) => setId(e.target.value)} />
                </JoinInput>

                <JoinInput>
                    <Label>비밀번호:</Label>
                    <Input type="password" placeholder="비밀번호를 입력하세요" required minLength={4} maxLength={15} value={password} onChange={(e) => setPassword(e.target.value)} />
                </JoinInput>

                <JoinInput>
                    <Label>닉네임:</Label>
                    <Input type="text" placeholder="닉네임을 입력하세요" required minLength={1} maxLength={10} value={nickname} onChange={(e) => setNickname(e.target.value)} />
                </JoinInput>
                <Button type="submit" onClick={JoinHandler}>
                    회원가입
                </Button>
                <SignInButton onClick={gotoLogin}>로그인</SignInButton>
            </Form>
        </JoinWrapper>
    )
}

export default Join;

const JoinWrapper = styled.div`
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
    /* height: 60vh; */
    background-color: #f9f9f9;
    border-radius: 20px;
    align-items: center;
`;

const JoinInput = styled.div`
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

const SignInButton = styled.button`
    border: 1px solid #E0E7E9;
    border-radius: 40px ;
    padding: 10px;  
    background-color: #469098;
    cursor: pointer;
    width: 80%;
    margin: 10px;
    color: white;

    &:hover{
    background-color: #3f7081;
  }
`;
