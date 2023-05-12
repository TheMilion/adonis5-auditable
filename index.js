const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

const modelsFolder = path.resolve(__dirname, "../../app/Models");
const migrationFolder = path.resolve(__dirname, "../../database/migrations");

// Verifica l'esistenza delle cartelle "app/Models" e "database/migrations"
mkdirp.sync(modelsFolder);
mkdirp.sync(migrationFolder);

// Verifica l'esistenza del file AuditModel.ts prima di copiarlo
const auditModelSourcePath = path.resolve(__dirname, "templates/models/AuditModel.ts");
const auditModelDestPath = path.resolve(modelsFolder, "AuditModel.ts");

if (!fs.existsSync(auditModelDestPath)) {
  fs.copyFileSync(auditModelSourcePath, auditModelDestPath);
}

// Genera il nome del file di migrazione basato sul timestamp corrente
const timestamp = new Date().getTime();
const migrationFileName = `${timestamp}_audit_migration.ts`;
const migrationSourcePath = path.resolve(__dirname, "templates/migrations/audit_migrations.ts");
const migrationDestPath = path.resolve(migrationFolder, migrationFileName);

// Verifica l'esistenza del file di migrazione prima di copiarlo
if (!fs.existsSync(migrationDestPath)) {
  fs.copyFileSync(migrationSourcePath, migrationDestPath);
}