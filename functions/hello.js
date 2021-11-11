exports.handler = async (event, context) => {
  const { user } = context.clientContext;
  if (!user) {
    return { statusCode: 401 };
  }
  return {
    statusCode: 200,
    body: "Hello, World"
  };
};
