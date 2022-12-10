import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  createTeacher,
  getTeacher,
  updateTeacher,
} from "../../services/httpService";

const AddTeacher = () => {
  const [name, setName] = useState("");
  const [nameValidation, setNameValidation] = useState(false);
  const [surname, setSurname] = useState("");
  const [surnameValidation, setSurnameValidation] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneValidation, setPhoneValidation] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined && !Number.isNaN(id)) {
      getTeacher(id).then((result) => {
        setName(result.name);
        setSurname(result.surname);
        setEmail(result.email);
        setPhone(result.phone);
      });
    }
  }, []);

  const nameChanged = (e) => {
    setName(e.target.value);
    if (e.target.value.lenght !== 0) {
      setNameValidation(true);
    } else {
      setNameValidation(false);
    }
  };

  const surnameChanged = (e) => {
    setSurname(e.target.value);
    if (e.target.value.length !== 0) {
      setSurnameValidation(true);
    } else {
      setSurnameValidation(false);
    }
  };

  const emailChanged = (e) => {
    const reEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");

    setEmail(e.target.value);
    if (reEmail.test(e.target.value)) {
      setEmailValidation(true);
    } else {
      setEmailValidation(false);
    }
  };

  const phoneChanged = (e) => {
    setPhone(e.target.value);
    if (e.target.value.length > 8 && e.target.value.length < 14) {
      setPhoneValidation(true);
    } else {
      setPhoneValidation(false);
    }
  };

 

  const submit = (e) => {
    e.preventDefault();

    sendData({
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      
    });
  };

  const sendData = async (data) => {
    if (id !== undefined && !Number.isNaN(id)) {
      await updateTeacher(data, id);
    } else {
      await createTeacher(data);
    }
    navigate("/teachers");
  };

  return (
    <>
      <div>Nauczyciel </div>
      <form onSubmit={submit}>
        <input
          type="text"
          value={name}
          onChange={nameChanged}
          placeholder="imię"
          style={{ borderColor: nameValidation ? "green" : "red" }}
        />
        <br />
        <input
          type="text"
          value={surname}
          onChange={surnameChanged}
          placeholder="nazwisko"
          style={{ borderColor: surnameValidation ? "green" : "red" }}
        />
        <br />
        <input
          type="text"
          value={email}
          onChange={emailChanged}
          placeholder="email"
          style={{ borderColor: emailValidation ? "green" : "red" }}
        />

        <br />
        <input
          type="text"
          value={phone}
          onChange={phoneChanged}
          placeholder="telefon"
          style={{ borderColor: phoneValidation ? "green" : "red" }}
        />
        <br />
       
        {nameValidation &&
          surnameValidation &&
          emailValidation &&
          phoneValidation &&
           <button type="submit">Wyślij</button>}

        <br />
      </form>
    </>
  );
};

export default AddTeacher;
