import { BaseModel, afterCreate, beforeDelete, beforeUpdate, column } from "@ioc:Adonis/Lucid/Orm";
import Audit from "App/Models/AuditModel";
import { DateTime } from "luxon";
import HttpContext from "@ioc:Adonis/Core/HttpContext";
import { v4 as uuid } from 'uuid'

export default class AuditModel extends BaseModel {
  public static table = "audits";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_id: number;

  @column()
  public auditable_id: number;

  @column()
  public auditable: string;

  @column()
  public event: string;

  @column()
  public ip: string;

  @column()
  public url: string;

  @column()
  public old_data: string;

  @column()
  public new_data: string;

  @column.dateTime()
  public createdAt: DateTime;

  @beforeUpdate()
  public static async updateAudit(model: AuditModel) {
    // Attraverso il middleware che ho creato in precedenza vado a prendermi il contest
    let request: any = null;
    let auth: any = null;
    if (HttpContext && HttpContext.get()) {
      let context = HttpContext.get();
      request = context?.request;
      auth = context?.auth;
    }
    // Recupero Indirizzo IP
    const ipAddress = request ? request.ip() : null;
    // Recupero Url che ha innescato la chiamata
    const url = request ? request.url(true) : null;
    // Recupero Valore della chiave primaria
    const primaryKeyValue = model.$primaryKeyValue;
    // Recupero Valori Precedente
    const originalData = model.$original;
    // Recupero Valori Modificati
    const newData = model.$attributes;
    // Controlla se il modello che sta per essere creato è lo stesso del modello AuditModel
    if (model.constructor === AuditModel) {
      return;
    }
    // Verifica se ci sono modifiche tra i dati originali e i nuovi dati
    const hasChanges = JSON.stringify(originalData) !== JSON.stringify(newData);

    if (hasChanges) {
      await Audit.create({
        event: "update",
        user_id: auth && auth.user ? auth.user.id : null,
        url: url,
        auditable: model.constructor.name,
        auditable_id: primaryKeyValue,
        ip: ipAddress,
        old_data: JSON.stringify(originalData),
        new_data: JSON.stringify(newData),
        created_at: DateTime.now(),
      });
    }
  }

  @afterCreate()
  public static async createAudit(model: AuditModel) {
    // Attraverso il middleware che ho creato in precedenza vado a prendermi il contest
    let request: any = null;
    let auth: any = null;
    if (HttpContext && HttpContext.get()) {
      let context = HttpContext.get();
      request = context?.request;
      auth = context?.auth;
    }
    // Recupero Indirizzo IP
    const ipAddress = request ? request.ip() : null;
    // Recupero Url che ha innescato la chiamata
    const url = request ? request.url(true) : null;
    // Recupero Valore della chiave primaria
    const primaryKeyValue = model.$primaryKeyValue;
    // Recupero Valori Modificati
    const newData = model.$attributes;
    // Controlla se il modello che sta per essere creato è lo stesso del modello AuditModel
    if (model.constructor === AuditModel) {
      return;
    }
    // Verifica se ci sono modifiche tra i dati originali e i nuovi dati
    await Audit.create({
      event: "create",
      user_id: auth && auth.user ? auth.user.id : null,
      url: url,
      auditable: model.constructor.name,
      auditable_id: primaryKeyValue,
      ip: ipAddress,
      old_data: "{}",
      new_data: JSON.stringify(newData),
      created_at: DateTime.now(),
    });
  }

  @beforeDelete()
  public static async deleteAudit(model: AuditModel) {
    // Attraverso il middleware che ho creato in precedenza vado a prendermi il contest
    let request: any = null;
    let auth: any = null;
    if (HttpContext && HttpContext.get()) {
      let context = HttpContext.get();
      request = context?.request;
      auth = context?.auth;
    }
    // Recupero Indirizzo IP
    const ipAddress = request ? request.ip() : null;
    // Recupero Url che ha innescato la chiamata
    const url = request ? request.url(true) : null;
    // Recupero Valore della chiave primaria
    const primaryKeyValue = model.$primaryKeyValue;
    // Recupero Valori Precedente
    const originalData = model.$original;

    // Controlla se il modello che sta per essere creato è lo stesso del modello AuditModel
    if (model.constructor === AuditModel) {
      return;
    }

    // Verifica se ci sono modifiche tra i dati originali e i nuovi dati
    await Audit.create({
      event: "delete",
      user_id: auth && auth.user ? auth.user.id : null,
      url: url,
      auditable: model.constructor.name,
      auditable_id: primaryKeyValue,
      ip: ipAddress,
      old_data: JSON.stringify(originalData),
      new_data: "",
      created_at: DateTime.now(),
    });
  }
}
