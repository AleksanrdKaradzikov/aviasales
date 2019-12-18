import React from 'react';
import Filter from './filter';
import TicketsWrapper from './tickets-wrapp';
import AviasalesServise from '../servises/aviasales-servises';

function sortedTickets(tickets, sort) {
  switch (sort) {
    case 'Cheap': {
      return tickets.sort((objA, objB) => {
        return objA.price - objB.price;
      });
    }
    case 'Quick': {
      return tickets.sort((objA, objB) => {
        return (
          objA.segments[0].duration +
          objA.segments[1].duration -
          (objB.segments[0].duration + objB.segments[1].duration)
        );
      });
    }
    default: {
      return tickets;
    }
  }
}

export default class Aviasales extends React.Component {
  aviaServise = new AviasalesServise();

  constructor() {
    super();
    this.state = {
      filterState: {
        all: false,
        withoutTransfer: true,
        oneTransfer: true,
        twoTransfer: false,
        threeTransfer: false,
      },
      sort: 'Cheap',
      tickets: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.aviaServise.getSearchId().then(this.getAllTickets);
  }

  getAllTickets = searchId => {
    this.aviaServise.getTickets(searchId).then(response => {
      const newtTickets = response.data.tickets;
      const { stop } = response.data;
      if (stop) {
        const { tickets } = this.state;
        this.setState({
          tickets: [...tickets, ...newtTickets],
          loading: false,
        });
        return;
      }

      const { tickets } = this.state;
      this.setState({
        tickets: [...tickets, ...newtTickets],
        loading: false,
      });
      this.getAllTickets(searchId);
    });
  };

  handleButttonClick = dataSort => {
    this.setState({
      sort: dataSort,
    });
  };

  handleResetFilter = () => {
    const { filterState } = this.state;
    const newFilterState = Object.keys(filterState).reduce((acc, key) => {
      return { ...acc, [key]: true };
    }, {});
    this.setState({
      filterState: newFilterState,
    });
  };

  handleCheckbox = type => () => {
    const { filterState, tickets } = this.state;
    if (type === 'all') {
      const boolToggle = !filterState[type];
      const newFilterState = Object.keys(filterState).reduce((acc, key) => {
        return { ...acc, [key]: boolToggle };
      }, {});
      this.setState({
        filterState: newFilterState,
      });
      return;
    }

    if (filterState.all === true) {
      filterState[type] = !filterState[type];
      filterState.all = !filterState.all;
      this.setState({ filterState, tickets });
      return;
    }

    let trufie = 0;
    Object.values(filterState)
      .slice(1)
      .forEach(el => {
        if (el === true) {
          trufie += 1;
        }
      });

    if (filterState.all === false && trufie === 3 && filterState[type] === false) {
      filterState[type] = !filterState[type];
      filterState.all = !filterState.all;
      this.setState({ filterState, tickets });
      return;
    }

    const newFilterState = filterState;
    newFilterState[type] = !newFilterState[type];
    this.setState({ filterState: newFilterState, tickets });
  };

  filtered(tickets) {
    const { filterState } = this.state;
    const values = Object.values(filterState);
    if (values.every(el => el === true)) {
      return tickets;
    }

    let withoutTransfer = [];
    let oneTransfer = [];
    let twoTransfer = [];
    let threeTransfer = [];

    if (filterState.withoutTransfer) {
      withoutTransfer = tickets.filter(ticket => {
        return (
          (ticket.segments[0].stops.length === 0 && ticket.segments[1].stops.length === 0) ||
          ticket.segments[0].stops.length === 0 ||
          ticket.segments[1].stops.length === 0
        );
      });
    }

    if (filterState.oneTransfer) {
      oneTransfer = tickets.filter(ticket => {
        return ticket.segments[0].stops.length === 1 || ticket.segments[1].stops.length === 1;
      });
    }

    if (filterState.twoTransfer) {
      twoTransfer = tickets.filter(ticket => {
        return ticket.segments[0].stops.length === 2 || ticket.segments[1].stops.length === 2;
      });
    }

    if (filterState.threeTransfer) {
      threeTransfer = tickets.filter(ticket => {
        return ticket.segments[0].stops.length === 3 || ticket.segments[1].stops.length === 3;
      });
    }

    const visibleTickets = [...withoutTransfer, ...oneTransfer, ...twoTransfer, ...threeTransfer];
    return visibleTickets;
  }

  render() {
    const { sort, loading, tickets, filterState } = this.state;
    const filterValues = Object.values(filterState);
    let visibleTickets = null;

    if (filterValues.every(filter => filter === false)) {
      visibleTickets = tickets.length;
    } else {
      visibleTickets = sortedTickets(this.filtered(tickets.slice()), sort);
    }

    return (
      <>
        <Filter handleCheckbox={this.handleCheckbox} filterState={filterState} />
        <TicketsWrapper
          sort={sort}
          loading={loading}
          handleResetFilter={this.handleResetFilter}
          tickets={visibleTickets}
          handleButttonClick={this.handleButttonClick}
        />
      </>
    );
  }
}
