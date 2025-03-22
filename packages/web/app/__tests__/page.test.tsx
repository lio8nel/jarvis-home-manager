import { render, screen } from "@testing-library/react";
import Home from "../page";
import { getDevices } from "../core/device";

// Mock the device module
jest.mock("../core/device", () => ({
  getDevices: jest.fn(),
  toggleDevice: jest.fn(),
}));

// Mock the next/cache module
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("Home", () => {
  const mockDevices = [
    {
      id: "1",
      name: "Living Room Light",
      type: "light",
      status: "off",
    },
    {
      id: "2",
      name: "Kitchen Light",
      type: "light",
      status: "on",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getDevices as jest.Mock).mockResolvedValue(mockDevices);
  });

  it("renders the page title", async () => {
    render(await Home());
    expect(screen.getByText("My Home Devices")).toBeInTheDocument();
  });

  it("renders all devices", async () => {
    render(await Home());

    expect(screen.getByText("Living Room Light")).toBeInTheDocument();
    expect(screen.getByText("Kitchen Light")).toBeInTheDocument();
  });
});
