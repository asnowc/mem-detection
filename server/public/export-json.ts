import { writeFile } from "node:fs/promises";
import { memoryUsage } from "node:process";
type MemoryData = NodeJS.MemoryUsage & {
  name: string;
};

export async function exportJson(data: MemoryData[], target: string) {
  const text = JSON.stringify(data);
  await writeFile(target, text, { flag: "w+" });
}
export function* forCount(count: number, start: number = 0) {
  count += start;
  for (let start = 0; start < count; start++) {
    yield start;
  }
}
export async function* intervalCount(count: number, time: number) {
  for (const num of forCount(count)) {
    await new Promise((resolve) => setTimeout(resolve, time));
    yield num;
  }
}
export class MemoryGetter<T extends {}> {
  queue: (NodeJS.MemoryUsage & T)[] = [];
  add(data: T) {
    this.queue.push({ ...memoryUsage(), ...data });
  }
  constructor(public path: string) {}
  async save() {
    const text = JSON.stringify(this.queue);
    await writeFile(this.path, text, { flag: "w+" });
    return this.queue.length;
  }
}
