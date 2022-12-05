import React, { useState, useEffect } from "react";
import ClassroomItem from "./ClassroomItem";
const API_URL = "http://localhost:3000";

const Classrooms = () => {
  const [classrooms, setClasssrooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const getClassroom = () => {
    setLoading(true);
    fetch(`${API_URL}/classrooms`)
      .then((response) => response.json())
      .then((result) => {
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

  if (loading) return <p>Trwa ładowanie danych...</p>;

  return (
    <>
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
    </>
  );
};
export default Classrooms;
