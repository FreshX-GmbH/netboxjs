/**
 * Interfaces
 */
module.exports = function interfaces(Client) {
  Client.prototype.getInterfaces = function getInterfaces(params, query = '') {
    return this.axios({
      method: 'get',
      url: `/api/virtualization/interfaces/?${query}`,
      params: params || this.options.defaultParams,
    });
  };
  Client.prototype.createInterface = function createInterface(data) {
    return this.axios({
      method: 'post',
      url: '/api/virtualization/interfaces/',
      data,
    });
  };
};
