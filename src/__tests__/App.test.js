import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App";

test("pizza checkbox is initially unchecked", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", {
    name: /add pepperoni/i,
  });
  expect(addPepperoni).not.toBeChecked();
});

test("toppings list initially contains only cheese", () => {
  render(<App />);
  expect(screen.getByText(/small cheese/i)).toBeInTheDocument();
});

test("checkbox appears as checked when user clicks it", async () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", {
    name: /add pepperoni/i,
  });

  await userEvent.click(addPepperoni);

  expect(addPepperoni).toBeChecked();
});

test("topping appears in toppings list when checked", async () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", {
    name: /add pepperoni/i,
  });

  await userEvent.click(addPepperoni);

  expect(screen.getByText(/small pepperoni/i)).toBeInTheDocument();
});

test("selected topping disappears when checked a second time", async () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", {
    name: /add pepperoni/i,
  });

  await userEvent.click(addPepperoni); // check
  await userEvent.click(addPepperoni); // uncheck

  expect(addPepperoni).not.toBeChecked();
  expect(screen.getByText(/small cheese/i)).toBeInTheDocument();
});

test("size select element initially displays 'Small'", () => {
  render(<App />);
  const selectSize = screen.getByLabelText(/select size/i);
  expect(selectSize).toHaveDisplayValue("Small");
});

test("select Size dropdown displays the user's selected value", async () => {
  render(<App />);
  const selectSize = screen.getByLabelText(/select size/i);

  await userEvent.selectOptions(selectSize, "medium");
  expect(selectSize).toHaveDisplayValue("Medium");

  await userEvent.selectOptions(selectSize, "large");
  expect(selectSize).toHaveDisplayValue("Large");
});

test("'Your Selection' message initially displays 'small cheese'", () => {
  render(<App />);
  expect(screen.getByText(/small cheese/i)).toBeInTheDocument();
});

test("selecting options updates the 'Your selection' message", async () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", {
    name: /add pepperoni/i,
  });
  const selectSize = screen.getByLabelText(/select size/i);

  await userEvent.click(addPepperoni);
  expect(screen.getByText(/small pepperoni/i)).toBeInTheDocument();

  await userEvent.selectOptions(selectSize, "large");
  expect(screen.getByText(/large pepperoni/i)).toBeInTheDocument();
});

test("'Contact Info' text box initially displays a placeholder value of 'email address'", () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
});

test("the page shows information the user types into the contact form field", async () => {
  render(<App />);
  const contact = screen.getByLabelText(/enter your email address/i);
  await userEvent.type(contact, "pizzafan@email.com");
  expect(contact).toHaveValue("pizzafan@email.com");
});

test("form contains a 'Submit Order' button", () => {
  render(<App />);
  expect(
    screen.getByRole("button", { name: /submit order/i })
  ).toBeInTheDocument();
});

test("clicking the Submit Order button displays a thank you message", async () => {
  render(<App />);
  await userEvent.click(screen.getByRole("button", { name: /submit order/i }));
  expect(screen.getByText(/thanks for your order!/i)).toBeInTheDocument();
});
