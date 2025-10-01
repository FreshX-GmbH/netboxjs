/**
 * Interfaces
 */
module.exports = function tenants(Client) {
  Client.prototype.getTenants = function getTenants(params,query) {
    return this.axios({
      method: 'get',
      url: `/api/tenancy/tenants/?${query}`,
      params: params || this.options.defaultParams,
    });
  };
  Client.prototype.getTenant = function getTenant(query) {
    return this.axios({
      method: 'get',
      url: `/api/tenancy/tenants/?${query}`,
    });
  };
};
