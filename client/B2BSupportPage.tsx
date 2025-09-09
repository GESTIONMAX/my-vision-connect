
import { SupportHero } from './SupportHero';
import { ContactMethods } from './ContactMethods';
import { FAQ } from './FAQ';
import { SupportResources } from './SupportResources';
import { SupportStats } from './SupportStats';

export const B2BSupportPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SupportHero />
      <ContactMethods />
      <FAQ />
      <SupportResources />
      <SupportStats />
    </div>
  );
};
