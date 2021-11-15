const { PELOTON_USER_ID, PELOTON_PASSWORD } from process.env;

exports.handler = async (event, context) => {
  const { user } = context.clientContext;
  if (!user) {
    return { statusCode: 401, body: JSON.stringify(context.clientContext) };
  }
  return {
    statusCode: 200,
    body: PELOTON_USER_ID
  };
};
