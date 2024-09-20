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
        channel: blastData.channel,
        date: blastData.date,
        media: blastData.media,
        time: blastData.time,
        totalBroadcast: blastData.totalBroadcast,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : 'Blast creation failed'
      );
    }
  }

  // Retrieve all blasts (if needed, depending on your app's functionality)
  async getAllBlasts() {
    try {
      const response = await axios.get(`${API_URL}user/create`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : 'Failed to fetch blasts'
      );
    }
  }

  async getBroadcastHistory() {
    try {
      const response = await axios.get(`${API_URL}broadcasts/history`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : 'Failed to fetch history'
      );
    }
  }
  async blastNow(blasts) {
    try {
      const response = await axios.post(`${API_URL}user/blast-now`, {
        title: blasts.title,
        caption: blasts.caption,
        channel: blasts.channel,
        media: blasts.media,
        date: blasts.date,
        createdDate: blasts.createdDate,
        totalBroadcast: blasts.totalBroadcast,
        status: blasts.status,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : 'Blast now failed'
      );
    }
  }

  async editBlast(blasts) {
    try {
      const response = await axios.put(
        `${API_URL}user/editblast/${blasts.id}`,
        {
          id: blasts.id,
          title: blasts.title,
          caption: blasts.caption,
          channel: blasts.channel,
          media: blasts.media,
          date: blasts.date,
          totalBroadcast: blasts.totalBroadcast,
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : 'Edit blast failed'
      );
    }
  }

  async deleteBlast(blasts) {
    try {
      const response = await axios.delete(
        `${API_URL}user/deleteblast/${blasts.id}`,
        {
          id: blasts.id,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : 'Delete blast failed'
      );
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
