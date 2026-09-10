import { Suspense, lazy, forwardRef } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const FallbackComponent = forwardRef<HTMLDivElement, any>((_props, ref) => (
  <div ref={ref} className="w-full h-full flex items-center justify-center">
    <p className="font-mono text-xs text-[#9CA3AF]">Scene unavailable</p>
  </div>
));

const Spline = lazy(() =>
  import('@splinetool/react-spline').catch(() => ({
    default: FallbackComponent,
  }))
);

interface SplineSceneProps {
  scene: string;
  className?: string;
}

function SplineLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-4 rounded-full bg-[#D4AF37]/20 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<SplineLoader />}>
        <Spline scene={scene} className={className} />
      </Suspense>
    </ErrorBoundary>
  );
}
