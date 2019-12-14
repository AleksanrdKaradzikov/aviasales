import axios from 'axios';

export default class AviasalesServise {
  _apiBase = 'https://front-test.beta.aviasales.ru/search';

  async getSearchId() {
    const response = await axios.get(this._apiBase);
    const { searchId } = response.data;
    return searchId;
  }

  async getTickets(searchId) {
    const url = `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`;
    try {
      const response = await axios.get(url);

      if (response.data.stop === true) {
        return response.data.tickets;
      }
      return this.getTickets(searchId);
    } catch (error) {
      return this.getTickets(searchId);
    }
  }
}
