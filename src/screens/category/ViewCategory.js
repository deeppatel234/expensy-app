import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-native';

import Redux from "../../redux/ReduxRegistry";

import TypoGraphy from '../../components/TypoGraphy';
import Avatar from '../../components/Avatar';

import { Container, Heading, Content} from '../../../globalStyle';

import {
  ListWrapper,
  ListItem,
  ListText,
} from './styled';

const ViewCategory = ({ categories }) => (
  <Container>
    <Heading>
      <TypoGraphy type="heading">Categories</TypoGraphy>
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
    {/*<Link to='/create-category'><Text>Create Category</Text></Link> */}
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
