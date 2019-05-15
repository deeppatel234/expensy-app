import axios from 'axios';
import MemoryStorage from './MemoryStorage';

class Request {
  constructor() {
    /**
     * base request for api data
     */
    this.apiRequest = axios.create({
      method: 'post',
      baseURL: 'http://10.70.2.188:5050/api/',
    });
    /**
     * get request for external call
     */
    this.getRequest = axios.create({
      method: 'get',
    });
    /**
     * post request for external call
     */
    this.postRequest = axios.create({
      method: 'post',
    });
  }

  /**
   * Request data from API server
   *
   * @param {Object} payload
   * @param {String} payload.model
   * @param {String} payload.method
   * @param {Object} payload.data
   */
  api(payload) {
    const {
      model,
      method,
      data = {},
    } = payload;

    return new Promise((resolve, rejects) => {
      this.apiRequest({
        url: `${model}/${method}`,
        data,
        headers: {
          authorization: MemoryStorage.get('token'),
        },
      }).then((res) => {
        if (res.data.error) {
          rejects(res.data.error);
        } else {
          resolve(res.data);
        }
      }).catch(rejects);
    });
  }

  get(payload) {
    return new Promise((resolve, rejects) => {
      this.getRequest(payload).then((res) => {
        if (res.data.error) {
          rejects(res.data.error);
        } else {
          resolve(res.data);
        }
      }).catch(rejects);
    });
  }

  post(payload) {
    return new Promise((resolve, rejects) => {
      this.postRequest(payload).then((res) => {
        if (res.data.error) {
          rejects(res.data.error);
        } else {
          resolve(res.data);
        }
      }).catch(rejects);
    });
  }
}

export default new Request();
