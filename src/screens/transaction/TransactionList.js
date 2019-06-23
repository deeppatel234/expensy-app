import React, { useEffect, useState } from "React";
import { connect } from "react-redux";
import _isEmpty from "lodash/isEmpty";

import Footer from "Components/Footer";
import Header from "Components/Header";
import Loader from "Components/Loader";
import Link from "Components/Link";
import Empty from "Components/Empty";

import { Container, Heading, Content } from "Src/globalStyle";
import models from "Models";

import FilterModal, { DATE_CONST } from "./components/Filters";
import TotalOverview from "./components/TotalOverview";
import TransactionPanel from "./components/TransactionPanel";

import { TRANSACTION_TYPE } from "Models/TransactionModel";

const DEFAULT_FILTERS = {
  type: [TRANSACTION_TYPE.EXPENSE, TRANSACTION_TYPE.INCOME],
  dateFilterType: 'TODAY',
};

const TransactionList = ({ wallets, categories }) => {
  const [transactionList, setTransactionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = () => {
    const { type, dateFilterType } = filters;
    setIsLoading(true);
    return models
      .get("money_transaction")
      .filter(type, DATE_CONST[dateFilterType])
      .then((list) => {
        setTransactionList(list);
        setIsLoading(false);
      });
  };

  const onFilterShowClick = () => {
    setFilterModalVisible(true);
  };

  const onSelectFilter = (newFilters) => {
    setFilters(newFilters);
    setFilterModalVisible(false);
    fetchData();
  };

  return (
    <Container>
      <Heading>
        <Header text="Transactions" />
      </Heading>
      <Content>
        <FilterModal.ShowFilter filters={filters} />
        {isLoading && <Loader />}
        {!isLoading && _isEmpty(transactionList) && <Empty />}
        {!_isEmpty(transactionList) && <TotalOverview list={transactionList} />}
        {!_isEmpty(transactionList) &&
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
        <FilterModal
          filters={filters}
          visible={filterModalVisible}
          onSelect={onSelectFilter}
          onClose={() => setFilterModalVisible(false)}
        />
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
