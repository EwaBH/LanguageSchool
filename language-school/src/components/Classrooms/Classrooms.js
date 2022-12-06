import React, { useState, useEffect } from "react";
import ClassroomItem from "./ClassroomItem";
import { getClassrooms } from "../../services/httpService";
import Spinner from "react-bootstrap/Spinner";
import Search from "../shared/search/search";

const address = "clasroom";

const Classrooms = () => {
  const [classrooms, setClasssrooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = (text) => {
    console.log(text);
  };

  const getClassroom = () => {
    setLoading(true);
    getClassrooms().then((result) => {
      setClasssrooms(result);
      setLoading(false);
    });
  };

  const deleteClassroom = () => {
    getClassroom();
  };

  useEffect(() => {
    getClassroom();
  }, []);

  if (loading) return <Spinner animation="border" />;
  return (
    <div className="classrooms__container">
      <h2>Sale lekcyjne</h2>
      <Search address={address} search={search} />

      <ul>
        {classrooms.map((classroom) => {
          return (
            <ClassroomItem
              key={classroom.id}
              classroom={classroom}
              onDelete={deleteClassroom}
            />
          );
        })}
      </ul>
    </div>
  );
};
export default Classrooms;
