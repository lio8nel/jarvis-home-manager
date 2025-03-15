import { DeviceIcon } from "../components/DeviceIcon";
import { revalidatePath } from "next/cache";

import { Device, getDevices, toggleDevice } from "./client/client";

export default async function Home() {
  const devices = await getDevices();

  return (
    <div className="min-h-screen p-8">
      <main>
        <h1 className="text-2xl font-bold mb-6">My Home Devices</h1>

        {/* Grid of device tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {devices.map((device: Device) => (
            <div
              key={device.id}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={async () => {
                "use server";
                await toggleDevice(device.id, device.status);
                revalidatePath("/");
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DeviceIcon
                    type={device.type}
                    className="text-gray-600 dark:text-gray-400"
                  />
                  <h2 className="font-semibold">{device.name}</h2>
                </div>
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    device.status === "on" ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">{device.type}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
