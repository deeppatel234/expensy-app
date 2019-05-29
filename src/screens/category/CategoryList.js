import React from "react";
import { connect } from "react-redux";

import Redux from "Redux/ReduxRegistry";

import Header from "Components/Header";
import Link from "Components/Link";
import Footer from "Components/Footer";

import CategoryPanel from "./components/CategoryPanel";

import { Container, Heading, Content, ListWrapper } from "Src/globalStyle";


const CategoryList = ({ categories }) => (
  <Container>
    <Heading>
      <Header text="Categories" />
    </Heading>
    <Content>
      <ListWrapper>
        {Object.values(categories).map(category => (
          <Link
            key={category._id}
            to={`/edit-category/${category._id}`}
            category={category}
            component={CategoryPanel}
          />
        ))}
      </ListWrapper>
    </Content>
    <Footer actionIcon="add" actionLink="/create-category" />
  </Container>
);

// Maps state from store to props
const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteCategory: category =>
      dispatch(Redux.get("category", "delete")(category))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);
