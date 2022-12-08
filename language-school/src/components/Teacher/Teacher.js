import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { createTeacher } from "../../services/httpService";

const AddTeacher = () => {
  const [display, setDisplay] = useState(false);
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("");

  const navigate = useNavigate();

  const nameChanged = (e) => {
    setName(e.target.value);
  };

  const surnameChanged = (e) => {
    setSurname(e.target.value);
  };

  const emailChanged = (e) => {
    setEmail(e.target.value);
  };

  const phoneChanged = (e) => {
    setPhone(e.target.value);
  };

  const languageChanged = (e) => {
    setLanguage(e.target.value);
  };

  const validate = (e) => {
    e.preventDefault();
    // const validation = [];
    
    // const reEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");

    // if (name.length < 3 || !Number.isNaN(name)) {
    //   validation.push(
    //     "Wpisywane imię musi być dłuższe niż 3 znaki i nie może być liczbą"
    //   );
    // }
    // if (surname.length < 3 || !Number.isNaN(surname)) {
    //   validation.push(
    //     "Wpisywane nazwisko musi być dłuższe niż 3 znaki i nie może być liczbą"
    //   );
    // }
    // if (!reEmail.test(email)) {
    //   validation.push("mail musi zawierać min. 3 znaki oraz @ ");
    // }

    //   if (validation.length > 0) {
    //     setDisplay(true);
    //     setErrors(validation);
    //   } else {
    //     setDisplay(false);
    //     setErrors([]);
    //     sendData({
    //       name: name,
    //       surname: surname,
    //       email: email,
    //       phone: phone,
    //       language: language,
    //     });
    //   }
    sendData({
          name: name,
          surname: surname,
          email: email,
          phone: phone,
          language: language,
        });
  }

    const sendData = async (data) => {
      await createTeacher(data);
      navigate("/teachers");
    };

    return (
      <div>
        <form onSubmit={validate}>
          <div> Nauczyciel </div>
          <input type="text" onChange={nameChanged} placeholder="imię" />
          <br />
          <input type="text" onChange={surnameChanged} placeholder="nazwisko" />
          <br />
          <input type="text" onChange={emailChanged} placeholder="email" />
          <br />
          <input type="text" onChange={phoneChanged} placeholder="telefon" />
          <br />
          <input
            type="text"
            onChange={languageChanged}
            placeholder="język obcy"
          />
          <br />
          <button type="submit">Wyślij</button>
          <br />
        </form>

        <div>
          {display && errors.map((error) => <div key={error}>{error}</div>)}
        </div>
      </div>
    );
  };


export default AddTeacher;
