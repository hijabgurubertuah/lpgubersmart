/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

export const APPS_SCRIPT_TEMPLATE = `/**
 * Google Apps Script Backend - Guber Smart with Fonnte WhatsApp & Drive Sync
 */

const CONFIG = {
  TOKEN: "GUBER_SMART_SECRET_TOKEN_2026",
  DRIVE_FOLDER_ID: "", // ID Folder Google Drive untuk menyimpan gambar
  SPREADSHEET_ID: "",   // ID Google Spreadsheet
  SHEETS: {
    APPLICANTS: "Pendaftar",
    SETTINGS: "Pengaturan",
    PACKAGES: "Paket",
    CONTENT: "Konten",
    LOGS: "LogAktivitas",
    ACCOUNTS: "Akun"
  }
};

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);

  try {
    var params = e && e.parameter ? e.parameter : {};
    var postData = {};
    if (e && e.postData && e.postData.contents) {
      try {
        postData = JSON.parse(e.postData.contents);
      } catch (err) {
        postData = {};
      }
    }

    var action = params.action || postData.action || "";
    var token = params.token || postData.token || "";

    // 1. Uji Koneksi (Publik / Admin)
    if (action === "test") {
      return jsonResponse({ success: true, message: "Terhubung" });
    }

    // 2. Ambil Gambar Drive (Publik)
    if (action === "getImage") {
      var fileId = params.fileId || postData.fileId;
      if (!fileId) return jsonResponse({ success: false, message: "ID kosong" });
      var file = DriveApp.getFileById(fileId);
      var bytes = file.getBlob().getBytes();
      var base64 = Utilities.base64Encode(bytes);
      var mimeType = file.getMimeType();
      return jsonResponse({ success: true, base64: "data:" + mimeType + ";base64," + base64 });
    }

    // 3. Tambah Pendaftar Baru & Kirim WhatsApp Fonnte (Publik)
    if (action === "submitApplicant") {
      var applicant = postData.applicant || {};
      var ss = getSpreadsheet();
      var settings = readSheetAsKeyValue(ss, CONFIG.SHEETS.SETTINGS);
      
      var adminEnabled = settings.adminEnabled !== "false";
      var userEnabled = settings.userEnabled !== "false";
      var recipientNumbers = settings.recipientNumbers || "085376604024";
      var hourlyLimit = Number(settings.hourlyLimit || 20);
      var fonnteToken = settings.fonnteToken || "";
      var adminTemplate = settings.adminTemplate || "Pendaftar baru Guber Smart.\\nNama: {nama}\\nWhatsApp: {nomor}\\nPaket: {paket}\\nJenis aplikasi: {jenis_aplikasi}\\nPesan: {pesan}\\nWaktu: {waktu}";
      var userTemplate = settings.userTemplate || "Halo {nama}, terima kasih sudah mendaftar di Guber Smart. Pendaftaran Anda untuk {paket} sudah kami terima dan tim kami akan menghubungi Anda secepatnya lewat WhatsApp ini.";

      var adminStatus = "Nonaktif";
      var userStatus = "Nonaktif";
      var sentTime = new Date().toISOString();

      if (fonnteToken) {
        var limitOk = checkHourlyLimit(ss, hourlyLimit);
        if (!limitOk) {
          adminStatus = "Ditunda";
          userStatus = "Ditunda";
        } else {
          // Send admin notification
          if (adminEnabled) {
            var adminMsg = renderTemplate(adminTemplate, applicant);
            var numbers = recipientNumbers.split(",");
            var allAdminOk = true;
            for (var n = 0; n < numbers.length; n++) {
              var num = formatPhone(numbers[n].trim());
              if (num) {
                var resAdmin = sendFonnte(fonnteToken, num, adminMsg);
                if (!resAdmin.success) allAdminOk = false;
              }
            }
            adminStatus = allAdminOk ? "Terkirim" : "Gagal";
          }

          // Send user auto-reply (check duplicate in last 24h)
          if (userEnabled && !applicant.isDuplicate) {
            var userMsg = renderTemplate(userTemplate, applicant);
            var userNum = formatPhone(applicant.whatsapp || "");
            if (userNum) {
              var resUser = sendFonnte(fonnteToken, userNum, userMsg);
              userStatus = resUser.success ? "Terkirim" : "Gagal";
            }
          } else {
            userStatus = "Nonaktif";
          }
        }
      }

      var sheet = getOrCreateSheet(ss, CONFIG.SHEETS.APPLICANTS, [
        "ID", "Nama", "Nomor WhatsApp", "Jenis Aplikasi", "Paket", "Status", "Waktu", "Catatan", "Status Notifikasi Admin", "Status Balasan Pendaftar", "Waktu Kirim"
      ]);
      sheet.appendRow([
        applicant.id || ("APP-" + new Date().getTime()),
        applicant.name || "",
        applicant.whatsapp || "",
        applicant.appType || "",
        applicant.packageName || "",
        applicant.status || "Baru",
        applicant.createdAt || sentTime,
        applicant.notes || "",
        adminStatus,
        userStatus,
        sentTime
      ]);

      return jsonResponse({ success: true, message: "Berhasil disimpan", adminNotifStatus: adminStatus, userNotifStatus: userStatus });
    }

    // 4. Verifikasi Login (Publik)
    if (action === "verifyLogin") {
      var password = postData.password || "";
      var role = verifyAccountPassword(password);
      if (role) {
        return jsonResponse({ success: true, role: role });
      }
      return jsonResponse({ success: false, message: "Kata sandi salah" });
    }

    // 5. Uji Kirim Fonnte
    if (action === "testFonnte") {
      var fonnteToken = postData.fonnteToken || params.fonnteToken || "";
      var recipientNumbers = postData.recipientNumbers || "085376604024";
      var template = postData.template || "Pesan Uji Fonnte Guber Smart.";
      var testData = { name: "Penguji", whatsapp: "081234567890", packageName: "Paket Tes", appType: "Web", message: "Tes", waktu: new Date().toLocaleString() };
      var msg = renderTemplate(template, testData);
      var numbers = recipientNumbers.split(",");
      var success = false;
      for (var i = 0; i < numbers.length; i++) {
        var num = formatPhone(numbers[i].trim());
        if (num) {
          var r = sendFonnte(fonnteToken, num, msg);
          if (r.success) success = true;
        }
      }
      return jsonResponse({ success: success });
    }

    // 6. Kirim Ulang Notifikasi Pendaftar
    if (action === "resendNotification") {
      var applicantId = postData.applicantId;
      var ss = getSpreadsheet();
      var applicants = readSheetAsObjects(ss, CONFIG.SHEETS.APPLICANTS);
      var targetApp = null;
      var rowIndex = -1;
      for (var i = 0; i < applicants.length; i++) {
        if (applicants[i]["ID"] == applicantId) {
          targetApp = applicants[i];
          rowIndex = i + 2; // header offset
          break;
        }
      }
      if (!targetApp) return jsonResponse({ success: false, message: "Pendaftar tidak ditemukan" });

      var settings = readSheetAsKeyValue(ss, CONFIG.SHEETS.SETTINGS);
      var fonnteToken = settings.fonnteToken || "";
      var recipientNumbers = settings.recipientNumbers || "085376604024";
      var adminTemplate = settings.adminTemplate || "Pendaftar baru Guber Smart. Nama: {nama}";
      
      var adminMsg = renderTemplate(adminTemplate, {
        name: targetApp["Nama"],
        whatsapp: targetApp["Nomor WhatsApp"],
        packageName: targetApp["Paket"],
        appType: targetApp["Jenis Aplikasi"],
        message: targetApp["Catatan"] || "",
        waktu: targetApp["Waktu"]
      });

      var numbers = recipientNumbers.split(",");
      var ok = false;
      for (var n = 0; n < numbers.length; n++) {
        var num = formatPhone(numbers[n].trim());
        if (num) {
          var r = sendFonnte(fonnteToken, num, adminMsg);
          if (r.success) ok = true;
        }
      }

      if (ok) {
        ss.getSheetByName(CONFIG.SHEETS.APPLICANTS).getRange(rowIndex, 9, 1, 3).setValues([["Terkirim", "Terkirim", new Date().toISOString()]]);
        return jsonResponse({ success: true });
      }
      return jsonResponse({ success: false, message: "Gagal kirim Fonnte" });
    }

    // Aksi di bawah ini MEMERLUKAN token sah
    if (token !== CONFIG.TOKEN) {
      return jsonResponse({ success: false, message: "Akses ditolak" });
    }

    var ss = getSpreadsheet();

    // 7. Ubah Kata Sandi
    if (action === "changePassword") {
      var targetRole = postData.targetRole || "admin";
      var newPassword = postData.newPassword || "";
      updateAccountPassword(targetRole, newPassword);
      return jsonResponse({ success: true, message: "Berhasil disimpan" });
    }

    // 8. Unggah File ke Drive
    if (action === "uploadFile") {
      var folder = CONFIG.DRIVE_FOLDER_ID ? DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID) : DriveApp.getRootFolder();
      var base64Data = postData.base64Data || "";
      var fileName = postData.fileName || ("upload_" + new Date().getTime());
      var mimeType = postData.mimeType || "image/jpeg";
      
      var pureBase64 = base64Data.indexOf(",") > -1 ? base64Data.split(",")[1] : base64Data;
      var decoded = Utilities.base64Decode(pureBase64);
      var blob = Utilities.newBlob(decoded, mimeType, fileName);
      var file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

      return jsonResponse({
        success: true,
        fileId: file.getId(),
        url: file.getUrl(),
        name: file.getName()
      });
    }

    // 9. Hapus File Drive
    if (action === "deleteFile") {
      var fileId = postData.fileId;
      if (fileId) {
        var file = DriveApp.getFileById(fileId);
        file.setTrashed(true);
      }
      return jsonResponse({ success: true, message: "Berhasil dihapus" });
    }

    // 10. Tarik Semua Data
    if (action === "getAllData") {
      return jsonResponse({
        success: true,
        applicants: readSheetAsObjects(ss, CONFIG.SHEETS.APPLICANTS),
        settings: readSheetAsKeyValue(ss, CONFIG.SHEETS.SETTINGS),
        packages: readSheetAsObjects(ss, CONFIG.SHEETS.PACKAGES),
        content: readSheetAsObjects(ss, CONFIG.SHEETS.CONTENT),
        logs: readSheetAsObjects(ss, CONFIG.SHEETS.LOGS)
      });
    }

    // 11. Simpan Pengaturan
    if (action === "saveSettings") {
      var settingsMap = postData.settings || {};
      writeKeyValueToSheet(ss, CONFIG.SHEETS.SETTINGS, settingsMap);
      return jsonResponse({ success: true, message: "Berhasil disimpan" });
    }

    // 12. Update Pendaftar
    if (action === "updateApplicant") {
      var updated = postData.applicant;
      updateRowInSheet(ss, CONFIG.SHEETS.APPLICANTS, updated.id, [
        updated.id, updated.name, updated.whatsapp, updated.appType, updated.packageName, updated.status, updated.createdAt, updated.notes || "", updated.adminNotifStatus || "Terkirim", updated.userNotifStatus || "Terkirim", updated.sentTime || new Date().toISOString()
      ]);
      return jsonResponse({ success: true, message: "Berhasil disimpan" });
    }

    // 13. Hapus Pendaftar
    if (action === "deleteApplicant") {
      deleteRowInSheet(ss, CONFIG.SHEETS.APPLICANTS, postData.id);
      return jsonResponse({ success: true, message: "Berhasil dihapus" });
    }

    // 14. Simpan Log Aktivitas
    if (action === "logActivity") {
      var log = postData.log || {};
      var sheet = getOrCreateSheet(ss, CONFIG.SHEETS.LOGS, ["ID", "Peran", "Aksi", "Rincian", "Waktu"]);
      sheet.appendRow([
        log.id || ("LOG-" + new Date().getTime()),
        log.role || "",
        log.action || "",
        log.details || "",
        log.timestamp || new Date().toISOString()
      ]);
      return jsonResponse({ success: true });
    }

    return jsonResponse({ success: false, message: "Aksi tidak dikenal" });

  } catch (error) {
    return jsonResponse({ success: false, message: error.toString() });
  } finally {
    lock.releaseLock();
  }
}

function sendFonnte(token, target, message) {
  if (!token || !target || !message) return { success: false };
  try {
    var options = {
      method: "post",
      headers: { "Authorization": token },
      payload: { target: target, message: message },
      muteHttpExceptions: true
    };
    var response = UrlFetchApp.fetch("https://api.fonnte.com/send", options);
    var json = JSON.parse(response.getContentText());
    return { success: !!json.status };
  } catch (err) {
    return { success: false };
  }
}

function formatPhone(phone) {
  var clean = phone.replace(/\\D/g, "");
  if (clean.startsWith("0")) {
    return "62" + clean.substring(1);
  }
  return clean;
}

function checkHourlyLimit(ss, limit) {
  var sheet = getOrCreateSheet(ss, "LogKirim", ["Waktu"]);
  var now = new Date().getTime();
  var oneHourAgo = now - 3600000;
  var rows = sheet.getDataRange().getValues();
  var count = 0;
  for (var i = 1; i < rows.length; i++) {
    var t = new Date(rows[i][0]).getTime();
    if (t > oneHourAgo) count++;
  }
  if (count >= limit) return false;
  sheet.appendRow([new Date().toISOString()]);
  return true;
}

function renderTemplate(template, data) {
  return template
    .replace(/{nama}/g, data.name || data.Nama || "")
    .replace(/{nomor}/g, data.whatsapp || data["Nomor WhatsApp"] || "")
    .replace(/{paket}/g, data.packageName || data.Paket || "")
    .replace(/{jenis_aplikasi}/g, data.appType || data["Jenis Aplikasi"] || "")
    .replace(/{pesan}/g, data.message || data.Catatan || "")
    .replace(/{waktu}/g, data.createdAt || data.Waktu || new Date().toLocaleString());
}

function getSpreadsheet() {
  if (CONFIG.SPREADSHEET_ID) {
    return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getOrCreateSheet(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (headers && headers.length) {
      sheet.appendRow(headers);
      sheet.setFrozenRows(1);
    }
  }
  return sheet;
}

function verifyAccountPassword(plainPassword) {
  var ss = getSpreadsheet();
  var sheet = getOrCreateSheet(ss, CONFIG.SHEETS.ACCOUNTS, ["Role", "Salt", "Hash"]);
  var rows = sheet.getDataRange().getValues();
  
  if (rows.length <= 1) {
    var adminSalt = "salt_admin_2026";
    var superadminSalt = "salt_super_2026";
    var adminHash = hashWithSalt("admin123", adminSalt);
    var superHash = hashWithSalt("superadmin123", superadminSalt);
    sheet.appendRow(["admin", adminSalt, adminHash]);
    sheet.appendRow(["superadmin", superadminSalt, superHash]);
    rows = sheet.getDataRange().getValues();
  }

  for (var i = 1; i < rows.length; i++) {
    var role = rows[i][0];
    var salt = rows[i][1];
    var storedHash = rows[i][2];
    if (hashWithSalt(plainPassword, salt) === storedHash) {
      return role;
    }
  }
  return null;
}

function updateAccountPassword(role, newPlainPassword) {
  var ss = getSpreadsheet();
  var sheet = getOrCreateSheet(ss, CONFIG.SHEETS.ACCOUNTS, ["Role", "Salt", "Hash"]);
  var rows = sheet.getDataRange().getValues();
  var newSalt = "salt_" + new Date().getTime();
  var newHash = hashWithSalt(newPlainPassword, newSalt);

  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === role) {
      sheet.getRange(i + 1, 2, 1, 2).setValues([[newSalt, newHash]]);
      return;
    }
  }
  sheet.appendRow([role, newSalt, newHash]);
}

function hashWithSalt(str, salt) {
  var raw = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, str + "_" + salt);
  var out = "";
  for (var i = 0; i < raw.length; i++) {
    var b = (raw[i] + 256) % 256;
    var hex = b.toString(16);
    if (hex.length === 1) hex = "0" + hex;
    out += hex;
  }
  return out;
}

function readSheetAsObjects(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  var values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];
  var headers = values[0];
  var result = [];
  for (var i = 1; i < values.length; i++) {
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = values[i][j];
    }
    result.push(obj);
  }
  return result;
}

function readSheetAsKeyValue(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return {};
  var values = sheet.getDataRange().getValues();
  var map = {};
  for (var i = 0; i < values.length; i++) {
    if (values[i][0]) {
      map[values[i][0]] = values[i][1];
    }
  }
  return map;
}

function writeKeyValueToSheet(ss, sheetName, map) {
  var sheet = getOrCreateSheet(ss, sheetName, ["Key", "Value"]);
  var existing = sheet.getDataRange().getValues();
  var keyToRow = {};
  for (var i = 1; i < existing.length; i++) {
    keyToRow[existing[i][0]] = i + 1;
  }

  for (var k in map) {
    var val = typeof map[k] === "object" ? JSON.stringify(map[k]) : map[k];
    if (keyToRow[k]) {
      sheet.getRange(keyToRow[k], 2).setValue(val);
    } else {
      sheet.appendRow([k, val]);
    }
  }
}

function updateRowInSheet(ss, sheetName, id, newRowValues) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return;
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (values[i][0] == id) {
      sheet.getRange(i + 1, 1, 1, newRowValues.length).setValues([newRowValues]);
      return;
    }
  }
}

function deleteRowInSheet(ss, sheetName, id) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return;
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (values[i][0] == id) {
      sheet.deleteRow(i + 1);
      return;
    }
  }
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
`;
