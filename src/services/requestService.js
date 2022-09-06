import axios from "axios";


const BaseUrl = "http://94.183.176.76:8000"
class Request {
 get(url){
    const axios = require("axios").default;    
    axios
      .get(BaseUrl + url)
      .then((resp) => {
        console.log(resp.data);
        return resp;
      })
      .catch((error) => {
        console.log(error);
        return null
      });
}
}
export default new Request();