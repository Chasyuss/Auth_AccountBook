import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useBearsStore from '../zustand/bearsStore';
import { useEffect } from 'react';


const Layout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, checkToken, user } = useBearsStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    logout: state.logout,
    checkToken: state.checkToken,
    user: state.user,
  }));

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);


  const handleLogout = () => {
    logout();
    alert("로그아웃 되었습니다");
    navigate('/login');
  }

  return (
    <Container>
      {isAuthenticated && (
        <Nav>
          <Logo>Account</Logo>
          <NavList>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/profile"> 내 프로필 </NavLink>
            {user && (
              <>
                {user.avatar ? (
                  <Avatar src={user.avatar} alt="Profile" />
                ) : (
                  <DefaultAvatar>{user.nickname?.charAt(0)}</DefaultAvatar>
                )}
                <Nickname> {user?.nickname} </Nickname>
              </>
            )}
            <LoginBtn onClick={handleLogout}> 로그아웃 </LoginBtn>
          </NavList>
        </Nav>
      )}
    </Container>
  );
};

export default Layout;

const Container = styled.div`
    
`;

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

const Nickname = styled.div`
  color: #333;
  margin: 0 10px;
  padding: 10px;
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

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const DefaultAvatar = styled.div`
    width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
`;