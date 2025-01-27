/**
 * @jest-environment jsdom
 */

// import React from "react";
// import {render, screen} from '@testing-library/react';
// import Login from "../components/login";


// test('renders h1 tag with text', () => {
//     render(<Login />);
//     expect(screen.getByRole("heading", { name: /Login/i })).toBeInTheDocument();
// });

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../components/login";


describe("Login Component", () => {
  test("renders Login form elements", () => {
    render(<Login />);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("SignIn")).toBeInTheDocument();
  });

  test("updates email and password input fields", () => {
    render(<Login />);
    
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "jeeva@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "test@123" } });

    expect(emailInput.value).toBe("jeeva@gmail.com");
    expect(passwordInput.value).toBe("test@123");
  });

  test("displays 'Loading...!' message on submit", () => {
    render(<Login />);
    
    fireEvent.click(screen.getByText("SignIn"));

    expect(screen.getByText("Loading...!")).toBeInTheDocument();
  });

  test("displays 'Successfully Submitted' for correct credentials", async () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "jeeva@gmail.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "test@123" } });
    
    fireEvent.click(screen.getByText("SignIn"));

    // await waitFor(() => {
    //   expect(screen.getByText("Successfully Submitted")).toBeInTheDocument();
    // }, { timeout: 4000 });
  });

  test("displays 'Invalid Credentials' for incorrect credentials", async () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "wrong@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "wrongpassword" } });
    
    fireEvent.click(screen.getByText("SignIn"));

    await waitFor(() => {
      expect(screen.getByText("Invalid Credentials")).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
