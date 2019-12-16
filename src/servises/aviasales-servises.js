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
      return response;
    } catch (err) {
      return this.getTickets(searchId);
    }
  }
}
