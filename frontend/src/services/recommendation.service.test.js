import recommendationService from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

describe('recommendationService', () => {
  test('SingleProduct: retorna um único produto baseado nas preferências selecionadas', () => {
    const userPreferences = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendedProducts = recommendationService.getRecommendations(
      userPreferences,
      mockProducts
    );

    expect(recommendedProducts).toHaveLength(1);
    expect(recommendedProducts[0].name).toBe('RD Conversas');
  });

  test('MultipleProducts: retorna lista de produtos baseada nas preferências selecionadas', () => {
    const userPreferences = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendedProducts = recommendationService.getRecommendations(
      userPreferences,
      mockProducts
    );

    expect(recommendedProducts).toHaveLength(2);
    expect(recommendedProducts.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
  });

  test('SingleProduct: quando há mais de um produto com match, retorna apenas um', () => {
    const userPreferences = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendedProducts = recommendationService.getRecommendations(
      userPreferences,
      mockProducts
    );

    expect(recommendedProducts).toHaveLength(1);
    expect(recommendedProducts[0].name).toBe('RD Station Marketing');
  });

  test('SingleProduct: em caso de empate, retorna o último produto válido', () => {
    const userPreferences = {
      selectedPreferences: [
        'Automação de marketing',
        'Integração com chatbots',
      ],
      selectedFeatures: [],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendedProducts = recommendationService.getRecommendations(
      userPreferences,
      mockProducts
    );

    expect(recommendedProducts).toHaveLength(1);
    expect(recommendedProducts[0].name).toBe('RD Conversas');
  });

  test('MultipleProducts: retorna produtos ordenados por score decrescente', () => {
    const userPreferences = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendedProducts = recommendationService.getRecommendations(
      userPreferences,
      mockProducts
    );

    for (let i = 0; i < recommendedProducts.length - 1; i++) {
      expect(recommendedProducts[i].score).toBeGreaterThanOrEqual(
        recommendedProducts[i + 1].score
      );
    }
  });

  test('Cada produto recomendado possui id, name e score numérico', () => {
    const userPreferences = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendedProducts = recommendationService.getRecommendations(
      userPreferences,
      mockProducts
    );

    recommendedProducts.forEach((product) => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('score');
      expect(typeof product.score).toBe('number');
    });
  });

  test('Retorna array vazio quando nenhuma preferência gera match', () => {
    const userPreferences = {
      selectedPreferences: ['Preferência inexistente'],
      selectedFeatures: ['Feature inexistente'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendedProducts = recommendationService.getRecommendations(
      userPreferences,
      mockProducts
    );

    expect(recommendedProducts).toHaveLength(0);
  });
});
