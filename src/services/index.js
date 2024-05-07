import axios from "axios";
import cors from 'cors'

const makeAnApiCall = async (url,obj) => {
  console.info("inside api call");
  console.log("obj",obj);
  try {
    const axiosObj = {
      method: "POST",
      url: url,
      data:obj
    };
    const response = await axios(axiosObj,cors());
    return response;
  } catch (err) {
    console.error("Error while making an API call", err);
  }
};
export default { makeAnApiCall };
