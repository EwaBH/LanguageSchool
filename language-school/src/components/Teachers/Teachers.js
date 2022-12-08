import React, { useState, useEffect } from "react";
import TeachersItem from "./TeachersItem";
import Spinner from "react-bootstrap/Spinner";
import { getTeachers } from "../../services/httpService";
import Search from "../SearchItem/Search";

const address = "teacher";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

 const getTeacher = () => {
   setLoading(true);
   getTeachers().then((result) => {
     setTeachers(result);
     setLoading(false);
   });
 };

 const search = (text) => {
   console.log(text);
 };

  const deleteTeacher = () => {
    getTeacher();
  };


 useEffect(() => {
   getTeacher();
 }, []);

 if (loading) return <Spinner animation="border" />;

 return (
   <div className="teachers__container">
     <h2 className="teachers__header">Nauczyciele</h2>
     <Search address={address} search={search} />
     <ul>
       {teachers.map((teacher) => {
         return (
           <TeachersItem
             key={teacher.id}
             teacher={teacher}
             onDelete={deleteTeacher}
           />
         );
       })}
     </ul>
   </div>
 );
};
export default Teachers;
