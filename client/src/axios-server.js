import axios from "axios";

//production
// const url = "https://warm-atoll-38113.herokuapp.com/api/shop";

//development
const url = "http://localhost:8080/api/shop";

const instance = axios.create({
	baseURL: url
});

export default instance;
