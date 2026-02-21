import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  /** ID pour l'ancre de navigation */
  id?: string;
  /** Classe CSS additionnelle */
  className?: string;
  /** Couleur de fond */
  background?: 'white' | 'gray' | 'dark' | 'gradient-yellow' | 'gradient-green' | 'transparent';
  /** Hauteur minimale */
  minHeight?: 'none' | 'screen' | 'half';
  /** Padding vertical */
  paddingY?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Layout de la section */
  layout?: 'default' | 'centered' | 'split';
}

const backgroundClasses = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  dark: 'bg-black',
  'gradient-yellow': 'bg-linear-to-b from-yellow-50 via-green-50 to-yellow-100',
  'gradient-green': 'bg-linear-to-b from-green-50 to-yellow-50',
  transparent: 'bg-transparent',
};

const minHeightClasses = {
  none: '',
  screen: 'min-h-screen',
  half: 'min-h-[50vh]',
};

const paddingYClasses = {
  none: '',
  sm: 'py-8 sm:py-12',
  md: 'py-12 sm:py-16 md:py-20',
  lg: 'py-16 sm:py-20 md:py-24',
  xl: 'py-20 sm:py-24 md:py-32',
};

const layoutClasses = {
  default: '',
  centered: 'flex flex-col items-center justify-center',
  split: 'flex flex-col lg:flex-row',
};

/**
 * Composant Section responsive pour structurer le contenu des pages
 * 
 * @example
 * ```tsx
 * <Section id="about" background="gradient-yellow" minHeight="screen" layout="centered">
 *   <h2>À propos</h2>
 * </Section>
 * ```
 */
export default function Section({
  children,
  id,
  className = '',
  background = 'transparent',
  minHeight = 'none',
  paddingY = 'md',
  layout = 'default',
}: SectionProps) {
  return (
    <section
      id={id}
      className={`
        ${backgroundClasses[background]}
        ${minHeightClasses[minHeight]}
        ${paddingYClasses[paddingY]}
        ${layoutClasses[layout]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </section>
  );
}
