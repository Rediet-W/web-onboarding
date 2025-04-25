import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import OpportunityCard from "../components/OpportunityCard";
import {
  useGetAllOpportunitiesQuery,
  useGetOpportunityByIdQuery,
} from "../../services/sliceApi";
import { JobPost } from "../type";
import "@testing-library/jest-dom";

// Mock the API hooks
jest.mock("../../services/sliceApi", () => ({
  useGetOpportunityByIdQuery: jest.fn(),
  useGetAllOpportunitiesQuery: jest.fn(),
}));

// Mock the BookmarkCard component
jest.mock("../components/bookmark", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-bookmark">Bookmark</div>),
}));

describe("OpportunityCard Component", () => {
  const mockJob: JobPost = {
    id: "1",
    title: "Software Engineer",
    orgName: "Tech Corp",
    logoUrl: "/tech-corp.png",
    location: ["New York", "Remote"],
    description: "Exciting opportunity for a software engineer",
    responsibilities: "Develop software solutions",
    requirements: "5+ years experience",
    idealCandidate: "Passionate about technology",
    categories: ["Full-time", "Development"],
    opType: "inPerson",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    deadline: "2022-12-15",
    requiredSkills: ["JavaScript", "React"],
    whenAndWhere: "Office in New York",
    orgID: "org-123",
    datePosted: "2022-11-01",
    status: "active",
    applicantsCount: 25,
    viewsCount: 100,
    isBookmarked: false,
    isRolling: false,
    questions: null,
    perksAndBenefits: "Health insurance, 401k",
    createdAt: "2022-11-01T00:00:00Z",
    updatedAt: "2022-11-01T00:00:00Z",
    orgPrimaryPhone: "+1234567890",
    orgEmail: "contact@techcorp.com",
    average_rating: 4.5,
    total_reviews: 20,
  };

  beforeEach(() => {
    (useGetOpportunityByIdQuery as jest.Mock).mockReturnValue({
      data: {
        success: true,
        message: "",
        data: mockJob,
        errors: [],
        count: 1,
      },
      error: null,
      isLoading: false,
    });
    (useGetAllOpportunitiesQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the job card with correct information", () => {
    render(<OpportunityCard id="1" />);

    // Basic info
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Tech Corp")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("Remote")).toBeInTheDocument();
    expect(
      screen.getByText("Exciting opportunity for a software engineer")
    ).toBeInTheDocument();

    // Opportunity type
    expect(screen.getByText("inPerson")).toBeInTheDocument();

    // Categories
    expect(screen.getByText("Full-time")).toBeInTheDocument();
    expect(screen.getByText("Development")).toBeInTheDocument();

    // Image
    const image = screen.getByAltText("job avatar");
    expect(image).toHaveAttribute("src", "/tech-corp.png");
  });

  it("renders job not found when job data is empty", () => {
    (useGetOpportunityByIdQuery as jest.Mock).mockReturnValue({
      data: {
        success: false,
        message: "Job not found",
        data: null,
        errors: ["Not found"],
        count: 0,
      },
      error: null,
      isLoading: false,
    });

    render(<OpportunityCard id="1" />);
    // Since the component doesn't have explicit "not found" UI,
    // we can check that the main job info is not rendered
    expect(screen.queryByText("Software Engineer")).not.toBeInTheDocument();
  });

  it("applies correct styling for inPerson opportunity type", () => {
    render(<OpportunityCard id="1" />);
    const opTypeElement = screen.getByText("inPerson");
    expect(opTypeElement).toHaveClass("text-[rgba(86,205,173,1)]");
    expect(opTypeElement).toHaveClass("bg-[rgba(86,205,173,0.1)]");
  });

  it("applies correct styling for remote opportunity type", () => {
    const remoteJob = { ...mockJob, opType: "remote" };
    (useGetOpportunityByIdQuery as jest.Mock).mockReturnValue({
      data: {
        success: true,
        message: "",
        data: remoteJob,
        errors: [],
        count: 1,
      },
      error: null,
      isLoading: false,
    });

    render(<OpportunityCard id="1" />);
    const opTypeElement = screen.getByText("remote");
    expect(opTypeElement).toHaveClass("text-[#ff3636]");
    expect(opTypeElement).toHaveClass("bg-[rgba(255,54,54,0.1)]");
  });

  // Remove tests for elements that don't exist in the component
  // such as applicants count and rating
});
