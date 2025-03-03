import "@testing-library/jest-dom";
import { render, screen } from "../testing/test-utils";
import App from "../App";

describe("App tests", () => {
  describe("Render components", () => {
    /**
     * TODO: Fix the following test by using the correct text to find the heading (h1)
     */
    it("App should render and contains the heading", () => {
      render(<App />);

      const headingText = "Typing Speed Test";
      const heading = screen.getByRole("heading", {
        name: headingText,
        level: 1,
      });
      expect(heading).toBeInTheDocument();
    });

    /**
     * TODO: Implement the following test by using the correct functions
     * to find h3 tag and assert the test
     */
    it("App should render and contains the sub heading", () => {
      render(<App />);
      const subHeadingText = "Test Your Typing Speed, Scrub!";
      const subHeading = screen.getByRole("heading", {
        name: subHeadingText,
        level: 3,
      });
      expect(subHeading).toBeInTheDocument();
    });
  });
});
