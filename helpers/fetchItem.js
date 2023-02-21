const fetchItem = async (id) => {
  try {
    if (!id) throw new Error('You must provide an url');
    const url = `https://api.mercadolibre.com/items/${id}`;
    const data = await fetch(url);
    const result = data.json();
    return result;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
