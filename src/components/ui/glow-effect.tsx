export function GlowEffect({
  colors,
  className
}: {
  colors?: string[];
  mode?: string;
  blur?: string;
  scale?: number;
  duration?: number;
  className?: string;
}) {
  const gradient = colors ? `linear-gradient(45deg, ${colors.join(', ')})` : 'transparent';
  return (
    <div 
      className={`absolute inset-0 z-0 rounded-lg blur-xl opacity-50 ${className || ''}`} 
      style={{ background: gradient }} 
    />
  );
}
