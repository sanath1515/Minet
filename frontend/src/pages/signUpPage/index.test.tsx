import React from "react";
import SignUpPage from "./";
import { render } from "../../test-setUp";

describe("Signuppage", () => {
  it("should render without errors", () => {
    render(<SignUpPage />);
  });
});
