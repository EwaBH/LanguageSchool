import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Menu from "../Menu/Menu";
import "./App.scss";
import Main from "../Main/Main";
import Timetables from "../Timetables/Timetables";
import Timetable from "../Timetable/Timetable";
import Teachers from "../Teachers/Teachers";
import Teacher from "../Teacher/Teacher";
import Subjects from "../Subjects/Subjects";
import Subject from "../Subject/Subject";
import Clasrooms from "../Classrooms/Classrooms";
import Classroom from "../Classroom/Classroom";
import { NotFound } from "../NotFound/NotFound";

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="mainSection">
        <Menu />
        <Main />
        {/* <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/timetables" element={<Timetables />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/classrooms" element={<Clasrooms />} />
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/classroom/:id" element={<Classroom />} />
          <Route path="*" element={<NotFound />} />
        </Routes> */}
      </div>
      <Footer />
    </div>
  );
};

export default App;
