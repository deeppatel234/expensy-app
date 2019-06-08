import React, { useEffect, useState } from "React";
import { connect } from "react-redux";

import Footer from "Components/Footer";
import Header from "Components/Header";
import Loader from "Components/Loader";
import Link from "Components/Link";

import { Container, Heading, Content } from "Src/globalStyle";
import models from "Models";

import TotalOverview from "./components/TotalOverview";
import TransactionPanel from "./components/TransactionPanel";

const TransactionList = ({ wallets, categories }) => {
  const [transactionList, setTransactionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    models
      .get("expense")
      .readAll()
      .then(list => {
        setTransactionList(list);
        setIsLoading(false);
      });
  }, []);

  const onFilterShowClick = () => {};

  return (
    <Container>
      <Heading>
        <Header text="Transactions" />
      </Heading>
      <Content>
        {isLoading && <Loader />}
        {!isLoading && <TotalOverview list={transactionList} />}
        {!isLoading &&
          transactionList.map(data => (
            <Link
              key={data._id}
              to={`/view-transaction/${data._id}`}
              data={data}
              wallets={wallets}
              categories={categories}
              component={TransactionPanel}
            />
          ))}
      </Content>
      <Footer
        iconType="AntDesign"
        actionIcon="filter"
        onActionClick={onFilterShowClick}
      />
    </Container>
  );
};

// Maps state from store to props
const mapStateToProps = state => {
  return {
    categories: state.categories,
    wallets: state.wallets
  };
};

export default connect(
  mapStateToProps,
  null
)(TransactionList);
