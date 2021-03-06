import React, { Component, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, TextArea } from "semantic-ui-react";

const CardPair = (props) => {
  return (
    <div>
      <div>
        <h3>Front:</h3>
      </div>
      <Form onSubmit={(e) => props.saveCardPair(e)}>
        <TextArea
          className="BlankCard"
          style={{ minHeight: 190, fontSize: 25 }}
          placeholder="front card text"
          name="frontText"
          required="true"
        ></TextArea>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <h3>Back:</h3>
        </div>

        <TextArea
          className="BlankCard"
          style={{ minHeight: 190, fontSize: 25 }}
          placeholder="back card text"
          name="backText"
          required="true"
        ></TextArea>
        <br></br>
        <br></br>
        <Button positive icon="right arrow" type="submit" />
      </Form>
    </div>
  );
};

export default CardPair;
