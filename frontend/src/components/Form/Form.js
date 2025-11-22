// Form.js

import React, { useEffect } from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import recommendationService from '../../services/recommendation.service';

function Form({ setRecommendations }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  useEffect(() => {
    if (!formData.selectedRecommendationType) return;
    const dataRecommendations = recommendationService.getRecommendations(
      formData,
      products
    );
    if (formData.selectedRecommendationType === 'SingleProduct') {
      setRecommendations([dataRecommendations[0]]);
    } else {
      setRecommendations(dataRecommendations);
    }
  }, [formData, products, setRecommendations]);

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
      onSubmit={(e) => e.preventDefault()}
    >
      <Preferences
        preferences={preferences}
        onPreferenceChange={(selected) =>
          handleChange('selectedPreferences', selected)
        }
      />
      <Features
        features={features}
        onFeatureChange={(selected) =>
          handleChange('selectedFeatures', selected)
        }
      />
      <RecommendationType
        onRecommendationTypeChange={(selected) =>
          handleChange('selectedRecommendationType', selected)
        }
      />
      <SubmitButton text="Obter recomendação" />
    </form>
  );
}

export default Form;
