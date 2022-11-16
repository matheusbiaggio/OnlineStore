export async function getCategories() {
  const categoriesAPI = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const fetchedCategoriesAPI = await categoriesAPI.json();
  return fetchedCategoriesAPI;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const categoriesAndQueryAPI = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const fetchedcategoriesAndQueryAPI = await categoriesAndQueryAPI.json();
  return fetchedcategoriesAndQueryAPI;
}

export async function getProductById(productId) {
  const id = `https://api.mercadolibre.com/items/${productId}`;
  const response = await fetch(id);
  const data = await response.json();
  return data;
}

export async function getProductByQuery(query) {
  const queryAPI = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const fetchedQueryAPI = await queryAPI.json();
  return fetchedQueryAPI;
}
