import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const filtered = [
  { name: 'all', label: 'Все' },
  { name: 'withoutTransfer', label: 'Без пересадок' },
  { name: 'oneTransfer', label: '1 пересадка' },
  { name: 'twoTransfer', label: '2 пересадки' },
  { name: 'threeTransfer', label: '3 пересадки' },
];
const renderCheckbox = (func, filterState) => {
  return filtered.map(({ name, label }) => {
    return (
      <React.Fragment key={name}>
        <Input id={name} data-type={name} onChange={func(name)} checked={filterState[name]} />
        <Label htmlFor={name}>{label}</Label>
      </React.Fragment>
    );
  });
};

const Input = styled.input.attrs(() => {
  return {
    type: 'checkbox',
  };
})`
  display: none;
  &:checked + label::before {
    content: '✔';
    transition: border-color 0.3s ease-in-out, content 0.4s ease-in-out;
    border: 1px solid #2196f3;
  }
`;

const Label = styled.label`
  cursor: pointer;
  display: block;
  position: relative;
  padding-top: 13px;
  padding-bottom: 13px;
  padding-left: 50px;
  font-weight: normal;
  font-size: 13px;
  position: relative;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f1fcff;
  }
  &::before {
    content: '';
    color: #2196f3;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    position: absolute;
    width: 20px;
    height: 20px;
    border: 1px solid #9abbce;
    border-radius: 2px;
    transition: border-color 0.3s ease-in-out, content 0.4s ease-in-out;
  }
`;

const FilterWrapp = styled.div`
  flex-basis: 30%;
  height: auto;
  margin-right: 2%;
  padding: 10px 0;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const FilterWrappHeading = styled.h2`
  color: #4a4a4a;
  text-transform: uppercase;
  line-height: 12px;
  font-size: 12px;
  letter-spacing: 0.5px;
  text-align: left;
  font-weight: 600;
  padding: 0 20px 0 20px;
`;

const Filter = ({ handleCheckbox, filterState }) => {
  return (
    <FilterWrapp>
      <FilterWrappHeading>Количество пересадок</FilterWrappHeading>
      {renderCheckbox(handleCheckbox, filterState)}
    </FilterWrapp>
  );
};

export default Filter;
Filter.defaultProps = {
  handleCheckbox: () => {},
  filterState: {},
};

Filter.propTypes = {
  handleCheckbox: PropTypes.func,
  filterState: PropTypes.objectOf(PropTypes.bool),
};
