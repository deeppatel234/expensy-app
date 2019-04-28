import React from "react";
import { connect } from "react-redux";

import Redux from "../../redux/ReduxRegistry";

import TypoGraphy from '../../components/TypoGraphy';
import Avatar from '../../components/Avatar';
import Link from '../../components/Link';

import {
  Container,
  Heading,
  Content,
  Footer,
  ListWrapper,
  ListItem,
  ListText,
} from '../../../globalStyle';

const ViewCategory = ({ categories }) => (
  <Container>
    <Heading>
      <TypoGraphy type="heading" appearance="primary">Categories</TypoGraphy>
    </Heading>
    <Content>
      <ListWrapper>
        {
          Object.values(categories).map((category) => (
            <ListItem key={category._id}>
              <Avatar name="ios-laptop" />
              <ListText><TypoGraphy>{category.name}</TypoGraphy></ListText>
            </ListItem>
          ))
        }
      </ListWrapper>
    </Content>
    <Footer>
      <Link to='/create-category' text="Add Category" appearance="primary" />
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
