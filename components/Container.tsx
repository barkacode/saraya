import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  /** Classe CSS additionnelle */
  className?: string;
  /** Largeur maximale */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /** Padding horizontal */
  paddingX?: 'none' | 'sm' | 'md' | 'lg' | 'responsive';
  /** Centre le contenu verticalement */
  centerY?: boolean;
}

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
};

const paddingXClasses = {
  none: '',
  sm: 'px-2',
  md: 'px-4',
  lg: 'px-8',
  responsive: 'px-4 sm:px-6 lg:px-8',
};

/**
 * Conteneur responsive pour limiter la largeur du contenu
 * 
 * @example
 * ```tsx
 * <Container size="lg">
 *   <h1>Titre</h1>
 *   <p>Contenu...</p>
 * </Container>
 * ```
 */
export default function Container({
  children,
  className = '',
  size = 'lg',
  paddingX = 'responsive',
  centerY = false,
}: ContainerProps) {
  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${paddingXClasses[paddingX]}
        ${centerY ? 'flex items-center' : ''}
        mx-auto w-full
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </div>
  );
}
