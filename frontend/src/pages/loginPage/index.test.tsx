import React from "react";
import LoginPage from "./";
import { render } from "../../test-setUp";

describe("Loginppage", () => {
  it("should render without errors", () => {
    render(<LoginPage />);
  });
});
