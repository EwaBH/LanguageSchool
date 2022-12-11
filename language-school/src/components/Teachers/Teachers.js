import React, { useState, useEffect } from "react";
import TeachersItem from "./TeachersItem";
import Spinner from "react-bootstrap/Spinner";
import { getTeachers, getTimetables } from "../../services/httpService";
import Search from "../SearchItem/Search";
const address = "teacher";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const search = (text) => {
    setSearchText(text);
  };

  const fetchData = async () => {
    setLoading(true);
    const data = await Promise.all([getTeachers(), getTimetables()]);
    data[0].forEach((t) => {
      t.canBeRemoved = !data[1].some((tt) => tt.teacherId == t.id);
    });

    setTeachers(data[0]);
    setLoading(false);
  };

 const refresh = () => {
   fetchData();
 };
 useEffect(() => {
   fetchData();
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
