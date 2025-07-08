import { useQuery } from '@tanstack/react-query';

// Test simple pour CoCart
export const useCoCartTest = () => {
  return useQuery({
    queryKey: ['cocart-test'],
    queryFn: async () => {
      try {
        // Test direct de l'API CoCart
        const response = await fetch('https://wordpress-t0ccgocs0sk0k0g0s4gocwkg.gestionmax.fr/wp-json/cocart/v2/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('CoCart API Response:', data);
        return data;
      } catch (error) {
        console.error('CoCart API Error:', error);
        throw error;
      }
    },
    staleTime: 60 * 1000, // 1 minute
  });
};