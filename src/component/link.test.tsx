import React from "react";
import renderer, { act } from "react-test-renderer";
import Link from "./link";

it("renders correctly", () => {
  const component = renderer.create(<Link page={"www.333.com"}>link</Link>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  act(() => {
    tree.props.onMouseEnter();
  });

  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  act(() => {
    tree.props.onMouseLeave();
  });
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
