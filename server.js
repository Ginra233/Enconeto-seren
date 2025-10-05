// server.js
const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs-extra");
const multer = require("multer");
const { Server } = require("socket.io");
const JsConfuser = require("js-confuser"); // sesuai di botmu
const chalk = require("chalk");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const UPLOAD_DIR = path.join(__dirname, "uploads");
const OUTPUT_DIR = path.join(__dirname, "output");
fs.ensureDirSync(UPLOAD_DIR);
fs.ensureDirSync(OUTPUT_DIR);

app.use(express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, name);
  }
});
const upload = multer({ storage });

function log(...args) {
  console.log(chalk.blue.bold("[WEB-OBF]"), ...args);
}

// --- Obfuscation config functions (port dari bot) ---
function getUltraSafeConfig() {
  return {
    target: "node",
    calculator: true,
    compact: true,
    hexadecimalNumbers: true,
    controlFlowFlattening: 1,
    deadCode: 1,
    dispatcher: true,
    duplicateLiteralsRemoval: 1,
    flatten: true,
    globalConcealing: true,
    identifierGenerator: "zeroWidth",
    renameVariables: true,
    renameGlobals: true,
    minify: true,
    movedDeclarations: true,
    objectExtraction: true,
    opaquePredicates: 0.75,
    stringConcealing: true,
    stringCompression: true,
    stringEncoding: true,
    stringSplitting: 0.75,
    rgf: false
  };
}

function getNebulaObfuscationConfig() {
  const generateNebulaName = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const prefix = "NX";
    let randomPart = "";
    for (let i = 0; i < 4; i++) {
      randomPart += chars[Math.floor(Math.random() * chars.length)];
    }
    return `${prefix}${randomPart}`;
  };
  return {
    target: "node",
    compact: true,
    renameVariables: true,
    renameGlobals: true,
    identifierGenerator: generateNebulaName,
    stringCompression: true,
    stringConcealing: false,
    stringEncoding: true,
    stringSplitting: false,
    controlFlowFlattening: 1,
    flatten: true,
    shuffle: true,
    rgf: true,
    deadCode: true,
    opaquePredicates: true,
    dispatcher: true,
    globalConcealing: true,
    objectExtraction: true,
    duplicateLiteralsRemoval: true,
    lock: {
      selfDefending: true,
      antiDebug: true,
      integrity: true,
      tamperProtection: true
    }
  };
}

function getNovaObfuscationConfig() {
  const generateNovaName = () => "var_" + Math.random().toString(36).substring(7);
  return {
    target: "node",
    calculator: false,
    compact: true,
    controlFlowFlattening: 1,
    deadCode: 1,
    dispatcher: true,
    duplicateLiteralsRemoval: 1,
    flatten: true,
    globalConcealing: true,
    hexadecimalNumbers: 1,
    identifierGenerator: generateNovaName,
    lock: {
      antiDebug: true,
      integrity: true,
      selfDefending: true
    },
    minify: true,
    movedDeclarations: true,
    objectExtraction: true,
    opaquePredicates: true,
    renameGlobals: true,
    renameVariables: true,
    shuffle: true,
    stack: true,
    stringCompression: true,
    stringConcealing: true
  };
}

function getArabObfuscationConfig() {
  const arabicChars = [
    "أ","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ",
    "ع","غ","ف","ق","ك","ل","م","ن","ه","و","ي"
  ];
  const generateArabicName = () => {
    const length = Math.floor(Math.random() * 4) + 3;
    let name = "";
    for (let i = 0; i < length; i++) name += arabicChars[Math.floor(Math.random() * arabicChars.length)];
    return name;
  };
  return {
    target: "node",
    compact: true,
    renameVariables: true,
    renameGlobals: true,
    identifierGenerator: () => generateArabicName(),
    stringEncoding: true,
    stringSplitting: true,
    controlFlowFlattening: 1,
    shuffle: true,
    duplicateLiteralsRemoval: true,
    deadCode: true,
    calculator: true,
    opaquePredicates: true,
    lock: {
      selfDefending: true,
      antiDebug: true,
      integrity: true,
      tamperProtection: true
    }
  };
}

function getJapanObfuscationConfig() {
  const japaneseChars = [
    "あ","い","う","え","お","か","き","く","け","こ","さ","し","す","せ","そ",
    "た","ち","つ","て","と","な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ",
    "ま","み","む","め","も","や","ゆ","よ","ら","り","る","れ","ろ","わ","を","ん"
  ];
  const generateJapaneseName = () => {
    const length = Math.floor(Math.random() * 4) + 3;
    let name = "";
    for (let i = 0; i < length; i++) name += japaneseChars[Math.floor(Math.random() * japaneseChars.length)];
    return name;
  };
  return {
    target: "node",
    compact: true,
    renameVariables: true,
    renameGlobals: true,
    identifierGenerator: () => generateJapaneseName(),
    stringEncoding: true,
    stringSplitting: true,
    controlFlowFlattening: 1,
    flatten: true,
    shuffle: true,
    duplicateLiteralsRemoval: true,
    deadCode: true,
    calculator: true,
    opaquePredicates: true,
    lock: {
      selfDefending: true,
      antiDebug: true,
      integrity: true,
      tamperProtection: true
    }
  };
}

