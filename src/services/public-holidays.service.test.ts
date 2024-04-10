import axios from 'axios';
import request from "supertest";
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "./public-holidays.service";
import { PUBLIC_HOLIDAYS_API_URL } from '../config';

const DATE_API = "https://date.nager.at/api/v3"; 

const mockedAxiosGet = jest.spyOn(axios, "get");
  const year = 2024;
  const country = "NL";
  const incorrect_year = 2000;
  const incorrect_country = "PL";
  const response_1 = [
    {
      name: "Easter",
      localName: "Pascha",
      date: "31 March",
    },
  ];
  const response_2 = {
    status: 200,
  };
  const error = 'error';

describe("getListOfPublicHolidays", () => {
  it("should return list of public holidays", async () => {
      mockedAxiosGet.mockResolvedValue({ data: response_1 });
      const result = await getListOfPublicHolidays(year, country);
      expect(result).toEqual([
        {
          name: "Easter",
          localName: "Pascha",
          date: "31 March",
        },
      ]);
  });

  it("should call API with proper arguments", async () => {
    await getListOfPublicHolidays(year, country);
    expect(mockedAxiosGet).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`
    );
  });

  it("should throw error if country is not in the list", async () => {
    await expect(
      getListOfPublicHolidays(year, incorrect_country)
    ).rejects.toThrow(
      new Error(
        `Country provided is not supported, received: ${incorrect_country}`
      )
    );
  });

  it("should throw error if year incorrect", async () => {
    await expect(
      getListOfPublicHolidays(incorrect_year, country)
    ).rejects.toThrow(
      new Error(`Year provided not the current, received: ${incorrect_year}`)
    );
  });

  it("should return empty array is error", async () => {
    mockedAxiosGet.mockResolvedValue(error);
    const result = await getListOfPublicHolidays(year, country);
    expect(result).toEqual([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe("checkIfTodayIsPublicHoliday", () => {
  it("should return true id status 200", async () => {
    mockedAxiosGet.mockResolvedValue(response_2);
    const result = await checkIfTodayIsPublicHoliday(country);
    expect(result).toEqual(true);
  });

  it("should call API with proper arguments", async () => {
    await checkIfTodayIsPublicHoliday(country);
    expect(mockedAxiosGet).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`
    );
  });

  it("should throw error if country is not in the list", async () => {
    await expect(
      checkIfTodayIsPublicHoliday(incorrect_country)
    ).rejects.toThrow(
      new Error(
        `Country provided is not supported, received: ${incorrect_country}`
      )
    );
  });

  it("should return false is error", async () => {
    mockedAxiosGet.mockResolvedValue(error);
    const result = await checkIfTodayIsPublicHoliday(country);
    expect(result).toEqual(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe("getNextPublicHolidays", () => {
  it("should return list of public holidays", async () => {
    mockedAxiosGet.mockResolvedValue({ data: response_1 });
    const result = await getNextPublicHolidays(country);
    expect(result).toEqual([
      {
        name: "Easter",
        localName: "Pascha",
        date: "31 March",
      },
    ]);
  });

  it("should call API with proper arguments", async () => {
    await getNextPublicHolidays(country);
    expect(mockedAxiosGet).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`
    );
  });

  it("should throw error if country is not in the list", async () => {
    await expect(
      getNextPublicHolidays(incorrect_country)
    ).rejects.toThrow(
      new Error(
        `Country provided is not supported, received: ${incorrect_country}`
      )
    );
  });

  it("should return empty array is error", async () => {
    mockedAxiosGet.mockResolvedValue(error);
    const result = await getNextPublicHolidays(country);
    expect(result).toEqual([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe("Date API/NextPublicHolidays", () => {
  it("should return 200 and random cat fact", async () => {
  const response = [
    {
      "counties": null,
      "countryCode": "NL",
      "date": "2024-04-27",
      "fixed": false,
      "global": true,
      "launchYear": null,
      "localName": "Koningsdag",
      "name": "King's Day",
      "types": [
      "Public",
      ],
    },
    {
      "counties": null,
      "countryCode": "NL",
      "date": "2024-05-09",
      "fixed": false,
      "global": true,
      "launchYear": null,
      "localName": "Hemelvaartsdag",
      "name": "Ascension Day",
      "types": [
      "Public",
      ],
    },
    {
      "counties": null,
      "countryCode": "NL",
      "date": "2024-05-19",
      "fixed": false,
      "global": true,
      "launchYear": null,
      "localName": "Eerste Pinksterdag",
      "name": "Pentecost",
      "types": [
      "Public",
      ],
    },
    {
      "counties": null,
      "countryCode": "NL",
      "date": "2024-05-20",
      "fixed": false,
      "global": true,
      "launchYear": null,
      "localName": "Tweede Pinksterdag",
      "name": "Whit Monday",
      "types": [
        "Public",
      ],
    },
    {
      "counties": null,
      "countryCode": "NL",
      "date": "2024-12-25",
      "fixed": false,
      "global": true,
      "launchYear": null,
      "localName": "Eerste Kerstdag",
      "name": "Christmas Day",
      "types": [
      "Public",
      ],
    },
    {
      "counties": null,
      "countryCode": "NL",
      "date": "2024-12-26",
      "fixed": false,
      "global": true,
      "launchYear": null,
      "localName": "Tweede Kerstdag",
      "name": "St. Stephen's Day",
      "types": [
      "Public",
      ],
    },
    {
      "counties": null,
      "countryCode": "NL",
      "date": "2025-01-01",
      "fixed": false,
      "global": true,
      "launchYear": null,
      "localName": "Nieuwjaarsdag",
      "name": "New Year's Day",
      "types": [
      "Public",
      ],
    },
  ];

    const { status, body } = await request(DATE_API).get(
      "/NextPublicHolidays/NL"
    );

    expect(status).toEqual(200);
    expect(body).toEqual(response);
  });
});