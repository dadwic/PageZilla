import * as React from 'react';
import useEnhancedEffect from './useEnhancedEffect';

export default function useEventCallback<T extends (...args: any[]) => any>(
  func: T
): T;

export default function useEventCallback(fn) {
  const ref = React.useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });
  return React.useCallback((...args) => ref.current(...args), []);
}
