const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Sposta il file AuditModel.ts nella cartella "app/Models"
fs.copyFileSync(path.resolve(__dirname, "../AuditModel.ts"), path.resolve(__dirname, "../../app/Models/AuditModel.ts"));

// Sposta il file AuditMiddleware.ts nella cartella "app/Middleware"
fs.copyFileSync(path.resolve(__dirname, "../AuditMiddleware.ts"), path.resolve(__dirname, "../../app/Middleware/AuditMiddleware.ts"));

// Sposta il file AuditMigration.ts nella cartella "database/migrations"
fs.copyFileSync(path.resolve(__dirname, "../AuditMigration.ts"), path.resolve(__dirname, "../../database/migrations/{timestamp}_audit_migration.js"));

// // Aggiungi il middleware globalmente nel file "start/kernel.ts"
// const kernelPath = path.resolve(__dirname, "../../start/kernel.ts");
// let kernelContent = fs.readFileSync(kernelPath, "utf-8");
// kernelContent = kernelContent.replace("use('Adonis/Middleware/Auth')", "use('Adonis/Middleware/Auth')\n  .use('App/Middleware/AuditMiddleware')");
// fs.writeFileSync(kernelPath, kernelContent, "utf-8");

// Esegui il comando per effettuare le migrazioni
execSync("node ace migration:run");
