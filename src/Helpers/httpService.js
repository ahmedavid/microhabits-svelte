//const baseUrl = "https://habitrack-bbe4b.firebaseio.com/microhabits/";
const baseUrl = "https://davidahmadovdev.firebaseio.com/microhabits/";

export default class HttpService {
  constructor(){}
  /**
   * @param {string} url
   * @returns {Promise<any>}
   */
  static async get(uri) {
    const response = await fetch(baseUrl + uri);
    return response.json();
  }

  /**
   * @param {string} url 
   * @param {Object} body 
   * @returns {Promise}
   */
  static async post(uri, body) {
    const response = await fetch(baseUrl + uri,{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(body)
    });
    return await response.json();
  }

  static async patch(uri, body) {
    const response = await fetch(baseUrl + uri,{
      method: 'PATCH',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(body)
    });
    return await response.json();
  }

  static async delete(uri) {
    const response = await fetch(baseUrl + uri,{
      method: 'DELETE',
      headers: {'Content-Type':'application/json'}
    });
    return await response;
  }
}