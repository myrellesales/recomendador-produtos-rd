// getRecommendations.js

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products
) => {
  /**
   * lógica para retornar os produtos recomendados.
   */

  let productResults = {};
  let total = 0;
  ['selectedPreferences', 'selectedFeatures'].forEach((_attr) => {
    let productAttr = _attr.replace('selected', '').toLowerCase();
    (Array.isArray(formData[_attr]) ? formData[_attr] : []).forEach((c) => {
      for (let i = 0; i < products.length; i++) {
        if (products[i][productAttr].indexOf(c) !== -1) {
          let _id = products[i]['id'];

          if (!productResults[String(_id)]) {
            productResults[String(_id)] = { name: products[i]['name'], qtd: 0 };
          }
          productResults[String(_id)]['qtd'] += 1;
          total += 1;

          break;
        }
      }
    });
  });

  let productResultScore = [];
  Object.keys(productResults).forEach((product_id) => {
    let qtd = productResults[product_id]['qtd'];
    let name = productResults[product_id]['name'];
    let score = parseFloat(qtd / total);
    productResultScore.push({ id: product_id, score: score, name: name });
  });

  let productResultScoreOrdered = productResultScore.sort(
    (a, b) => b.score - a.score
  );

  if (formData.selectedRecommendationType === 'SingleProduct') {
    if (productResultScoreOrdered.length === 0) return [];
    // se tiver empate, retorna o último do empate
    const maxScore = productResultScoreOrdered[0].score;
    const maxScoreProducts = productResultScoreOrdered.filter(
      (p) => p.score === maxScore
    );
    return [maxScoreProducts[maxScoreProducts.length - 1]];
  }

  return productResultScoreOrdered;
};

export default { getRecommendations };
