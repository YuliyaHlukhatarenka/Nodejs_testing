import { validateInput, shortenPublicHoliday } from './helpers';

describe("validateInput", () => {
  it("should throw error when country is provided", () => {
    expect(() => validateInput({ country: "USA" })).toThrow(
      "Country provided is not supported, received: USA"
    );
  });

  it("should throw error when year is provided", () => {
    expect(() => validateInput({ year: 2022 })).toThrow(
      "Year provided not the current, received: 2022"
    );
  });

  it("should return true when no year or country is provided", () => {
    expect(validateInput({})).toEqual(true);
  });
});

describe("shortenPublicHoliday", () => {
  it("should return the short version of the holiday", () => {
    const mockPublicHoliday = {
      name: "New Year",
      localName: "Nowy Rok",
      date: "2024-01-01",
      countryCode: "PL",
      fixed: true,
      global: true,
      types: [],
      counties: ["Poland"],
      launchYear: 1800,
    };

    const expectedShortHoliday = {
      name: "New Year",
      localName: "Nowy Rok",
      date: "2024-01-01",
    };

    expect(shortenPublicHoliday(mockPublicHoliday)).toEqual(
      expectedShortHoliday
    );
  });
});
