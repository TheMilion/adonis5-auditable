const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Sposta il file AuditModel.ts nella cartella "app/Models"
fs.copyFileSync(path.resolve(__dirname, "../templates/models/AuditModel.ts"), path.resolve(__dirname, "../../app/Models/AuditModel.ts"));

// Sposta il file AuditMiddleware.ts nella cartella "app/Middleware"
fs.copyFileSync(path.resolve(__dirname, "../templates/middleware/AuditMiddleware.ts"), path.resolve(__dirname, "../../app/Middleware/AuditMiddleware.ts"));

// Sposta il file HttpContext.ts nella cartella "app/Helpers/"
fs.copyFileSync(path.resolve(__dirname, "../templates/helpers/HttpContext.ts"), path.resolve(__dirname, "../../app/Helpers/HttpContext.ts"));

// Sposta il file AuditMigration.ts nella cartella "database/migrations"
fs.copyFileSync(path.resolve(__dirname, "../templates/migrations/AuditMigration.ts"), path.resolve(__dirname, "../../database/migrations/{timestamp}_audit_migration.js"));

// Esegui il comando per effettuare le migrazioni
execSync("node ace migration:run");
