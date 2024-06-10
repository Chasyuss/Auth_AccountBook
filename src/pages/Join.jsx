import styled from "styled-components";

const Join = () => {
    return (
        <LoginWrapper>
            <Form>
                <Text> 로그인 </Text>
                <LoginInput>
                    <Label>아이디:</Label>
                    <Input type="email" placeholder="아이디를 입력하세요" required />
                </LoginInput>
                <LoginInput>
                    <Label>비밀번호:</Label>
                    <Input type="password" placeholder="비밀번호를 입력하세요" required />
                </LoginInput>
                <Button type="submit">
                    로그인
                </Button>
                <SignUpButton>회원가입</SignUpButton>
            </Form>
        </LoginWrapper>
    )
}

export default Join;

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
    background-color: #E0E7E9;
    cursor: pointer;
    width: 80%;
    margin: 10px;

    &:hover{
    background-color: #71b0a4;
  }
`;
