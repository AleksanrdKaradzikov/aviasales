import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.div`
  color: #2196f3;
  font-size: 24px;
  line-height: 24px;
  font-weight: 600;
`;

const Img = styled.img`
  width: 110px;
  height: 36px;
`;

const TicketBody = styled.div`
  margin-top: 20px;
`;

const TicketBodyRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 12px;
  }
  .info-block {
    width: 110px;
  }
  .info {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #a0b0b9;
    text-align: left;
  }
  .data {
    display: block;
    text-align: left;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: #4a4a4a;
  }
`;

const Opacity = keyframes`
   from {
      opacity: 0.75; 
    } 

    to {
       opacity: 1; 
    }
`;

const Ticket = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  transition: height 0.5s ease;
  height: auto;
  animation: ${Opacity} 1s linear;
`;

const getInfoShifting = stops => {
  const shifting =
    stops.length === 0
      ? `0 пересадок`
      : stops.length === 1
      ? '1 пересадка'
      : `${stops.length} пересадки`;
  const cities = stops.length === 0 ? `ПРЯМОЙ РЕЙС` : stops.map(code => `${code}`).join(', ');
  return (
    <>
      <span className="info">{shifting}</span>
      <span className="data">{cities}</span>
    </>
  );
};

const getTimeFlight = (departure, duration) => {
  const start = new Date(departure);
  const hours = start.getHours();
  const min = start.getMinutes();
  const startFly = `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
  const stop = new Date(start.getTime() + duration * 60 * 1000);
  const stopHours = stop.getHours();
  const stopMin = stop.getMinutes();
  const stopFly = `${stopHours.toString().padStart(2, '0')}:${stopMin.toString().padStart(2, '0')}`;
  const flightTime = `${startFly} - ${stopFly}`;
  return flightTime;
};

const getAllTimeFly = duration => {
  const hours = Math.floor(duration / 60);
  const min = duration - hours * 60;
  const allTime = `${hours.toString().padStart(2, '0')}ч ${min.toString().padStart(2, '0')}м`;
  return allTime;
};

const Tickets = ({ price, carrier, segments }) => {
  const there = getInfoShifting(segments[0].stops);
  const back = getInfoShifting(segments[1].stops);
  const dateThere = getTimeFlight(segments[0].date, segments[0].duration);
  const dateBack = getTimeFlight(segments[1].date, segments[1].duration);
  const thereAllTimeFly = getAllTimeFly(segments[0].duration);
  const backAllTimeFly = getAllTimeFly(segments[1].duration);
  return (
    <Ticket>
      <TicketHeader>
        <Price>{`${
          price > 10000 ? `${String(price)[0] + String(price)[1]} ${String(price).slice(2)}` : price
        } Р`}</Price>
        <Img src={`//pics.avs.io/99/36/{${carrier}}.png`} />
      </TicketHeader>
      <TicketBody>
        <TicketBodyRow>
          <div className="info-block">
            <span className="info">{`${segments[0].origin} - ${segments[0].destination}`}</span>
            <span className="data">{dateThere}</span>
          </div>
          <div className="info-block">
            <span className="info">В пути</span>
            <span className="data">{thereAllTimeFly}</span>
          </div>
          <div className="info-block">{there}</div>
        </TicketBodyRow>
        <TicketBodyRow>
          <div className="info-block">
            <span className="info">{`${segments[1].origin} - ${segments[1].destination}`}</span>
            <span className="data">{dateBack}</span>
          </div>
          <div className="info-block">
            <span className="info">В пути</span>
            <span className="data">{backAllTimeFly}</span>
          </div>
          <div className="info-block">{back}</div>
        </TicketBodyRow>
      </TicketBody>
    </Ticket>
  );
};

export default Tickets;

Tickets.defaultProps = {
  price: 0,
  carrier: '',
  segments: [{}],
};

Tickets.propTypes = {
  price: PropTypes.number,
  carrier: PropTypes.string,
  segments: PropTypes.arrayOf(PropTypes.object),
};
