import { shallow } from "enzyme";
import React from "react";
import App from "./App";

it("renders without crashing", () => {
  const cmp = shallow(<App />);
  expect(cmp.find(".App-header").text()).toBe("Exchange");
});
