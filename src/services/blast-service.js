// eslint-disable-next-line
import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class BlastService {
  // Create a new broadcast blast
  async createBlast(blastData) {
    try {
      const response = await axios.post(`${API_URL}user/create`, {
        title: blastData.title,
        caption: blastData.caption,
        channel: blastData.channel,  // array of channels
        date: blastData.date,
        time: blastData.time,
        totalBroadcast: blastData.totalBroadcast, // Example, adjust as per backend
      });
      console.log(response)
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : 'Blast creation failed');
    }
  }

  // Retrieve all blasts (if needed, depending on your app's functionality)
  async getAllBlasts() {
    try {
      const response = await axios.get(`${API_URL}user/blasts`);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : 'Failed to fetch blasts');
    }
  }

  // Utility to get axios headers with Authorization token
  getAuthHeader() {
    const token = localStorage.getItem('token');
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  }
}
// eslint-disable-next-line
export default new BlastService();
