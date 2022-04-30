import React, { useState } from "react";
import "../StyleSheet/HouseDescription.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const HouseDescription = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const resetForm = () => {
    setEmail("");
    setMessage("");
    setSubject("");
    history.push("/");
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("subject", subject);
    data.append("message", message);

    const dev_url = "http://127.0.0.1:3000/contact";
    const production_url = "/contact";
    axios
      .post(production_url, data)
      .then((response) => {
        console.log(response);
      }, resetForm())
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="House__detailContainer">
        <img src={property.image1} alt="Property Image" />
        <div className="House__details">
            <div className="House__detail" key={house._id}>
              <img src={property.image1} alt="Property Image" />
              <div className="info">
                <h4 className="house__price">{`R${property.price}`}</h4>
                <h4 className="houseBedsAndState">{`${property.bedrooms} Bedroom house in ${property.address} for ${property.price}`}</h4>
                <h4 className="house__location">{`House located directly in: ${property.address}`}</h4>
                <div className="more__info">
                  <div className="bedRoomCount">
                    <HotelIcon />
                    <h5>{property.bedrooms}</h5>
                  </div>
                  <div className="showersCount">
                    <BathtubIcon />
                    <h5>{property.bedrooms}</h5>
                  </div>
                  {/* <div className="parkingSpace">
                    <DriveEtaIcon />
                    <h5>{property.garages}</h5>
                  </div> */}
                </div>
              </div>
              <div className="House__textDetail">
                <h4>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquam tempore, ullam nulla architecto dolorem soluta
                  labore esse minus in reiciendis, eius deleniti officia
                  ratione voluptate atque illo ab assumenda odit dolor! Beatae
                  debitis distinctio libero?
                </h4>
              </div>
            </div>
        </div>
      <div className="Contact__agentForm">
        <form className="Contact__AgentForm">
          <h3>Contact Agent</h3>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email address"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Subject</label>
          <input
            type="text"
            placeholder="Enter the subject of message"
            required
            onChange={(e) => setSubject(e.target.value)}
          />
          <br />
          <label>Message</label>
          <textarea
            cols="30"
            rows="5"
            required
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <br />

          <button onClick={sendMessage}>SEND MESSAGE</button>
        </form>
      </div>
    </div>
  );
};

export default HouseDescription;
