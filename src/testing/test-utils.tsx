import { render as rtlRender } from "@testing-library/react";
import { PropsWithChildren, ReactElement } from "react";
import { ChakraProvider } from "@chakra-ui/react";

function render(ui: ReactElement, renderOptions = {}) {
  function Wrapper({ children }: Readonly<PropsWithChildren<{}>>): JSX.Element {
    return <ChakraProvider>{children}</ChakraProvider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything
export * from "@testing-library/react";

// Override render method
export { render };
