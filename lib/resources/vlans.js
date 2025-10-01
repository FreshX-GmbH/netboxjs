/**
 * Vlans
 */
module.exports = function vlans(Client) {
  Client.prototype.getVlans = function getVlans(params) {
    return this.axios({
      method: 'get',
      url: `/api/ipam/vlans/?${params}`
    });
  };
}
