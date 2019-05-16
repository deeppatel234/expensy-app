import React from "react";
import { connect } from "react-redux";

import Redux from "Redux/ReduxRegistry";

import TypoGraphy from 'Components/TypoGraphy';
import Avatar from 'Components/Avatar';
import Icon from 'Components/Icon';
import Header from 'Components/Header';
import Link from 'Components/Link';

import IconList from 'Utils/IconList';

import { BLACK } from 'Src/theme';

import {
  Container,
  Heading,
  Content,
  Footer,
  FooterButton,
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
              <Avatar>
                <Icon type={IconList[category.icon].type} name={IconList[category.icon].name} color={BLACK} />
              </Avatar>
              <ListText><TypoGraphy>{category.name}</TypoGraphy></ListText>
            </ListItem>
          ))
        }
      </ListWrapper>
    </Content>
    <Footer>
      <FooterButton>
        <Link to='/create-category' text="Add Category" appearance="primary" rounded />
      </FooterButton>
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
