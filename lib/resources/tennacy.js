/**
 * Interfaces
 */
module.exports = function tenants(Client) {
  Client.prototype.getTenants = function getTenants(params) {
    return this.axios({
      method: 'get',
      url: '/tenancy/tenants/',
      params: params || this.options.defaultParams,
    });
  };
};
