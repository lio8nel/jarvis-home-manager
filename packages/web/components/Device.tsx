"use client";

import { Device } from "../app/core/device";
import { DeviceIcon } from "./DeviceIcon";

interface DeviceTileProps {
  device: Device;
  toggleAction: (deviceId: number, status: string) => Promise<void>;
}

export function DeviceTile({ device, toggleAction }: DeviceTileProps) {
  return (
    <div
      key={device.id}
      className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => toggleAction(device.id, device.status)}
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
  );
}
