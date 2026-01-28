// Form.js

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

    const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.selectedRecommendationType) return;

    const dataRecommendations = recommendationService.getRecommendations(
      formData,
      products
    );

    if (formData.selectedRecommendationType === 'SingleProduct') {
      setRecommendations(dataRecommendations.slice(0, 1));
    } else {
      setRecommendations(dataRecommendations);
    }
  };

  return (
    <form
      className="w-full max-w-xl space-y-6"
       onSubmit={handleSubmit}
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
