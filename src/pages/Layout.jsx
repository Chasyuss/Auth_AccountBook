import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Layout = () => {
    return (
        <Nav>
            <Logo>Account</Logo>
            <NavList>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/profile"> 내 프로필 </NavLink>
                <LoginBtn> 로그인 </LoginBtn>
            </NavList>
        </Nav>
    );
};

export default Layout;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 10px 20px;
  border: 1px solid #ccc; 
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  /* z-index: 1000; */
`;

const Logo = styled.div`
  color: #333;
  font-size: 24px;
  font-weight: bold;
`;

const NavList = styled.div`
  display: flex;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  margin: 0 10px;
  padding: 10px;

  &:hover {
    background-color: #71b0a4;
    border-radius: 5px;
  }
`;

const LoginBtn = styled.button`
    background-color: #A3C6C4;
    border: 1px solid #A3C6C4; 
    border-radius: 10px;
    padding: 10px;

    &:hover{
    background-color: #71b0a4;
  }
`;
