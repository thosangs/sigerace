function detectNamedTablesFromColumnC(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const maxRow = sheet.getMaxRows();
  const startCol = 3; // Kolom C
  const endCol = 13; // Kolom M

  const namedTables = {};
  let pendingTitle = null;

  let inTable = false;
  let tableStart = null;

  for (let row = 1; row <= maxRow + 1; row++) {
    const colCVal = sheet.getRange(row, 3).getValue();
    const rowHasData = colCVal !== "" && colCVal !== null;

    const nonEmptyCols = [];
    for (let c = startCol; c <= endCol; c++) {
      const v = sheet.getRange(row, c).getValue();
      if (v !== "" && v !== null) nonEmptyCols.push(c);
    }

    // Kalau cuma 1 baris dan hanya kolom C yang ada isinya -> ini nama tabel
    const isTitleRow =
      rowHasData && nonEmptyCols.length === 1 && nonEmptyCols[0] === 3;

    if (isTitleRow) {
      pendingTitle = colCVal;
    } else if (rowHasData) {
      // Deteksi awal tabel
      if (!inTable) {
        tableStart = row;
        inTable = true;
      }
    } else {
      // Baris kosong: akhir tabel
      if (inTable) {
        const tableEnd = row - 1;

        // Cari batas kolom dari C ke M
        let minCol = endCol;
        let maxCol = startCol;
        for (let r = tableStart; r <= tableEnd; r++) {
          for (let c = startCol; c <= endCol; c++) {
            const val = sheet.getRange(r, c).getValue();
            if (val !== "" && val !== null) {
              if (c < minCol) minCol = c;
              if (c > maxCol) maxCol = c;
            }
          }
        }

        const rangeStr = `${columnLetter(minCol)}${tableStart}:${columnLetter(
          maxCol
        )}${tableEnd}`;
        if (pendingTitle) {
          namedTables[pendingTitle] = rangeStr;
        } else {
          namedTables[`Unnamed ${Object.keys(namedTables).length + 1}`] =
            rangeStr;
        }

        // Reset
        pendingTitle = null;
        inTable = false;
        tableStart = null;
      }
    }
  }

  // Print result
  Logger.log(`📄 Tabel terdeteksi di sheet "${sheetName}":`);
  for (const [title, range] of Object.entries(namedTables)) {
    Logger.log(`${title} : ${range}`);
  }

  return namedTables;
}

function columnLetter(col) {
  let letter = "";
  while (col > 0) {
    let temp = (col - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    col = Math.floor((col - 1) / 26);
  }
  return letter;
}

// Jalankan ini
function runNamedDetection() {
  // detectNamedTablesFromColumnC('1 Batch');
  // detectNamedTablesFromColumnC('2 Batch');
  // detectNamedTablesFromColumnC('3 Batch');
  // detectNamedTablesFromColumnC('4 Batch');
  // detectNamedTablesFromColumnC('5 Batch');
  // detectNamedTablesFromColumnC('6 Batch');
  // detectNamedTablesFromColumnC('7 Batch');
  detectNamedTablesFromColumnC("8 Batch");
}
