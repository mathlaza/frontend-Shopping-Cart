const fetchItem = async (querry) => {
  try {
    if (!querry) throw new Error('You must provide an url');
    const url = `https://api.mercadolibre.com/items/${querry}`;
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
