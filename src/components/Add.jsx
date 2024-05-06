import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import DropMenu from "./DropMenu";
import { useNavigate } from "react-router-dom";



const Add = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [total, setTotal] = useState("");
  const [date, setDate] = useState("");
  const [balance, setBalance] = useState("");
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [status,setStatus]=useState("")
  const [jsonObject, setJsonObject] = useState({});
  const navigate=useNavigate()
  
  const handleName=(e)=>{
    setName(e.target.value)
    const word = name.split(" ");
      const newWord = word
      .map((e) => {
        return e.charAt(0).toUpperCase();
      })
      .join("");
      setAlt(newWord);
      console.log(alt);
  }
  // console.log(name);
  const handleStatus=(e)=>{
    setStatus(e)
  }
  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log("file",file);

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageUrl = e.target.result;
        setImage(imageUrl);
        setJsonObject({ link: imageUrl });
        
        // console.log("jsondata", jsonObject); 
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let post = {
      name: name,
      email: email,
      total: total,
      date: date,
      balance: balance,
      image: image,
      alt: alt,
      status:status
    };
   
    axios.post("http://localhost:5000/users", post).then((res) => {
      console.log(res);
      
    });
    navigate("/")
  };
  return (
    <Container >
      <Title >Registration</Title>
      <Content >
        <Form action="" onSubmit={handleSubmit}>
          <Detail >
            <InputBox >
              <Span >Full Name</Span>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleName}
              />
            </InputBox>
            <InputBox >
              <Span >Email</Span>
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </InputBox>
            <InputBox >
              <Span >Total</Span>
              <input
                type="text"
                placeholder="Total"
                value={total}
                onChange={(e) => {
                  setTotal(e.target.value);
                }}
              />
            </InputBox>
            <InputBox >
              <Span>Issued Date</Span>
              <input
                type="date"
                placeholder="Date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </InputBox>
            <InputBox >
              <Span >Balance</Span>
              <input
                type="text"
                placeholder="Balance"
                value={balance}
                onChange={(e) => {
                  setBalance(e.target.value);
                }}
              />
            </InputBox>
            <div >
              <label >Profile Image:</label>
              <input
                type="file"
                accept="image/*"
                // value={image}
                onChange={handleImage}
              />
            </div>
          </Detail>
          <Btn >
            <input type="submit" value="Submit" />
          </Btn>
        </Form>
          <DropMenu 
          handleStatus={handleStatus} 
          />
      </Content>
    </Container>
  );
};
const Container = styled.div`
  max-width: 700px;
  width: 100%;
  background-color: #fff;
  padding: 25px 30px;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  margin: auto;
`;
const Title = styled.div`
  font-size: 25px;
  font-weight: 500;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 30px;
    border-radius: 5px;
    background: linear-gradient(135deg, #71b7e6, #9b59b6);
  }
`;
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0 12px 0;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 12px 0;
`;
const Detail = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 12px 0;
`;
const InputBox = styled.div`
  margin-bottom: 15px;
  width: calc(100% / 2 - 20px);
  input {
    height: 45px;
    width: 100%;
    outline: none;
    font-size: 16px;
    border-radius: 5px;
    padding-left: 15px;
    border: 1px solid #ccc;
    border-bottom-width: 2px;
    transition: all 0.3s ease;
    &:focus,
    &:valid {
      border-color: #9b59b6;
    }
  }
`;
const Span = styled.span`
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
`;
const Btn = styled.button`
  height: 45px;
  margin: 35px 0;
  border: none;
  input {
    padding: 10px;
    height: 100%;
    width: 100%;
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: linear-gradient(135deg, #71b7e6, #9b59b6);
    &:hover {
      background: linear-gradient(-135deg, #71b7e6, #9b59b6);
    }
  }
`;
// const Column = styled.div`
//   display: flex;
//   column-gap: 15px;
//   /* border: 1px solid black; */
// `;
// const Select = styled.select`
//   height: 100%;
//   width: 100%;
//   outline: none;
//   /* border: none; */
//   height: 50px;
//   color: #707070;
//   font-size: 1rem;
//   border: 1px solid #ddd;
// `;

export default Add;
