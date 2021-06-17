
import axios from "axios";

export function fetch(url, method, data) {
  console.log(url)
  return new Promise((resolve, reject) => {
    
    axios({ url, method, data })
      .then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
};
export default fetch