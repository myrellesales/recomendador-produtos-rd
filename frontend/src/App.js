//




import React, { useState } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';

function App() {
  const [recommendations, setRecommendations] = useState([]);

  return (
    <div className="min-h-screen bg-brand-soft flex items-center py-12">
      <div className="container mx-auto px-4">

        <h1 className="text-4xl font-bold text-center textdark mb-10">
          Recomendador de Produtos RD Station
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-4xl mx-auto border border-brand-light">

          <p className="text-lg text-gray-700 mb-10 leading-relaxed">
             Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode encontrar uma variedade de produtos da RD Station, cada um projetado para atender às necessidades específicas do seu negócio. De <span className="text-brand font-semibold">CRM</span> a <span className="text-brand font-semibold">Marketing</span>, de <span className="text-brand font-semibold">Conversas</span> a <span className="text-brand font-semibold">Inteligência Artificial</span>, temos uma solução para ajudar você a alcançar seus objetivos. Use o formulário abaixo para selecionar suas preferências e funcionalidades desejadas e receba recomendações personalizadas de produtos que melhor atendam às suas necessidades.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            <div className="bg-brand-soft border border-brand-light p-6 rounded-xl shadow-sm">
              <Form setRecommendations={setRecommendations} />
            </div>

            <div className="bg-optional-light border border-optional p-6 rounded-xl shadow-sm">
              <RecommendationList recommendations={recommendations} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
