import React from "react";
import styled from "styled-components";
import Table from "./Table";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <Container>
      <Wrapper>
        <Content>
          <Add>
            <Link to={"/add"}><span>+</span>
            Create Invoice</Link>
          </Add>
          <Search>
            <input type="text" placeholder="Search Invoice" />
            <Down><input type="text" placeholder="status invoice" /><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+" alt="" /></Down>
          </Search>
        </Content>
        <Table />
        
      </Wrapper>
    </Container>
  );
};
const Down=styled.div`
  border: 2px solid black;
  display: flex;
  align-items: center;
  border-radius:10px;
  padding-right: 5px;
 


  input{
    border: none;
    height: 100%;
  }
  img{
    width: 15px;
    height: 15px;
   
  }
`
const Container = styled.div`
width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px;
  box-sizing: border-box;
`;
const Wrapper=styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;
  background: #fff;
  padding: 25px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  /* background-color: red; */
`
const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Add = styled.div`
  padding: 10px;
  background-color: #8c55ff;
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;

  a{
    color: white;
    text-decoration: none;
    font-weight: 600;
  }
`;
const Search = styled.div`
  display: flex;
  gap: 10px;
  height: 39px;
  input{
    padding-left: 5px;
    height: 100%;
    outline: none;
    border-radius: 10px;
  }
`;

export default Home;
