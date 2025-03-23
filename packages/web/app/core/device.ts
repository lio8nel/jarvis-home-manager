type Device = {
  id: number;
  name: string;
  type: string;
  status: string;
};

const apiHost = process.env.API_HOST || "localhost";
const apiUrl = `http://${apiHost}:3001/api`;

async function getDevices(): Promise<Device[]> {
  const res = await fetch(`${apiUrl}/devices`, {
    next: { revalidate: 30 }, // Revalidate every 30 seconds
  });
  console.log("getDevices");
  if (!res.ok) {
    throw new Error("Failed to fetch devices");
  }

  return res.json();
}

// Add this function to toggle device state
async function toggleDevice(id: number, currentStatus: string) {
  const newStatus = currentStatus === "on" ? "off" : "on";
  const res = await fetch(`${apiUrl}/devices/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!res.ok) {
    throw new Error("Failed to toggle device");
  }

  return res.json();
}

export { getDevices, toggleDevice };
export type { Device };
