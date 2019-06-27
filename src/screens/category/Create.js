import React, { useCallback } from "react";
import { connect } from "react-redux";

import Redux from "Redux/ReduxRegistry";
import Header from "Components/Header";

import CategoryForm from "./Form";

import { Container, Heading } from "Src/globalStyle";

const INIT_VALUE = { icon: "PLACEHOLDER" };

const CreateCategory = ({ createCategory, history }) => {
  const onSubmitForm = useCallback(values => {
    createCategory(values).then(() => history.goBack());
  }, []);

  return (
    <Container>
      <Heading>
        <Header text="Add Category" />
      </Heading>
      <CategoryForm
        actionIcon="add"
        category={INIT_VALUE}
        onSubmitForm={onSubmitForm}
      />
    </Container>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createCategory: category =>
      dispatch(Redux.get("category", "create")(category))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateCategory);
