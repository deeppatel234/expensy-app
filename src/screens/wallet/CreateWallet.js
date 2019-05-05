import React, { Component } from "react";
import { connect } from "react-redux";

import { TouchableHighlight } from "react-native";

import { Formik } from "formik";

import Redux from "../../redux/ReduxRegistry";
import TypoGraphy from "../../components/TypoGraphy";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import Avatar from "../../components/Avatar";

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

class CreateWallet extends Component {
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
    const { createWallet, history } = this.props;
    values.balance = parseFloat(values.balance);
    createWallet(values).then(() => history.goBack());
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
            Add Wallet
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
                      <Avatar
                        type={IconList[props.values.icon].type}
                        name={IconList[props.values.icon].name}
                      />
                    </TouchableHighlight>
                  </LeftIcon>
                  <RightInput>
                    <TextInput
                      placeholder="Wallet Name"
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
                <TextInput
                  placeholder="Wallet Type"
                  onChangeText={props.handleChange("type")}
                  onBlur={props.handleBlur("type")}
                  value={props.values.type}
                />
                <TextInput
                  placeholder="Initial Balance"
                  onChangeText={props.handleChange("balance")}
                  onBlur={props.handleBlur("balance")}
                  value={props.values.balance}
                  keyboardType="numeric"
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

const mapDispatchToProps = dispatch => {
  return {
    createWallet: wallet => dispatch(Redux.get("wallet", "create")(wallet))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateWallet);
