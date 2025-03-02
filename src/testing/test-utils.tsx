import { render as rtlRender } from '@testing-library/react';
import { PropsWithChildren, ReactElement } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import { create } from 'zustand';
import { createMockTypingStore, createMockScoreDataStore, createMockTextStore, createMockLeaderboardStore } from './data-generators';

const useTypingStore = create(createMockTypingStore);
const useScoreDataStore = create(createMockScoreDataStore);
const useTextStore = create(createMockTextStore);
const useLeaderboardStore = create(createMockLeaderboardStore);

function render(
  ui: ReactElement,
  renderOptions = {}
) {
  function Wrapper({ children }: Readonly<PropsWithChildren<{}>>): JSX.Element {
    return (
      <ChakraProvider>
        {children}
      </ChakraProvider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { render, useTypingStore, useScoreDataStore, useTextStore, useLeaderboardStore };
