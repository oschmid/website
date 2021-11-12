exports.handler = async (event, context) => {
  const { user } = context.clientContext;
  if (!user) {
    return { statusCode: 401, body: JSON.stringify(context.clientContext) };
  }
  return {
    statusCode: 200,
    body: "Hello, World"
  };
};
