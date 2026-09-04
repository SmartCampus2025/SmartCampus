import moment from "moment-hijri";

/**
 * Returns today's date in both Gregorian & Hijri
 */
export function getIslamicDate() {
  return {
    gregorian: new Date().toISOString().split("T")[0],
    hijri: moment().format("iYYYY-iMM-iDD"),
  };
}
