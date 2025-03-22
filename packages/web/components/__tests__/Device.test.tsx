import { render, fireEvent } from "@testing-library/react";
import { DeviceTile } from "../Device";

describe("DeviceTile", () => {
  const mockDevice = {
    id: 1,
    name: "Living Room Light",
    type: "light",
    status: "off",
  };

  const mockToggleAction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders device information correctly", () => {
    const { getByText } = render(
      <DeviceTile device={mockDevice} toggleAction={mockToggleAction} />
    );

    expect(getByText("Living Room Light")).toBeInTheDocument();
    expect(getByText("light")).toBeInTheDocument();
  });

  it("calls toggleAction when clicked", () => {
    const { container } = render(
      <DeviceTile device={mockDevice} toggleAction={mockToggleAction} />
    );

    const deviceTile = container.firstChild;
    fireEvent.click(deviceTile!);

    expect(mockToggleAction).toHaveBeenCalledTimes(1);
    expect(mockToggleAction).toHaveBeenCalledWith(1, "off");
  });

  it("shows correct status indicator", () => {
    const onDevice = {
      ...mockDevice,
      status: "on",
    };

    const { container: onContainer } = render(
      <DeviceTile device={onDevice} toggleAction={mockToggleAction} />
    );

    const { container: offContainer } = render(
      <DeviceTile device={mockDevice} toggleAction={mockToggleAction} />
    );

    const onStatusIndicator = onContainer.querySelector(".bg-green-500");
    const offStatusIndicator = offContainer.querySelector(".bg-gray-400");

    expect(onStatusIndicator).toBeInTheDocument();
    expect(offStatusIndicator).toBeInTheDocument();
  });
});
