import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const Table = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10;
  useEffect(() => {
    axios
      .get("http://localhost:4000/users")
      .then((res) => {
        setData(res.data)
        
      })
      .catch((err) => console.log("data not fatch",err));
  }, []);
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const getVisibleItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    return data.slice(startIndex, endIndex);
  };
  const visibleItems = getVisibleItems();
  


  const dlt=(id)=>{
    axios.delete(`http://localhost:4000/users/${id}`)
    .then(()=>{
      window.location.assign("/")
      
    })
    .catch(()=>{
      console.log("not deleted");
    })
  }
  
  return (
    <Container>
      <table>
        <thead>
          <td>
            <Input type="checkbox" />
          </td>
          <td>#</td>
          <td>STATUS</td>
          <td>CLIENT</td>
          <td>TOTAL</td>
          <td>ISSUED DATE</td>
          <td>BALANCE</td>
          <td>ACTIONS</td>
        </thead>
        {visibleItems.map((d, i) => {
          const cId= d.id
          const number=parseInt(cId, 16);
          return(
          <Tr key={i}>
            <td>
              <Input type="checkbox" />
            </td>
            <Id>#{number}</Id>
           <Status><div><img src={d.status} alt="" /></div></Status>
            <TableCell>
              <ProfileImg>
                {d.image == "" ? (
                  <Alt>{d.alt}</Alt>
                ) : (
                  <img src={d.image} alt={d.alt} />
                )}
              </ProfileImg>
              <InfoContainer>
                <Name>{d.name}</Name>
                <Email>{d.email}</Email>
              </InfoContainer>
            </TableCell>
            <td>${d.total}</td>
            <td>{d.date}</td>
            <td>
              {d.balance === "paid" ? <Paid>Paid</Paid>: `$${d.balance}` }
            </td>

            <Button>
              <button onClick={()=>{dlt(d.id)}}><img src="https://cdn-icons-png.flaticon.com/512/709/709518.png" alt="" /></button>
              <button  ><Link to={`/update/${d.id}`}><img src="https://cdn-icons-png.flaticon.com/512/709/709612.png" alt="" /> </Link></button>
              <button><img src="https://cdn-icons-png.flaticon.com/512/2311/2311524.png" alt="" /> </button>
            </Button>
          </Tr>
)})}
      </table>
      <Bottom> <button onClick={handlePrevious} disabled={currentPage === 1}>
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tbGVmdCI+PHBhdGggZD0ibTE1IDE4LTYtNiA2LTYiLz48L3N2Zz4=" alt="" />
      </button>
      <button onClick={handleNext}>
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tcmlnaHQiPjxwYXRoIGQ9Im05IDE4IDYtNi02LTYiLz48L3N2Zz4=" alt="" />
        </button></Bottom>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100%;
 
  table {
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border-collapse: collapse;
    /* text-align: center; */

    thead {
      background-color: #dde9f5;
      height: 50px;
    }
    td {
      padding: 5px;
      font-weight: 700;
      
    }
    
  }
`;
const Tr=styled.tr`
  border: 1px solid rgba(142, 145, 143, 0.71);
  padding: 5px;
`
const Status=styled.td`
  div{
    width: 35px;
  height: 35px;
  border: 1px solid #989fa7;
  border-radius: 50%;
  margin: auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  }
`

const TableCell = styled.td`
  display: flex;
  gap: 5px;
`;
const ProfileImg = styled.div`
  width: 40px;
  height: 40px;
  background-color: #dde9f5;
  border-radius: 50%;
  margin: auto 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
  }
`;
const InfoContainer = styled.div`
  display: block;
`;
const Name = styled.h5``;
const Email = styled.h6``;
const Alt = styled.h5`
  margin: auto 0;
`;
const Paid = styled.h5`
  width: 60px;
  height: 30px;
  color: #66cc23;
  margin: auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background-color: #e6f5dc;
`;
const Button=styled.td`
button{
  border: none;
  background-color: transparent;
  padding: 3px;
  img{
    width: 25px;
    height: 25px;
  }
}
`
const Id=styled.td`
  color: #a077ff;
  font-size: large;
  font-weight: 600;
`

const Input=styled.input`
  width: 20px;
  height: 20px;
  margin: auto 0;
`
const Bottom=styled.div`
padding-right: 30px;
height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  border: 1px solid rgba(142, 145, 143, 0.71);
  gap: 20px;
  img{
    width: 20px;
    height: 20px;
    border: none;
  }
`

export default Table;
