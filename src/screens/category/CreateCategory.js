import React, { Component } from "react";
import { connect } from "react-redux";

import { TouchableHighlight } from "react-native";

import { Formik } from "formik";

import Redux from "../../redux/ReduxRegistry";
import TypoGraphy from "../../components/TypoGraphy";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import Avatar from "../../components/Avatar";
import Icon from "../../components/Icon";

import IconModel from "../icon/IconModel";
import IconList from "../icon/IconList";

import {
  Container,
  Heading,
  Content,
  Footer,
  IconInputWrapper,
  LeftIcon,
  RightInput
} from "../../../globalStyle";

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
          <TypoGraphy type="heading" appearance="primary">
            Add Category
          </TypoGraphy>
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
                <Button
                  onPress={props.handleSubmit}
                  text="Add"
                  appearance="primary"
                />
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
