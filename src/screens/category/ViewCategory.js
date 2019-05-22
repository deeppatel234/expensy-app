import React from "react";
import { connect } from "react-redux";

import Redux from "Redux/ReduxRegistry";

import Typography from 'Components/Typography';
import Avatar from 'Components/Avatar';
import Header from 'Components/Header';
import Link from 'Components/Link';
import Footer from 'Components/Footer';

import {
  Container,
  Heading,
  Content,
  ListWrapper,
  ListItem,
  ListText,
} from 'Src/globalStyle';

const ViewCategory = ({ categories }) => (
  <Container>
    <Heading>
      <Header text="Categories" />
    </Heading>
    <Content>
      <ListWrapper>
        {
          Object.values(categories).map((category) => (
            <ListItem key={category._id}>
              <Avatar.Icon iconKey={category.icon} />
              <ListText><Typography>{category.name}</Typography></ListText>
            </ListItem>
          ))
        }
      </ListWrapper>
    </Content>
    <Footer>
      <Link to='/create-category' component={Footer.AddButton} />
    </Footer>
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
    deleteCategory: category => dispatch(Redux.get("category", "delete")(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewCategory);
