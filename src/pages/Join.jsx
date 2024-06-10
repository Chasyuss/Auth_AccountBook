import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Join = () => {
    const navigate = useNavigate();

    const gotoLogin = () => {
        navigate("/login");
    }
    return (
        <JoinWrapper>
            <Form>
                <Text> 회원가입 </Text>
                <JoinInput>
                    <Label>아이디:</Label>
                    <Input type="email" placeholder="아이디를 입력하세요" required />
                </JoinInput>

                <JoinInput>
                    <Label>비밀번호:</Label>
                    <Input type="password" placeholder="비밀번호를 입력하세요" required />
                </JoinInput>

                <JoinInput>
                    <Label>닉네임:</Label>
                    <Input type="text" placeholder="닉네임을 입력하세요" required />
                </JoinInput>
                <Button type="submit">
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
