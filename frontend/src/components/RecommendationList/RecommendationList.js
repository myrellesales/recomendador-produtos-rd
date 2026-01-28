import React from 'react';

function RecommendationList({ recommendations }) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4 sticky top-0 bg-optional-light pb-2 z-10">
        Lista de Recomendações:
      </h2>

      {recommendations.length === 0 && (
        <p className="text-gray-500">Nenhuma recomendação encontrada.</p>
      )}

      <ul className="space-y-2">
        {recommendations.map((recommendation, index) => (
          <li key={index} className="mb-2">
            {recommendation.name} (Score:{' '}
            {(recommendation.score * 100).toFixed(2)}%)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationList;
