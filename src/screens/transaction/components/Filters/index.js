import React from "react";
import { connect } from "react-redux";

import { Modal } from "react-native";

import Typography from "Components/Typography";
import Radio from "Components/RadioButton";

import { TRANSACTION_TYPE } from "Models/TransactionModel";

import {
  Wrapper,
  FilterWrapper,
  ModalWrapper,
  FilterBox,
  DateBadges,
  FilterTitle,
} from "./styled";

export const DATE_CONST = {
  TODAY: {
    startDate: "date('now', 'start of day')",
    endDate: "date('now', 'localtime')",
  },
  YESTERDAY: {
    startDate: "date('now', '-1 days')",
    endDate: "date('now', 'localtime')",
  },
  THIS_WEEK: {
    startDate: "date('now', '-6 days')",
    endDate: "date('now', 'localtime')",
  },
  THIS_MONTH: {
    startDate: "date('now', 'start of month')",
    endDate: "date('now', 'localtime')",
  },
  THIS_YEAR: {
    startDate: "date('now', 'start of year')",
    endDate: "date('now', 'localtime')",
  },
};


const FilterModal = ({ filters, visible, onClose, onSelect }) => {
  const onUpdateDate = (value) => {
    onSelect({
      ...filters,
      dateFilterType: value,
    });
  };

  const onUpdateType = (value) => {
    const type = [...filters.type];
    if (type.includes(value)) {
      onSelect({
        ...filters,
        type: type.filter(t => t !== value),
      });
    } else {
      onSelect({
        ...filters,
        type: [...type, value],
      });
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      presentationStyle="overFullScreen"
      onRequestClose={onClose}
    >
      <Wrapper onPress={onClose}>
        <ModalWrapper>
          <FilterWrapper>
            <FilterBox>
              <FilterTitle>
                <Typography>Dates</Typography>
              </FilterTitle>
              <DateBadges>
                <Radio.Group
                  selectedValue={filters.dateFilterType}
                  onChange={onUpdateDate}
                >
                  {Object.keys(DATE_CONST).map(d => (
                    <Radio.Badge
                      key={d}
                      value={d}
                      text={d}
                    />
                  ))}
                </Radio.Group>
              </DateBadges>
              <FilterTitle>
                <Typography>Types</Typography>
              </FilterTitle>
              <DateBadges>
                <Radio.Group
                  multiple
                  selectedValue={filters.type}
                  onChange={onUpdateType}
                >
                  {Object.values(TRANSACTION_TYPE).map(d => (
                    <Radio.Badge
                      key={d}
                      value={d}
                      text={d}
                    />
                  ))}
                </Radio.Group>
              </DateBadges>
            </FilterBox>
          </FilterWrapper>
        </ModalWrapper>
      </Wrapper>
    </Modal>
  );
};

// Maps state from store to props
const mapStateToProps = state => {
  return {
    wallets: state.wallets
  };
};

export default connect(mapStateToProps)(FilterModal);
