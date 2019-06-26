import React from "react";
import _capitalize from "lodash/capitalize";

import formatDate from "date-fns/format";

import Header from "Components/Header";
import TransactionForm from "./TransactionForm";

import {
  Container,
  Heading,
} from "Src/globalStyle";

import models from "../../sql/models";

const CreateTransaction = ({ history }) => {
  const onSubmitForm = values => {
    models
      .get("money_transaction")
      .create(values)
      .then(history.goBack);
  };

  return (
    <Container>
      <Heading>
        <Header text="Add Transaction" />
      </Heading>
      <TransactionForm
        transactionValues={{
          type: "expense",
          amount: "",
          dateTime: formatDate(new Date(), "YYYY-MM-DD")
        }}
        submitIcon="add"
        onSubmitForm={onSubmitForm}
      />
    </Container>
  );
};

export default CreateTransaction;
