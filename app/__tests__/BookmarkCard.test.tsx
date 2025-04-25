import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookmarkCard from "../components/bookmark";
import { useGetOpportunityByIdQuery } from "../../services/sliceApi";
import { useSession } from "next-auth/react";
import { BookmarkCrud, getBookmarks } from "../bookmark/bookmarkapi";
// Mock the API hooks and dependencies
jest.mock("../../services/sliceApi", () => ({
  useGetOpportunityByIdQuery: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("../bookmark/bookmarkapi", () => ({
  BookmarkCrud: jest.fn(),
  getBookmarks: jest.fn(),
}));

describe("BookmarkCard Component", () => {
  const mockJob = {
    id: "1",
    title: "Software Engineer",
    orgName: "Tech Corp",
    logoUrl: "/tech-corp.png",
    location: ["New York", "Remote"],
    description: "Exciting opportunity for a software engineer",
    opType: "inPerson",
    categories: ["Full-time", "Development"],
    // Add other required fields from JobPost interface
  };

  const mockSession = {
    user: {
      accessToken: "mock-token",
    },
  };

  // Mock console.error before each test
  const originalConsoleError = console.error;
  beforeEach(() => {
    console.error = jest.fn();
    (useSession as jest.Mock).mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });
    (useGetOpportunityByIdQuery as jest.Mock).mockReturnValue({
      data: { data: mockJob },
      error: null,
      isLoading: false,
    });
    (getBookmarks as jest.Mock).mockResolvedValue([]);
    (BookmarkCrud as jest.Mock).mockResolvedValue({ success: true });
  });

  afterEach(() => {
    console.error = originalConsoleError;
    jest.clearAllMocks();
  });

  it("renders job card with correct information", async () => {
    render(<BookmarkCard id="1" />);

    await waitFor(() => {
      expect(screen.getByText("Software Engineer")).toBeInTheDocument();
      expect(screen.getByText("Tech Corp")).toBeInTheDocument();
      expect(screen.getByText("New York")).toBeInTheDocument();
      expect(screen.getByText("Remote")).toBeInTheDocument();
      expect(
        screen.getByText("Exciting opportunity for a software engineer")
      ).toBeInTheDocument();
      expect(screen.getByText("inPerson")).toBeInTheDocument();
      expect(screen.getByText("Full-time")).toBeInTheDocument();
      expect(screen.getByText("Development")).toBeInTheDocument();
    });
  });

  it("shows bookmark button when user is authenticated", async () => {
    render(<BookmarkCard id="1" />);

    await waitFor(() => {
      const bookmarkButton = screen.getByRole("button", { name: /bookmark/i });
      expect(bookmarkButton).toBeInTheDocument();
    });
  });

  it("does not show bookmark button when user is not authenticated", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<BookmarkCard id="1" />);

    await waitFor(() => {
      const bookmarkButton = screen.queryByRole("button", {
        name: /bookmark/i,
      });
      expect(bookmarkButton).not.toBeInTheDocument();
    });
  });

  it("toggles bookmark state when clicked", async () => {
    render(<BookmarkCard id="1" />);

    await waitFor(() => {
      const bookmarkButton = screen.getByRole("button", { name: /bookmark/i });
      fireEvent.click(bookmarkButton);

      expect(BookmarkCrud).toHaveBeenCalledWith("1", "mock-token", false);
    });
  });

  it("shows bookmarked icon when job is bookmarked", async () => {
    // Mock getBookmarks to return the job as bookmarked
    (getBookmarks as jest.Mock).mockResolvedValue([{ eventID: "1" }]);

    const { rerender } = render(<BookmarkCard id="1" />);

    // Force a re-render after the useEffect has run
    await waitFor(() => {
      rerender(<BookmarkCard id="1" />);
      const bookmarkIcon = screen.getByAltText("Bookmark");
      expect(bookmarkIcon).toHaveAttribute("src", "/Bookmarked.png");
    });
  });

  it("shows unbookmarked icon when job is not bookmarked", async () => {
    // Explicitly set bookmarked state to empty
    (getBookmarks as jest.Mock).mockResolvedValue([]);

    const { rerender } = render(<BookmarkCard id="1" />);

    // Force a re-render after the useEffect has run
    await waitFor(() => {
      rerender(<BookmarkCard id="1" />);
      const bookmarkIcon = screen.getByAltText("Bookmark");
      // Fix the condition in the component - it should check bookmarked[id]
      expect(bookmarkIcon).toHaveAttribute("src", "/Bookmark.png");
    });
  });

  it("handles bookmark API error gracefully", async () => {
    (BookmarkCrud as jest.Mock).mockRejectedValue(new Error("API Error"));

    render(<BookmarkCard id="1" />);

    await waitFor(() => {
      const bookmarkButton = screen.getByRole("button", { name: /bookmark/i });
      fireEvent.click(bookmarkButton);
    });

    // Verify the error was logged
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Error updating bookmark:",
        expect.any(Error)
      );
    });
  });

  it("reverts bookmark state if API call fails", async () => {
    // Start with not bookmarked
    (getBookmarks as jest.Mock).mockResolvedValue([]);
    (BookmarkCrud as jest.Mock).mockRejectedValue(new Error("API Error"));

    render(<BookmarkCard id="1" />);

    // Initial state - not bookmarked
    await waitFor(() => {
      const bookmarkIcon = screen.getByAltText("Bookmark");
      expect(bookmarkIcon).toHaveAttribute("src", "/Bookmark.png");
    });

    // Click to bookmark
    const bookmarkButton = screen.getByRole("button", { name: /bookmark/i });
    fireEvent.click(bookmarkButton);

    // After failed API call, should revert to original state
    await waitFor(() => {
      const bookmarkIcon = screen.getByAltText("Bookmark");
      expect(bookmarkIcon).toHaveAttribute("src", "/Bookmark.png");
    });
  });

  it("displays default image when logoUrl is not provided", async () => {
    (useGetOpportunityByIdQuery as jest.Mock).mockReturnValue({
      data: { data: { ...mockJob, logoUrl: undefined } },
      error: null,
      isLoading: false,
    });

    render(<BookmarkCard id="1" />);

    await waitFor(() => {
      const image = screen.getByAltText("job avatar");
      expect(image).toHaveAttribute("src", "/job1.png");
    });
  });
});
