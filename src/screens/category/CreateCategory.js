import React, { Component } from "react";
import { connect } from "react-redux";
import { TouchableHighlight } from "react-native";
import { Formik } from "formik";

import Redux from "Redux/ReduxRegistry";
import Header from 'Components/Header';
import Button from "Components/Button";
import TextInput from "Components/TextInput";
import Avatar from "Components/Avatar";
import Icon from "Components/Icon";

import IconModel from "Screens/icon/IconModel";
import IconList from 'Utils/IconList';

import {
  Container,
  Heading,
  Content,
  Footer,
  FooterButton,
  IconInputWrapper,
  LeftIcon,
  RightInput
} from "Src/globalStyle";

class CreateCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iconModelVisible: false
    };

    this.onSelectIcon = this.onSelectIcon.bind(this);
    this.showIconModel = this.showIconModel.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm(values) {
    const { createCategory, history } = this.props;
    createCategory(values).then(() => history.goBack());
  }

  showIconModel() {
    this.setState({ iconModelVisible: true });
  }

  onSelectIcon(data, props) {
    props.setFieldValue("icon", data);
    this.setState({ iconModelVisible: false });
  }

  render() {
    const { iconModelVisible } = this.state;

    return (
      <Container>
        <Heading>
          <Header text="Add Category" />
        </Heading>
        <Formik
          initialValues={{ icon: "PLACEHOLDER" }}
          onSubmit={this.onSubmitForm}
        >
          {props => (
            <React.Fragment>
              <Content>
                <IconInputWrapper>
                  <LeftIcon>
                    <TouchableHighlight onPress={this.showIconModel}>
                      <Avatar>
                        <Icon
                          type={IconList[props.values.icon].type}
                          name={IconList[props.values.icon].name}
                        />
                      </Avatar>
                    </TouchableHighlight>
                  </LeftIcon>
                  <RightInput>
                    <TextInput
                      placeholder="Category Name"
                      onChangeText={props.handleChange("name")}
                      onBlur={props.handleBlur("name")}
                      value={props.values.name}
                    />
                  </RightInput>
                </IconInputWrapper>
                <IconModel
                  visible={iconModelVisible}
                  onSelect={data => this.onSelectIcon(data, props)}
                />
              </Content>
              <Footer>
                <FooterButton>
                  <Button
                    rounded
                    onPress={props.handleSubmit}
                    text="Add"
                    appearance="primary"
                  />
                </FooterButton>
              </Footer>
            </React.Fragment>
          )}
        </Formik>
      </Container>
    );
  }
}

// Maps state from store to props
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createCategory: category =>
      dispatch(Redux.get("category", "create")(category))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCategory);
