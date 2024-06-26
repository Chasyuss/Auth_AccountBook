import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Layout";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getExpenses } from '../lib/api/expense';
import { postExpense } from '../lib/api/expense';
import { useMutation } from '@tanstack/react-query';
import uuid4 from 'uuid4';
import useBearsStore from '../zustand/bearsStore';


const Home = () => {
    const navigate = useNavigate();
    const queryClient = new QueryClient();
    const { isAuthenticated, user } = useBearsStore();

    const mutation = useMutation({
        mutationFn: postExpense, onSuccess: () => {
            queryClient.invalidateQueries(["expenses"]); // query 키값을 다 초기화시킴 
            navigate(0); //화면 껐다 키기지만 넘어가지는 않음 
        },
    });

    const months = [
        '1월', '2월', '3월', '4월', '5월', '6월',
        '7월', '8월', '9월', '10월', '11월', '12월'
    ];

    const [activeMonth, setActiveMonth] = useState(() => {
        return localStorage.getItem("activeMonth") || "1월";
    });

    useEffect(() => {
        localStorage.setItem("activeMonth", activeMonth);
    }, [activeMonth]);

    const handleTab = (month) => {
        setActiveMonth(month);
    };

    const { data: expenses = [], isLoading, error } = useQuery({ queryKey: ["expenses"], queryFn: getExpenses });

    const filteredExpenses = expenses.filter(expense => {
        const expenseMonth = new Date(expense.date).getMonth() + 1 + '월';
        return expenseMonth === activeMonth;
    });

    const [date, setDate] = useState(""); // Date
    const [item, setItem] = useState(""); // Item
    const [amount, setAmount] = useState(""); // Amount
    const [description, setDescription] = useState(""); // Description


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!date || !amount) {
            alert('날짜와 금액을 입력해주세요');
            return;
        }

        const newExpense = {
            id: uuid4(),
            date,
            item,
            amount,
            description,
            createdBy: user.userId,
        };


        mutation.mutate(newExpense);


        setDate('');
        setItem('');
        setAmount('');
        setDescription('');
    };

    return (
        <>
            <Navbar />
            <form onSubmit={handleSubmit}>
                <Container>
                    <Input>
                        <label> 날짜 </label>
                        <DateInput type="text" placeholder='YYYY-MM-DD' value={date} onChange={(e) => setDate(e.target.value)} />
                        <label> 항목 </label>
                        <InputTitle type="text" placeholder='지출 항목' value={item} onChange={(e) => setItem(e.target.value)} />
                        <label> 금액 </label>
                        <MoneyInput type="number" placeholder='지출 금액' value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <label> 내용 </label>
                        <TextInput type="text" placeholder='지출 내용' value={description} onChange={(e) => setDescription(e.target.value)} />
                        <AddButton type="submit"> 저장 </AddButton>
                    </Input>

                    <Tabs>
                        {months.map((month, index) => (
                            <Tab key={index} $active={activeMonth === month} onClick={() => handleTab(month)} > {month} </Tab>
                        ))}
                    </Tabs>
                    <Content>
                        {filteredExpenses.length > 0 ? (
                            filteredExpenses.map((item) => (
                                <List key={item.id} onClick={() => navigate(`/detail/${item.id}`)}>
                                    <DateWrapper> {item.date} </DateWrapper>
                                    <MoneyWrapper> {item.amount}원 </MoneyWrapper>
                                    <Description> {item.item}: {item.description} </Description>
                                    <CreateBy> 작성자: {item.createdBy} </CreateBy>
                                </List>
                            ))
                        ) : (
                            '해당 월에 지출 내역이 없습니다.'
                        )}
                    </Content>
                </Container>
            </form >
        </>
    );
};

export default Home;



const Input = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  border: 1px solid #ccc; 
  border-radius: 4px;
  padding: 20px;
  background-color: #f9f9f9;
  font-size: 15px;
`;

const DateInput = styled.input`
  margin: 0 10px;
  padding: 10px;
  width: 100px;
`;

const InputTitle = styled.input`
  margin: 0 10px;
  padding: 10px;
  width: 150px;
`;

const MoneyInput = styled.input`
  margin: 0 10px;
  padding: 10px;
  width: 150px;
`;

const TextInput = styled.input`
  margin: 0 10px;
  padding: 10px;
  width: 150px;
`;

const AddButton = styled.button`
  padding: 13px;
  background-color: #A3C6C4;
  border: 1px solid #A3C6C4;
  border-radius: 10px;
  cursor: pointer;

  &:hover{
    background-color: #71b0a4;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap; // 6개씩 보이게 만들기
  justify-content: space-between;
  margin: 20px 0;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  border-radius: 4px;
  padding: 20px;
`;

const Tab = styled.div`
  margin: 5px;
  width: 10%;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  background-color: ${props => (props.$active ? '#A3C6C4' : '#E0E7E9')}; 
  color: ${props => (props.$active ? 'white' : 'black')}; // 글씨 색상 
  border-radius: 4px;

  &:hover {
    background-color: ${props => (props.$active ? '#A3C6C4' : '#E0E7E9')}; //클릭시 색상
  }
`;

const Content = styled.div`
  margin-top: 20px;
  width: 80%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  border-radius: 10px;
`;

const List = styled.div`
    border: 1px solid #E0E7E9;
    margin: 10px;
    padding: 15px;
    border-radius: 20px;
    background-color:#E0E7E9;
    cursor: pointer;

    &:hover{
        background-color: #71b0a4;
    }
`;

const DateWrapper = styled.div`
    font-size: 14px;
    color: grey;
`;

const MoneyWrapper = styled.div`
    text-align: end;
    color: #d47f66;
`;

const Description = styled.div`
    /* 내용이 지정된 영역을 넘어설때 hidden */
    overflow: hidden;
    /* 공백 유지, 강제 한줄 처리 */
    white-space: nowrap;
    /* 한 줄이상의 컨텐츠일 경우 … 표시 */
    text-overflow: ellipsis;  
    color: #1e2945;
    font-size: 16px;
    margin: 4px;
`;

const CreateBy = styled.div`
    font-size: 15px;
    text-align: right;
    color: #1e2945;
`;