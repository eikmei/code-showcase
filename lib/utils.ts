import { type CxOptions, cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: CxOptions) => twMerge(cx(inputs));

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatLabel = (label: string): string => {
  return label
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(' ')
    .map((word) => {
      if (word === word.toUpperCase()) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};
