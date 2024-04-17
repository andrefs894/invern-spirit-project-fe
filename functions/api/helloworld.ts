interface Env {
  D1_DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const ps = context.env.D1_DB.prepare(`SELECT * FROM products`);
  const product = await ps.first();
  return Response.json(product);
};
