export function parseBBY(birthYear, sortOrder) {
  if (birthYear === "unknown") return sortOrder === "age" ? Infinity : -Infinity;
  return parseFloat(birthYear);
}

export function matchBornRange(birthYear, selectedRange) {
  if (selectedRange === "all") return true;

  const numericValue = parseFloat(birthYear);
  const isBBY = birthYear.includes("BBY");

  if (!isBBY || isNaN(numericValue)) return false;

  switch (selectedRange) {
    case "0-19":
      return numericValue >= 0 && numericValue <= 19;
    case "20-39":
      return numericValue >= 20 && numericValue <= 39;
    case "40-59":
      return numericValue >= 40 && numericValue <= 59;
    case "60-79":
      return numericValue >= 60 && numericValue <= 79;
    case "80+":
      return numericValue >= 80;
    case "800+":
      return numericValue >= 800;
    default:
      return false;
  }
}

export function matchHeightRange(height, selectedRange) {
  if (selectedRange === "all") return true;

  const numericHeight = parseFloat(height);

  if (isNaN(numericHeight)) return false;

  switch (selectedRange) {
    case "dwarf":
      return numericHeight < 120;
    case "average":
      return numericHeight >= 120 && numericHeight <= 199;
    case "giant":
      return numericHeight > 199;
    default:
      return false;
  }
}
