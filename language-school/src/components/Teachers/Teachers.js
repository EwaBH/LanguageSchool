import React, { useState, useEffect } from "react";
import TeachersItem from "./TeachersItem";
import Spinner from "react-bootstrap/Spinner";
import { getTeachers } from "../../services/httpService";
import Search from "../SearchItem/Search";
const address = "teacher";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const search = (text) => {
    setSearchText(text);
  };

 const getTeacher = () => {
   setLoading(true);
   getTeachers().then((result) => {
     setTeachers(result);
     setLoading(false);
   });
 };

 const refresh = () => {
   getTeacher();
 };

  // const deleteTeacher = () => {
  //   getTeacher();
  // };


 useEffect(() => {
   getTeacher();
 }, []);

 if (loading) return <Spinner animation="border" />;

 return (
   <div className="teachers__container">
     <h2 className="teachers__header">Nauczyciele</h2>
     <Search address={address} search={search} />
     <ul>
       {teachers.filter((teacher)=> {
        if(searchText==="") {
          return true;
        } else {
          return String(teacher.teacher).toLowerCase().includes(String(searchText).toLowerCase());
        }
       })
       
       .map((teacher) => {
         return (
           <TeachersItem
             key={teacher.id}
             teacher={teacher}
             refresh={refresh}
           />
         );
       })}
     </ul>
   </div>
 );
};
export default Teachers;
