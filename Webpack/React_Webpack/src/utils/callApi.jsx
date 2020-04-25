import axios from "axios";
import * as Config from "../constant/config";

export default async function callApi(enpoint, method = "GET", body) {
  return await axios({
    method: method,
    url: `${Config.host}${enpoint}`,
    data: body,
  }).catch((err) => {
    console.log(err);
  });
}
