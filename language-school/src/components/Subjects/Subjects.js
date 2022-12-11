import React, { useState, useEffect } from "react";
import SubjectsItem from "./SubjectItem";
import { getSubjects, getTimetables} from "../../services/httpService";
import Spinner from "react-bootstrap/Spinner";
import Search from "../SearchItem/Search";
const address = "subject";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

 const search = (text) => {
   setSearchText(text);
 };

  const fetchData = async () => {
    setLoading(true);
    const data = await Promise.all([getSubjects(), getTimetables()]);
    data[0].forEach((s) => {
      s.canBeRemoved = !data[1].some((tt) => tt.classroomId == s.id);
    });

    setSubjects(data[0]);
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
    <div className="subjects__container">
      <h2 className="subjects__header">Przedmioty</h2>
      <Search address={address} search={search} />
      <ul>
        {subjects
        .filter((subject)=>{
          if(searchText==="") {
            return true;
          } else {
            return String(subject.subject)
              .toLowerCase()
              .includes(String(searchText).toLowerCase());
          }
        })
        .map((subject) => {
          return (
            <SubjectsItem
              // className="subject__list"
              key={subject.id}
              subject={subject}
              refresh={refresh}
            />
          );
        })}
      </ul>
    </div>
  );
};
export default Subjects;
