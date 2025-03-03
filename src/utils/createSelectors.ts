import type { StoreApi, UseBoundStore } from "zustand";

/**
 * Type that adds selector hooks to a Zustand store
 *
 * If S is a store with a getState method returning type T,
 * this adds a 'use' property containing selector hooks for each property in T.
 *
 * Example:
 * For a store with state { count: number, text: string }
 * This creates: { use: { count: () => number, text: () => string } }
 */
type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

/**
 * Creates automatic selectors for a Zustand store
 *
 * This utility enhances a Zustand store by adding selector hooks for each state property.
 * These selectors allow components to subscribe to individual pieces of state,
 * helping to prevent unnecessary re-renders.
 *
 * @see https://zustand.docs.pmnd.rs/guides/auto-generating-selectors
 *
 * @example
 * ```typescript
 * const useStore = create(...)
 * const enhancedStore = createSelectors(useStore)
 * // Now you can use:
 * enhancedStore.use.someProperty() // Instead of: useStore(state => state.someProperty)
 * ```
 *
 * @param _store - The original Zustand store to enhance with selectors
 * @returns The enhanced store with automatically generated selector hooks
 */
export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};
