from sqlalchemy.orm import Session
import models


def add_audit_log(db: Session, action: str, table_name: str, record_id: int):
    log = models.AuditLog(
        action=action,
        table_name=table_name,
        record_id=record_id
    )

    db.add(log)
    db.commit()