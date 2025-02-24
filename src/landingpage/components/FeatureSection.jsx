import React from 'react';
import { FeatureContent } from './FeatureContent';
import { FeatureImage } from './FeatureImage';

export const FeatureSection = () => {
  return (
    <section className="flex overflow-hidden flex-wrap gap-10 items-center p-20 w-full text-xl text-black max-md:px-5 max-md:max-w-full" aria-labelledby="feature-heading">
      <h2 id="feature-heading" className="sr-only">Feature Overview</h2>
      <FeatureContent />
      <FeatureImage />
    </section>
  );
};