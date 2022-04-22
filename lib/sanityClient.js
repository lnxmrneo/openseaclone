import sanityClient from "@sanity/client";

export const client = sanityClient({
	projectId: "okzmynbb",
	dataset: "production",
	apiVersion: "2021-03-25",
	token: "skpV4jrHFChWFRwJtgV0JLL9ft67G6S8sSCdZPKlpAdnu0RiVZil5RiyJZ6obvFTo2J7Hs9ZgqO15r9VwZZGvZwcFz6Z0mN7EKlM8V2z5XJ0EYexaxLMUzPa2nsMrgR6lkdTBfYuXd0NTkFZBpIEBPLjwgCRw1WZEMkZTcCPZ4oKEqP7f0dp",
	useCdn: false,
});
