import React from "react";
import { connect } from "react-redux";

import Redux from "Redux/ReduxRegistry";
import Header from "Components/Header";

import CategoryForm from "./Form";

import { Container, Heading } from "Src/globalStyle";

const EditCategory = ({ updateCategory, history, category }) => {
  const onSubmitForm = values => {
    updateCategory(values).then(() => history.goBack());
  };

  return (
    <Container>
      <Heading>
        <Header text="Category" />
      </Heading>
      <CategoryForm
        actionIcon="save"
        category={category}
        onSubmitForm={onSubmitForm}
      />
    </Container>
  );
};

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  return {
    category: state.categories[id]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCategory: category =>
      dispatch(Redux.get("category", "update")(category))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCategory);
