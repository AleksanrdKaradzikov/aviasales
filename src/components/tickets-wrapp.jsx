import React from 'react';
import styled, { keyframes } from 'styled-components';
import Tickets from './tikets';
import Spiner from './spiner';

const TicketsWrapp = styled.div`
  flex-basis: calc(100% - 32%);
`;

const ButtonsBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ButtonLeft = styled.button`
  padding: 15px 57px;
  width: 50%;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
  font-weight: 600;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: ${({ sort }) => (sort === 'Cheap' ? '#2196F3' : '#FFFFFF')};
  color: ${({ sort }) => (sort === 'Cheap' ? '#FFFFFF' : ' #4A4A4A')};
  cursor: pointer;
  outline: none;
  transition: background-color 0.5s ease;
  border: ${({ sort }) => (sort === 'Cheap' ? 'none' : '1px solid #DFE5EC')};
  &:hover {
    background-color: ${({ sort }) => (sort === 'Cheap' ? '#2196F3' : 'rgb(201, 222, 228)')};
  }
`;

const ButtonRight = styled.button`
  padding: 15px 57px;
  width: 50%;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
  font-weight: 600;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: ${({ sort }) => (sort === 'Quick' ? '#2196F3' : '#FFFFFF')};
  color: ${({ sort }) => (sort === 'Quick' ? '#FFFFFF' : ' #4A4A4A')};
  cursor: pointer;
  outline: none;
  transition: background-color 0.5s ease;
  &:hover {
    background-color: ${({ sort }) => (sort === 'Quick' ? '#2196F3' : 'rgb(201, 222, 228)')};
  }
  border: ${({ sort }) => (sort === 'Quick' ? 'none' : '1px solid #DFE5EC')};
`;

const SpinerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const Opacity = keyframes`
   from {
      opacity: 0.75; 
    } 

    to {
       opacity: 1; 
    }
`;

const WithoutFilterWrapp = styled.div`
  padding: 20px;
  background: #2196f3;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  transition: height 0.5s ease, opacity 1s ease;
  height: auto;
  animation: ${Opacity} 1s linear;
`;

const WithoutText = styled.p`
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  color: #ffffff;
  margin-top: 0;
`;
const SmallText = styled.p`
  color: #ffffff;
  font-size: 12px;
  font-weight: normal;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const RelaxBtn = styled.button`
  background-color: #ff7b19;
  color: #ffffff;
  font-size: 15px;
  padding: 12px 30px;
  text-align: center;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-weight: 600;
  transition: background-color 0.4s ease;
  &:hover {
    background-color: orangered;
  }
`;

const renderTickets = (tickets, func) => {
  if (Array.isArray(tickets)) {
    return tickets.slice(0, 5).map(({ price, carrier, segments }) => {
      return (
        <Tickets key={price + Math.random()} price={price} carrier={carrier} segments={segments} />
      );
    });
  }
  return (
    <WithoutFilterWrapp>
      <WithoutText>
        {`Мы нашли ${tickets} рейс, но ни один не соответствует заданным фильтрам.`}
      </WithoutText>
      <SmallText>
        Нажмите на название, чтобы выбрать фильтр или на кнопу ниже, чтобы сбросить его.
      </SmallText>
      <RelaxBtn onClick={() => func()}>Расслабить фильтры</RelaxBtn>
    </WithoutFilterWrapp>
  );
};

const TicketsWrapper = ({
  sort,
  handleButttonClick,
  loading = false,
  tikets = null,
  handleResetFilter = false,
}) => {
  const spiner = loading ? (
    <SpinerWrapper>
      <Spiner />
    </SpinerWrapper>
  ) : null;
  const ticket = !loading ? renderTickets(tikets, handleResetFilter) : null;
  return (
    <TicketsWrapp>
      <ButtonsBlock>
        <ButtonLeft
          sort={sort}
          onClick={event => handleButttonClick(event.target.getAttribute('data-sort'))}
          data-sort="Cheap"
        >
          Самый дешевый
        </ButtonLeft>
        <ButtonRight
          sort={sort}
          onClick={event => handleButttonClick(event.target.getAttribute('data-sort'))}
          data-sort="Quick"
        >
          Самый быстрый
        </ButtonRight>
      </ButtonsBlock>
      {spiner}
      {ticket}
    </TicketsWrapp>
  );
};

export default TicketsWrapper;
