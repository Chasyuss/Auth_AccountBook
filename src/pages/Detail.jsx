import { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { QueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getExpenses, putExpense, deleteExpense } from '../lib/api/expense';
import useBearsStore from '../zustand/bearsStore';

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = new QueryClient();
    const { user } = useBearsStore();

    const { data: expenses = [], isLoading, error } = useQuery({ queryKey: ["expenses"], queryFn: getExpenses });

    const item = expenses.find(item => item.id === id);

    const dateRef = useRef();
    const itemRef = useRef();
    const amountRef = useRef();
    const descriptionRef = useRef();

    useEffect(() => {
        if (item) {
            dateRef.current.value = item.date;
            itemRef.current.value = item.item;
            amountRef.current.value = item.amount;
            descriptionRef.current.value = item.description;
        }
    }, [item]);

    //query이용
    const editMutation = useMutation({
        mutationFn: putExpense,
        onSuccess: () => {
            queryClient.invalidateQueries(["expenses"]);
            navigate('/');
        },
    });

    const handleEdit = () => {
        const editItem = {
            ...item,
            date: dateRef.current.value,
            item: itemRef.current.value,
            amount: parseFloat(amountRef.current.value),
            description: descriptionRef.current.value,
            createdBy: user.userId,
        };

        editMutation.mutate(editItem);
    };

    const deleteMutation = useMutation({
        mutationFn: deleteExpense,
        onSuccess: () => {
            queryClient.invalidateQueries(["expenses"]);
            navigate('/');
        },
    });


    const handleDelete = () => {
        if (confirm('정말로 이 지출 항목을 삭제하시겠습니까?')) {
            deleteMutation.mutate(item.id);
        }
    };



    const handleBack = () => {
        navigate(-1);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div> 데이터 불러오기 Error....</div>;
    if (!item) return <div>항목을 찾을 수 없습니다.</div>;

    return (
        <DetailContainer>
            <Title>정보</Title>
            <Detailinput>
                <Label>날짜</Label>
                <Input type="text" defaultValue={item.date} ref={dateRef} />
            </Detailinput>
            <Detailinput>
                <Label>항목</Label>
                <Input type="text" defaultValue={item.item} ref={itemRef} />
            </Detailinput>
            <Detailinput>
                <Label>금액</Label>
                <Input type="text" defaultValue={item.amount} ref={amountRef} />
            </Detailinput>
            <Detailinput>
                <Label>내용</Label>
                <Input type="text" defaultValue={item.description} ref={descriptionRef} />
            </Detailinput>
            <AllButton>
                <EditButton onClick={handleEdit}>수정</EditButton>
                <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
                <Button onClick={handleBack}>뒤로가기</Button>
            </AllButton>
        </DetailContainer>
    );
};

export default Detail;

const Title = styled.div`
    font-size: 30px;
    text-align: center;
    margin-bottom: 15pxd;
`;
const DetailContainer = styled.div`
    border: 1px solid #333;
    margin: 20px;
    padding: 15px; 
    display: flex;
    flex-direction: column;
    width: 80vw;
    height: 80vh;
    background-color: #f9f9f9;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 10px;
`;

const Input = styled.input`
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
    border: 1px solid;
    border-radius:20px;

`;

const Detailinput = styled.div`
    margin-bottom: 15px;
`;

const AllButton = styled.div`
    display: flex;
    justify-content: center;
    margin: 15px;
`;
const EditButton = styled.button`
    padding: 10px 20px; 
    background-color: #A3C6C4;
    border: 1px solid #A3C6C4;
    cursor: pointer;
    margin: 0 10px;
`;
const DeleteButton = styled.button`
    padding: 10px 20px;
    border: 1px solid #ffa28e;
    background-color: #ffa28e;
    cursor: pointer;
    margin: 0 10px;
`;
const Button = styled.button`
    padding: 10px 20px; 
    border: 1px solid #89869e;
    background-color: #89869e;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 10px;
`;