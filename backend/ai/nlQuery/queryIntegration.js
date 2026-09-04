// backend/ai/nlQuery/queryIntegration.js
const { routeQuery } = require('./queryRouter');

async function handleDashboardQuery(query, user) {
  const roleData = {
    type: user ? user.role : 'guest',
    userId: user ? user.id : null
  };

  const result = await routeQuery(query, roleData);

  return {
    dashboardWidget: 'search_result',
    result
  };
}

module.exports = {
  handleDashboardQuery
};
