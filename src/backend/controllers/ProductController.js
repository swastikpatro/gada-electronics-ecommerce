import { Response } from 'miragejs';

/**
 * All the routes related to Product are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all products in the db.
 * send GET Request at /api/products
 * */

export const getAllProductsHandler = function () {
  return new Response(200, {}, { products: this.db.products });
};

/**
 * This handler handles gets all products in the db.
 * send GET Request at /api/user/products/:productId
 * */

export const getProductHandler = function (schema, request) {
  const productId = request.params.productId;
  try {
    const product = schema.products.findBy({ _id: productId });
    return new Response(200, {}, { product });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

export const searchProductsHandler = function (schema, request) {
  const query = request.queryParams.query;

  try {
    let products = schema.products.where((product) =>
      product.name.toLowerCase().startsWith(query.toLowerCase())
    );

    if (products.length < 10) {
      products = schema.products.where((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    const limitedProducts =
      products.length > 10 ? products.slice(0, 10) : products;

    return new Response(200, {}, { products: limitedProducts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