function getJapanxArabObfuscationConfig() {
  const japaneseXArabChars = [
    "あ","い","う","え","お","か","き","く","け","こ","さ","し","す","せ","そ",
    "た","ち","つ","て","と","な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ",
    "ま","み","む","め","も","や","ゆ","よ","أ","ب","ت","ث","ج","ح","خ","د","ذ",
    "ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","ه","و","ي",
    "ら","り","る","れ","ろ","わ","を","ん"
  ];
  const generateJapaneseXArabName = () => {
    const length = Math.floor(Math.random() * 4) + 3;
    let name = "";
    for (let i = 0; i < length; i++) name += japaneseXArabChars[Math.floor(Math.random() * japaneseXArabChars.length)];
    return name;
  };
  return {
    target: "node",
    compact: true,
    renameVariables: true,
    renameGlobals: true,
    identifierGenerator: () => generateJapaneseXArabName(),
    stringCompression: true,
    stringConcealing: true,
    stringEncoding: true,
    stringSplitting: true,
    controlFlowFlattening: 1,
    flatten: true,
    shuffle: true,
    rgf: false,
    dispatcher: true,
    duplicateLiteralsRemoval: true,
    deadCode: true,
    calculator: true,
    opaquePredicates: true,
    lock: {
      selfDefending: true,
      antiDebug: true,
      integrity: true,
      tamperProtection: true
    }
  };
}

// --- Helper to select config ---
function pickConfig(name) {
  switch ((name || "").toLowerCase()) {
    case "ultra":
    case "ultra enc":
    case "hard":
      return getUltraSafeConfig();
    case "nova":
      return getNovaObfuscationConfig();
    case "nebula":
      return getNebulaObfuscationConfig();
    case "arab":
      return getArabObfuscationConfig();
    case "japan":
      return getJapanObfuscationConfig();
    case "xa":
    case "japanxarab":
    case "arabxjapan":
      return getJapanxArabObfuscationConfig();
    default:
      return getUltraSafeConfig();
  }
}

// --- Routes ---
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const id = path.basename(req.file.filename, path.extname(req.file.filename));
  // reply with socket id token
  return res.json({ ok: true, id, filename: req.file.filename });
});

// --- Socket.io for progress & start obfuscation ---
io.on("connection", (socket) => {
  log("Client connected", socket.id);

  socket.on("start", async (data) => {
    try {
      // data: { file: filename, preset: "ultra", password: "" }
      const { file, preset, password } = data;
      const filePath = path.join(UPLOAD_DIR, file);
      if (!fs.existsSync(filePath)) {
        socket.emit("error", { message: "File not found on server." });
        return;
      }

      socket.emit("progress", { percent: 5, status: "Membaca file" });
      const code = await fs.readFile(filePath, "utf8");

      // If password provided, wrap code
      socket.emit("progress", { percent: 15, status: "Mempersiapkan kode (password wrapper jika dipilih)" });
      let baseCode = code;
      if (password && password.length > 0) {
        const encodedPassword = Buffer.from(password).toString("base64");
        // create simple password template similar to bot (synchronous wrapper)
        baseCode = `
(async () => {
  const readline = require('readline');
  const passwordBuffer = Buffer.from('${encodedPassword}', 'base64');
  const correctPassword = passwordBuffer.toString('utf8');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  console.clear();
  console.log("🔑 MASUKKAN PASSWORD:");
  rl.question('> ', (inputPassword) => {
    if (inputPassword !== correctPassword) {
      console.log("❌ PASSWORD SALAH");
      process.exit(1);
    }
    // ORIGINAL CODE START
${code}
    // ORIGINAL CODE END
    rl.close();
  });
})();`.trim();
      }

      socket.emit("progress", { percent: 25, status: "Menentukan konfigurasi obfuscation" });
      const config = pickConfig(preset);

      socket.emit("progress", { percent: 40, status: "Mulai obfuscation (JsConfuser)" });
      // simulate smaller progress updates to frontend
      socket.emit("progress", { percent: 55, status: "Memproses obfuscation (ini mungkin butuh waktu)" });

      // Run JsConfuser
      const obfuscationResult = await JsConfuser.obfuscate(baseCode, config);
      let obfuscatedCode;
      if (typeof obfuscationResult === "string") obfuscatedCode = obfuscationResult;
      else if (obfuscationResult && typeof obfuscationResult.code === "string") obfuscatedCode = obfuscationResult.code;
      else if (obfuscationResult && typeof obfuscationResult.toString === "function") obfuscatedCode = obfuscationResult.toString();
      else obfuscatedCode = JSON.stringify(obfuscationResult);

      socket.emit("progress", { percent: 90, status: "Finalisasi dan menulis file output" });
      const outName = `obf_${Date.now()}_${file}`;
      const outPath = path.join(OUTPUT_DIR, outName);
      await fs.writeFile(outPath, obfuscatedCode, "utf8");

      socket.emit("progress", { percent: 100, status: "Selesai", download: `/download/${outName}` });
      socket.emit("done", { download: `/download/${outName}`, filename: outName });

      log("Created obfuscated file:", outPath);

    } catch (err) {
      console.error("Error obfuscation:", err);
      socket.emit("error", { message: err.message || String(err) });
    }
  });

  socket.on("disconnect", () => {
    log("Client disconnected", socket.id);
  });
});

app.get("/download/:name", (req, res) => {
  const name = req.params.name;
  const full = path.join(OUTPUT_DIR, name);
  if (!fs.existsSync(full)) return res.status(404).send("Not found");
  res.download(full);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  log(`Server running on http://localhost:${PORT}`);
});