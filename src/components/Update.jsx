import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import DropMenu from "./DropMenu";

const Update = () => {
  let { id } = useParams();
  const navigate=useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [total, setTotal] = useState("");
  const [date, setDate] = useState("");
  const [balance, setBalance] = useState("");
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [status,setStatus]=useState("")
  const [jsonObject, setJsonObject] = useState({});


  const handleStatus=(e)=>{
    setStatus(e)
  }
  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageUrl = e.target.result;
        setImage(imageUrl);
        setJsonObject({ link: imageUrl });
        console.log("jsondata", jsonObject); // Store the image URL in a JSON object
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/${id}`)
      .then((res) => {
        setImage(res.data.image);
        setAlt(res.data.alt);
        setName(res.data.name);
        setEmail(res.data.email);
        setTotal(res.data.total);
        setDate(res.data.date);
        setBalance(res.data.balance)
        setStatus(res.data.status)
      })
      .catch((err) => console.log(err));
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (image == "") {
      const word = name.split(" ");
      const newWord = word
        .map((e) => {
          return e.charAt(0).toUpperCase();
        })
        .join("");
      setAlt(newWord);
      console.log(alt);
    }
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
    axios
      .put(`http://localhost:4000/users/${id}`, post)
      .then((res) => {
       console.log(res);
        navigate("/")
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <Drop>
        <DropMenu  handleStatus={handleStatus} />
      </Drop>
      <form action="" onSubmit={handleSubmit}>
        <Content>
          <h1>Update</h1>
          <ImageContainer>
            <Image>
              {image != "" ? <img src={image} alt="" /> : <h3>{alt}</h3>}
            </Image>
            <label>Profile Image:</label>
            <input
              type="file"
              accept="image/*"
              // value={image}
              onChange={handleImage}
            />
          </ImageContainer>
          <DataContainer>
            <InputBox >
              <Span >Full Name</Span>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
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
              <Span >Balance</Span>
              <input
                type="text"
                placeholder="Enter your email"
                value={balance}
                onChange={(e) => {
                  setBalance(e.target.value);
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
          </DataContainer>
          <Btn class="button">
            <input type="submit" value="Update" />
          </Btn>
        </Content>
      </form>
      
    </Container>
  );
};
const Drop=styled.div`
  position: relative;
`
const Container = styled.div`
  width: 100%;
  height: 100vh;
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Content = styled.div`
display: flex;
flex-direction: column;
align-items: center;
  max-width: 700px;
  width: 100%;
  padding: 25px 30px;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;
const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  img {
    width: 100px;
    height: 100px;
    border: 1px solid red;
    border-radius: 50%;
  }
  h3 {
  }
`;
const Image = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid red;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #dde9f5;
`;
const DataContainer = styled.div`
  width: 100%;
  height: 100%;
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

export default Update;
