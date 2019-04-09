import axios from 'axios';
import MemoryStorage from './MemoryStorage';

class Request {
  constructor() {
    /**
     * base request for api data
     */
    this.apiRequest = axios.create({
      method: 'post',
      baseURL: 'http://192.168.0.102:5050/api/',
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
      }).catch(function (error) {
        rejects(error);
      });
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
      }).catch(function (error) {
        rejects(error);
      });
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
      }).catch(function (error) {
        rejects(error);
      });
    });
  }
}

export default new Request();
