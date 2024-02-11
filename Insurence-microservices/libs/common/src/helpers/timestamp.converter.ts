import { Timestamp } from "../types";

export class TimestampConverter {
  static newTimestamp(): Timestamp {
    return {
      seconds: 0,
      nanos: 0,
    };
  }

  static toDate(t: Timestamp): Date {
    const d: Date = new Date(0);
    d.setSeconds(t.seconds);
    return d;
  }

  static fromDate(d: Date): Timestamp {
    return {
      seconds: d.getTime() / 1e3,
      nanos: d.getTime() % 1e3 * 1e6,
    };
  }
}
