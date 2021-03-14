import React from "react";
import { Container } from "react-bootstrap";
import StoreItem from "./StoreItem";

const Store = (props) => {
  const { productList, cartHandler } = props;

  return (
    <Container className="border border-dark storeContainer d-flex justify-content-center">
      {productList.product.map((el) => (
        <StoreItem el={el} key={el._id} clickHandler={cartHandler} />
      ))}
    </Container>
  );
};

export default Store;
