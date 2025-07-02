import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SearchBar } from "@/components/SearchBar";

describe("SearchBar", () => {
  it("renders input and button", () => {
    const mockSearch = vi.fn();
    render(<SearchBar onSearch={mockSearch} />);

    expect(
      screen.getByPlaceholderText(/enter github username/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("shows validation message if input is empty and submitted", async () => {
    const mockSearch = vi.fn();
    render(<SearchBar onSearch={mockSearch} />);

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(
      await screen.findByText(/username is required/i)
    ).toBeInTheDocument();
    expect(mockSearch).not.toHaveBeenCalled();
  });
});
