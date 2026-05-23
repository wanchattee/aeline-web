/**
 * ═══════════════════════════════════════════════════════════
 *  AELINE.C — Google Apps Script สำหรับ Product API
 * ═══════════════════════════════════════════════════════════
 *
 *  วิธีใช้:
 *  1. เปิด Google Sheet ของคุณ
 *  2. ไป Extensions → Apps Script
 *  3. วาง code นี้ทั้งหมด แล้ว Save
 *  4. กด Deploy → New deployment → Web app
 *     - Execute as: Me
 *     - Who has access: Anyone
 *  5. Copy URL ที่ได้ → วางใน .env.local (GOOGLE_SHEETS_API_URL=...)
 *  6. วางใน Vercel Environment Variables ด้วย
 *
 *  โครงสร้าง Google Sheet (Sheet ชื่อ "Products"):
 *  ┌─────┬──────────────────────┬───────────┬───────┬──────────────────────────────┬─────────────────────────────┬──────────────────────┬──────────┬──────────┬─────────────────────┐
 *  │ id  │ name                 │ category  │ price │ image_url                    │ description                 │ slug                 │ in_stock │ featured │ collection_name     │
 *  ├─────┼──────────────────────┼───────────┼───────┼──────────────────────────────┼─────────────────────────────┼──────────────────────┼──────────┼──────────┼─────────────────────┤
 *  │ 1   │ Initial Charm Neck.. │ Necklaces │ 4500  │ https://lh3.google...        │ Delicate initial charm on.. │ initial-charm-neck.. │ TRUE     │ TRUE     │ The Eden Collection │
 *  └─────┴──────────────────────┴───────────┴───────┴──────────────────────────────┴─────────────────────────────┴──────────────────────┴──────────┴──────────┴─────────────────────┘
 *
 *  Category ที่ใช้ได้: Rings | Necklaces | Bracelets | Earrings
 *  in_stock / featured: TRUE หรือ FALSE (ตัวพิมพ์ใหญ่หรือเล็กก็ได้)
 *
 *  วิธีได้ image_url จาก Google Drive:
 *  - Upload รูปขึ้น Google Drive
 *  - คลิกขวา → Share → Anyone with the link → Copy link
 *  - link จะได้มาเป็น: https://drive.google.com/file/d/FILE_ID/view
 *  - แปลงเป็น: https://lh3.googleusercontent.com/d/FILE_ID
 * ═══════════════════════════════════════════════════════════
 */

const SHEET_NAME = "Products"; // ชื่อ sheet tab

function doGet() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      return jsonResponse({ error: `Sheet "${SHEET_NAME}" not found` }, 404);
    }

    const data = sheet.getDataRange().getValues();
    if (data.length < 2) {
      return jsonResponse({ products: [], total: 0 });
    }

    // Row 1 = headers
    const headers = data[0].map((h) => String(h).trim().toLowerCase().replace(/ /g, "_"));
    const rows = data.slice(1);

    const products = rows
      .filter((row) => row[0] !== "" && row[0] !== null) // skip empty rows
      .map((row) => {
        const product = {};
        headers.forEach((header, i) => {
          product[header] = row[i] !== undefined ? String(row[i]).trim() : "";
        });
        return product;
      });

    return jsonResponse({
      products,
      total: products.length,
      updated: new Date().toISOString(),
    });
  } catch (err) {
    return jsonResponse({ error: String(err) }, 500);
  }
}

function jsonResponse(data, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
