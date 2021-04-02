// The following comment allows for intellisense autocomplete on cypress commands such as "cy."
/// <reference types="Cypress" />

describe("First test suite", () => {
	it("Passes", () => {
		expect(true).to.equal(true);
	});

	it ("Correct text appears on screen", () => {
		cy.visit("http://localhost:3000");
		cy.contains("Hello, world!");
	});
});