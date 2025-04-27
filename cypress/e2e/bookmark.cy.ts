describe("Bookmark Functionality", () => {
  beforeEach(() => {
    // Login user or mock auth if needed
    cy.visit("/opportunities");
  });

  it("should allow a user to bookmark and unbookmark a job", () => {
    cy.contains("Your Job Title Here") // Replace with dynamic or test job title
      .parentsUntil("div")
      .first()
      .within(() => {
        cy.get('[aria-label="bookmark"]').click();
        cy.get('img[alt="Bookmark"]')
          .should("have.attr", "src")
          .and("include", "Bookmarked.png");

        // Toggle again to unbookmark
        cy.get('[aria-label="bookmark"]').click();
        cy.get('img[alt="Bookmark"]')
          .should("have.attr", "src")
          .and("include", "Bookmark.png");
      });
  });

  it("should show bookmarked job in the bookmarks section", () => {
    // After bookmarking, navigate to bookmarks page
    cy.visit("/bookmarks");
    cy.contains("Your Job Title Here").should("exist");
  });
});
