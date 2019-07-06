import MemoryStorage from "Base/MemoryStorage";
import { API_URL } from "../../appConfig";

/**
  * Request data from API server
  *
  * @param {Object} payload
  * @param {String} payload.model
  * @param {String} payload.method
  * @param {Object} payload.data
*/
const api = (payload) => {
 const { model, method, data = {}, version = 1 } = payload;

 return new Promise((resolve, rejects) => {
   fetch(`${API_URL}/api/${model}/v${version}/${method}`, {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
       authorization: MemoryStorage.get("token"),
     },
     body: JSON.stringify(data),
   }).then((res) => res.json())
   .then((res) => {
     if (res.error) {
       rejects(res.error);
     } else {
       resolve(res);
     }
   })
   .catch(rejects);
 });
}

export default {
  api,
};
