import { getDevices, toggleDevice } from "../device";

// Mock fetch globally
global.fetch = jest.fn();

describe("Device API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getDevices", () => {
    it("fetches devices successfully", async () => {
      const mockDevices = [
        { id: "1", name: "Light 1", type: "light", status: "on" },
        { id: "2", name: "Light 2", type: "light", status: "off" },
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockDevices),
      });

      const devices = await getDevices();

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3001/api/devices",
        expect.objectContaining({
          next: { revalidate: 30 },
        })
      );
      expect(devices).toEqual(mockDevices);
    });

    it("throws error when fetch fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(getDevices()).rejects.toThrow("Failed to fetch devices");
    });
  });

  describe("toggleDevice", () => {
    it("toggles device from on to off", async () => {
      const mockResponse = { id: "1", status: "off" };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await toggleDevice("1", "on");

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3001/api/devices/1",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "off" }),
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("toggles device from off to on", async () => {
      const mockResponse = { id: "1", status: "on" };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await toggleDevice("1", "off");

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3001/api/devices/1",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "on" }),
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("throws error when toggle fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(toggleDevice("1", "on")).rejects.toThrow(
        "Failed to toggle device"
      );
    });
  });
});
