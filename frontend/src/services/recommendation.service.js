// getRecommendations.js

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products
) => {
  /**
   * lógica para retornar os produtos recomendados.
   */

  let matchesByProduct = {};
  let totalMatches = 0;

  ['selectedPreferences', 'selectedFeatures'].forEach((formField) => {
    const productField = formField.replace('selected', '').toLowerCase();

    (Array.isArray(formData[formField]) ? formData[formField] : []).forEach(
      (criterion) => {
        for (let i = 0; i < products.length; i++) {
          if (products[i][productField].indexOf(criterion) !== -1) {
            const productId = products[i].id;

            if (!matchesByProduct[String(productId)]) {
              matchesByProduct[String(productId)] = {
                name: products[i].name,
                matches: 0,
              };
            }

            matchesByProduct[String(productId)].matches += 1;
            totalMatches += 1;

            break;
          }
        }
      }
    );
  });

  let scoredProducts = [];

  Object.keys(matchesByProduct).forEach((productId) => {
    const matches = matchesByProduct[productId].matches;
    const name = matchesByProduct[productId].name;
    const score = parseFloat(matches / totalMatches);

    scoredProducts.push({ id: productId, score, name });
  });

  const orderedProductsByScore = scoredProducts.sort(
    (a, b) => b.score - a.score
  );

  if (formData.selectedRecommendationType === 'SingleProduct') {
    if (orderedProductsByScore.length === 0) return [];

    // se tiver empate, retorna o último do empate
    const highestScore = orderedProductsByScore[0].score;
    const highestScoreProducts = orderedProductsByScore.filter(
      (product) => product.score === highestScore
    );

    return [highestScoreProducts[highestScoreProducts.length - 1]];
  }

  return orderedProductsByScore;
};

export default { getRecommendations };
