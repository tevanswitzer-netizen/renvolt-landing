import { useLayoutEffect, useEffect } from 'react';

/**
 * SSR-safe wrapper around useLayoutEffect.
 * Falls back to useEffect when window is undefined (server-side rendering).
 */
const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
