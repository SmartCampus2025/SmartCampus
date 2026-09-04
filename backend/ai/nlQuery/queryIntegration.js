// /ai/nlpQuery/queryIntegration.js
import { routeQuery } from "./queryRouter.js";

export async function handleDashboardQuery(query, user) {
  const roleData = {
    type: user.role, 
    userId: user.id
  };

  const result = await routeQuery(query, roleData);

  return {
    dashboardWidget: "searchResults",
    data: result
  };
}
