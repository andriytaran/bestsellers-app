import axios from 'axios';

import { HttpTimeoutError, HttpStatusError, HttpNetworkError } from "./error";

export async function post (url, body) {
	const bodyFormData = new FormData();
	Object.entries(body).forEach(([key, value]) => bodyFormData.append(key, value));

	const response = await axios.post(url, bodyFormData).catch(err => {
		// https://github.com/axios/axios/issues/383#issuecomment-436506793
		if (err.code === 'ECONNABORTED') {
			throw new HttpTimeoutError();
		}
		if (!err.response) {
			throw new HttpNetworkError();
		}
		const statusCode = err.response.status;
		const responseBody = err.response.data;
		throw new HttpStatusError(statusCode, responseBody);
	});
	return response.data;
}
