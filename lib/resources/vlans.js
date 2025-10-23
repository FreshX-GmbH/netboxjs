/**
 * Vlans
 */
module.exports = function vlans(Client) {
  Client.prototype.getVlans = function getVlans(query = '') {
    return this.axios({
      method: 'get',
      url: `/api/ipam/vlans/?${query}`
    });
  };
}
