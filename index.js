const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

var mkdirp = require("mkdirp");

let modelsFolder = path.resolve(__dirname, "../app/Models");
let middlewareFolder = path.resolve(__dirname, "../app/Middleware");
let helpersFolder = path.resolve(__dirname, "../app/Helpers");
let migrationFolder = path.resolve(__dirname, "../database/migrations");

mkdirp.sync(modelsFolder);
mkdirp.sync(middlewareFolder);
mkdirp.sync(helpersFolder);
mkdirp.sync(migrationFolder);
// Sposta il file AuditModel.ts nella cartella "app/Models"
fs.copyFileSync(path.resolve(__dirname, "templates/models/AuditModel.ts"), path.resolve(modelsFolder, "AuditModel.ts"));

// Sposta il file AuditMiddleware.ts nella cartella "app/Middleware"
fs.copyFileSync(path.resolve(__dirname, "templates/middleware/AuditMiddleware.ts"), path.resolve(middlewareFolder, "AuditMiddleware.ts"));

// Sposta il file HttpContext.ts nella cartella "app/Helpers/"
fs.copyFileSync(path.resolve(__dirname, "templates/helpers/HttpContext.ts"), path.resolve(helpersFolder, "HttpContext.ts"));

const timestamp = new Date().getTime();
const migrationFileName = `${timestamp}_audit_migration.ts`;

// Sposta il file AuditMigration.ts nella cartella "database/migrations"
fs.copyFileSync(path.resolve(__dirname, "templates/migrations/audit_migrations.ts"), path.resolve(migrationFolder, migrationFileName));
