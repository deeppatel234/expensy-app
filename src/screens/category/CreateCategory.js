import React, { Component } from "react";
import { connect } from "react-redux";
import { TouchableHighlight } from "react-native";
import { Formik } from "formik";
import * as Yup from 'yup';

import Redux from "Redux/ReduxRegistry";
import Header from 'Components/Header';
import TextInput from "Components/TextInput";
import Avatar from "Components/Avatar";
import Footer from 'Components/Footer';

import IconModel from "Screens/icon/IconModel";

import {
  Container,
  Heading,
  Content,
  IconInputWrapper,
  LeftIcon,
  RightInput
} from "Src/globalStyle";

const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
});

class CreateCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iconModelVisible: false
    };

    this.onSelectIcon = this.onSelectIcon.bind(this);
    this.showIconModel = this.showIconModel.bind(this);
    this.closeIconModel = this.closeIconModel.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm(values) {
    const { createCategory, history } = this.props;
    createCategory(values).then(() => history.goBack());
  }

  showIconModel() {
    this.setState({ iconModelVisible: true });
  }

  closeIconModel() {
    this.setState({ iconModelVisible: false });
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
          validationSchema={CategorySchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {props => (
            <React.Fragment>
              <Content>
                <IconInputWrapper>
                  <LeftIcon>
                    <TouchableHighlight onPress={this.showIconModel}>
                      <Avatar.Icon iconKey={props.values.icon} />
                    </TouchableHighlight>
                  </LeftIcon>
                  <RightInput>
                    <TextInput
                      placeholder="Category Name"
                      onChangeText={props.handleChange("name")}
                      onBlur={props.handleBlur("name")}
                      value={props.values.name}
                      error={props.errors.name}
                    />
                  </RightInput>
                </IconInputWrapper>
                <IconModel
                  visible={iconModelVisible}
                  onSelect={data => this.onSelectIcon(data, props)}
                  onClose={this.closeIconModel}
                />
              </Content>
              <Footer>
                <Footer.AddButton onPress={props.handleSubmit} />
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
