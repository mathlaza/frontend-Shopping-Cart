const fetchProducts = async (querry) => {
  try {
    if (!querry) throw new Error('You must provide an url');
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${querry}`;
    const data = await fetch(url);
    const result = await data.json();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
