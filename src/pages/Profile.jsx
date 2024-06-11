import React from 'react'
import styled from 'styled-components';
import Navbar from "./Layout";

const Profile = () => {
    return (
        <>
            <Navbar />
            <ProfileWrapper>
                <Form>
                    <Title> 프로필 수정 </Title>
                    <Label>프로필 이미지 변경</Label>
                    <Input type="file" />
                    <Label> 닉네임 변경 </Label>
                    <Input type="text" />
                    <Updatebtn> 수정하기 </Updatebtn>
                </Form>
            </ProfileWrapper>
        </>
    )
}

export default Profile;

const ProfileWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;

const Form = styled.div`
    border: 1px solid #ccc;
    padding: 15px; 
    display: flex;
    flex-direction: column;
    width: 50vw;
    height: 65vh;
    background-color: #f9f9f9;
    border-radius: 20px;
    justify-content: center;
    margin-top: 10px;
`;

const Title = styled.label`
    text-align: center;
    font-size: 30px;
    margin-bottom: 15px;
`;


const ProfileImage = styled.div`

`;

const Label = styled.label`
    margin: 15px;
    text-align: center;
`;

const Input = styled.input`
    border: 1px solid #333;
    border-radius: 10px;
    padding: 7px;

`;

const Updatebtn = styled.button`
    margin-top: 50px ;
    background-color:  #A3C6C4;
    border: 1px solid #A3C6C4;
    border-radius: 40px;
    padding: 10px;
    cursor: pointer;

    &:hover{
        background-color: #71b0a4;
    }
`;

