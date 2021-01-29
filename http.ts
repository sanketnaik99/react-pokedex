import axios from "axios";
import wrapper from "axios-cache-plugin";

let http = wrapper(axios, {
  maxCacheSize: 100,
});
export default http;
