describe("Bookmark Functionality", () => {
  beforeEach(() => {
    // 1) Session
    cy.intercept("GET", "/api/auth/session", {
      statusCode: 200,
      body: {
        user: {
          name: "Test User",
          email: "test@example.com",
          accessToken: "mock-access-token",
        },
        expires: "2099-12-31T23:59:59.999Z",
      },
    }).as("getSession");

    // 2) No bookmarks initially
    cy.intercept("GET", "**/bookmarks", {
      statusCode: 200,
      body: { data: [] },
    }).as("getBookmarksInitial");

    // 3a) Opportunities list
    cy.intercept("GET", "**/opportunities/search*", {
      statusCode: 200,
      body: {
        success: true,
        data: [
          {
            id: "65509e9353a7667de6ef5a60",
            title: "Volunteer Software Development Mentor",
            description: "Mock description here",
            orgName: "Test Organization",
            location: ["Addis Ababa"],
            opType: "virtual",
            categories: ["Education"],
          },
        ],
        count: 1,
      },
    }).as("getOpportunities");

    // 3b) Detail for that one job
    cy.intercept("GET", "**/opportunities/65509e9353a7667de6ef5a60", {
      statusCode: 200,
      body: {
        success: true,
        data: {
          id: "65509e9353a7667de6ef5a60",
          title: "Volunteer Software Development Mentor",
          description: "Mock description here",
          orgName: "Test Organization",
          location: ["Addis Ababa"],
          opType: "virtual",
          categories: ["Education"],
        },
      },
    }).as("getOpportunityById");

    // 4) Bookmark endpoints
    cy.intercept(
      { method: "POST", url: "**/bookmarks/**" },
      { statusCode: 200, body: { success: true } }
    ).as("addBookmark");
    cy.intercept(
      { method: "DELETE", url: "**/bookmarks/**" },
      { statusCode: 200, body: { success: true } }
    ).as("removeBookmark");

    // visit Dashboard
    cy.visit("/");

    // wait for the three calls Dashboard actually makes
    cy.wait([
      "@getSession",
      "@getBookmarksInitial",
      "@getOpportunities",
      "@getOpportunityById",
    ]);
  });

  it("should allow a user to bookmark and unbookmark a job", () => {
    // ✅ Bookmark
    cy.contains("Volunteer Software Development Mentor")
      .closest("div")
      .find('[data-testid="bookmark-button"]')
      .click();
    cy.wait("@addBookmark");

    // stub saved‐bookmarks response
    cy.intercept("GET", "**/bookmarks", {
      statusCode: 200,
      body: { data: [{ eventID: "65509e9353a7667de6ef5a60" }] },
    }).as("getBookmarksAfterBookmark");

    // re‐stub list so /bookmark page still shows data
    cy.intercept("GET", "**/opportunities/search*", {
      statusCode: 200,
      body: {
        success: true,
        data: [
          {
            id: "65509e9353a7667de6ef5a60",
            title: "Volunteer Software Development Mentor",
            description: "Mock description here",
            orgName: "Test Organization",
            location: ["Addis Ababa"],
            opType: "virtual",
            categories: ["Education"],
          },
        ],
        count: 1,
      },
    }).as("getOpportunitiesAfterBookmark");

    // Visit the bookmarks page
    cy.visit("/bookmark");
    cy.wait([
      "@getSession",
      "@getBookmarksAfterBookmark",
      "@getOpportunitiesAfterBookmark",
      "@getOpportunityById",
    ]);

    // Now the card really is in the DOM
    cy.contains("Volunteer Software Development Mentor").should("exist");

    // 🔖 Unbookmark it
    cy.get('[data-testid="bookmark-button"]').click();
    cy.wait("@removeBookmark");

    // stub “no bookmarks” again
    cy.intercept("GET", "**/bookmarks", {
      statusCode: 200,
      body: { data: [] },
    }).as("getBookmarksAfterUnbookmark");
    cy.intercept("GET", "**/opportunities/search*", {
      statusCode: 200,
      body: { success: true, data: [], count: 0 },
    }).as("getOpportunitiesAfterUnbookmark");

    cy.visit("/bookmark");
    cy.wait([
      "@getSession",
      "@getBookmarksAfterUnbookmark",
      "@getOpportunitiesAfterUnbookmark",
    ]);

    // and it’s gone
    cy.contains("Volunteer Software Development Mentor").should("not.exist");
  });
});
