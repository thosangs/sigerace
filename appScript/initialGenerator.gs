function createSheetFromBatch(newSheetName, batchNumber, label) {
  const TEMPLATE_SPREADSHEET_ID = "HERE";
  const TARGET_SPREADSHEET_ID = "HERE";

  const templateSheetName = `${batchNumber} Batch`;
  const templateSpreadsheet = SpreadsheetApp.openById(TEMPLATE_SPREADSHEET_ID);
  const targetSpreadsheet = SpreadsheetApp.openById(TARGET_SPREADSHEET_ID);

  const sourceSheet = templateSpreadsheet.getSheetByName(templateSheetName);
  if (!sourceSheet) throw new Error(`Sheet "${templateSheetName}" not found.`);

  const existing = targetSpreadsheet.getSheetByName(newSheetName);
  if (existing) targetSpreadsheet.deleteSheet(existing);

  const copiedSheet = sourceSheet.copyTo(targetSpreadsheet);
  copiedSheet.setName(newSheetName);

  // Set sheet tab color
  let color = null;
  const labelLower = label.toLowerCase();
  if (labelLower === "boy") color = "#4285F4"; // blue
  else if (labelLower === "girl") color = "#F48FB1"; // pink
  else if (labelLower === "mix") color = "#F4B400"; // yellow

  if (color) copiedSheet.setTabColor(color);

  targetSpreadsheet.setActiveSheet(copiedSheet);
  targetSpreadsheet.moveActiveSheet(targetSpreadsheet.getSheets().length);
}

function createAllSheetsFromJSON() {
  const batchMap = {
    2023: { mix: 1 },
    2022: { girl: 2, boy: 5 },
    2021: { girl: 1, boy: 6 },
    2020: { girl: 2, boy: 4 },
    2019: { girl: 2, boy: 5 },
    2018: { girl: 1, boy: 1 },
    FFA: { girl: 1, boy: 1 },
  };

  const orderedYears = ["2023", "2022", "2021", "2020", "2019", "2018", "FFA"];

  for (const year of orderedYears) {
    const groups = batchMap[year];
    for (const [label, batchNumber] of Object.entries(groups)) {
      const capitalLabel =
        label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
      const sheetName = `${year} ${capitalLabel}`;
      createSheetFromBatch(sheetName, batchNumber, label);
    }
  }
}
