import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  createTeacher,
  getTeacher,
  updateTeacher,
} from "../../services/httpService";

const Teacher = () => {
  const [name, setName] = useState("");
  const [nameValidation, setNameValidation] = useState(false);
  const [surname, setSurname] = useState("");
  const [surnameValidation, setSurnameValidation] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneValidation, setPhoneValidation] = useState(false);
    const [description, setDescription] = useState("");
    const [descriptionValidation, setDescriptionValidation] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined && !Number.isNaN(id)) {
      getTeacher(id).then((result) => {
        setNameValue(result.name);
        setSurnameValue(result.surname);
        setEmailValue(result.email);
        setPhoneValue(result.phone);
      });
    }
  }, []);

   const nameChanged = (e) => {
     setNameValue(e.target.value);
   };

 const setNameValue = (value) => {
   if (value == null) {
     value = "";
   }
   setName(value);
   if (value.length !== 0) {
     setNameValidation(true);
   } else {
     setNameValidation(false);
   }
 };

 const surnameChanged = (e) => {
   setSurnameValue(e.target.value);
 };

  const setSurnameValue = (value) => {
    if (value == null) {
      value = "";
    }
    setSurname(value);
    if (value.length !== 0) {
      setSurnameValidation(true);
    } else {
      setSurnameValidation(false);
    }
  };

  const emailChanged = (e) => {
    const reEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
setEmailValue(e.target.value);
  
  };

const setEmailValue = (value) => {
  if (value == null) {
    value = "";
  }
  setEmail(value);
  if (value.length !== 0) {
    setEmailValidation(true);
  } else {
    setEmailValidation(false);
  }
};


 const phoneChanged = (e) => {
   setPhoneValue(e.target.value);
 };


  const setPhoneValue = (value) => {
      if (value == null) {
        value = "";
      }
    setPhone(value);
    if (value.length > 8 ) {
      setPhoneValidation(true);
    } else {
      setPhoneValidation(false);
    }
  };

 const descriptionChanged = (e) => {
   setDescriptionValue(e.target.value);
 };

 const setDescriptionValue = (value) => {
   if (value == null) {
     value = "";
   }
   setDescription(value);
   if (value.length !== 0) {
     setDescriptionValidation(true);
   } else {
     setDescriptionValidation(false);
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
      <form onSubmit={submit}>
        <h2 className="teachers__header">Nauczyciele</h2>
        <label>imię</label> <br />
        <input
          type="text"
          value={name}
          onChange={nameChanged}
          placeholder="imię"
          style={{ backgroundColor: nameValidation ? "#CCF7BA" : "#FFA8A8" }}
        />
        <br />
        <label>nazwisko</label> <br />
        <input
          type="text"
          value={surname}
          onChange={surnameChanged}
          placeholder="nazwisko"
          style={{ backgroundColor: surnameValidation ? "#CCF7BA" : "#FFA8A8" }}
        />
        <br />
        <label>email</label> <br />
        <input
          type="text"
          value={email}
          onChange={emailChanged}
          placeholder="email"
          style={{ backgroundColor: emailValidation ? "#CCF7BA" : "#FFA8A8" }}
        />
        <br />
        <label>telefon</label> <br />
        <input
          type="text"
          value={phone}
          onChange={phoneChanged}
          placeholder="telefon"
          style={{ backgroundColor: phoneValidation ? "#CCF7BA" : "#FFA8A8" }}
        />
        <br />
        <label>opis (nieobowiązkowy)</label> <br />
        <input
          type="text"
          value={description}
          onChange={descriptionChanged}
          placeholder="opis"
        />
        <br />
        {nameValidation &&
          surnameValidation &&
          emailValidation &&
          phoneValidation && <button type="submit">Wyślij</button>}
        <br />
      </form>
    </>
  );
};

export default Teacher;
