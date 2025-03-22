import { DeviceTile } from "../components/Device";
import { getDevices, toggleDevice } from "./core/device";
import { revalidatePath } from "next/cache";

async function handleToggle(deviceId: number, status: string) {
  "use server";
  await toggleDevice(deviceId, status);
  revalidatePath("/");
}

export default async function Home() {
  const devices = await getDevices();

  return (
    <div className="min-h-screen p-8">
      <main>
        <h1 className="text-2xl font-bold mb-6">My Home Devices</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {devices.map((device) => (
            <DeviceTile
              key={device.id}
              device={device}
              toggleAction={handleToggle}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
