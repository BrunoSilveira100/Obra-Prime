# Modelagem de Banco - Obra Prime Web

## Entidades

### User

- id
- name
- email
- passwordHash
- role
- status
- createdAt
- updatedAt

### RefreshToken

- id
- userId
- tokenHash
- expiresAt
- revokedAt
- createdAt
- updatedAt

### PasswordResetToken

- id
- userId
- tokenHash
- expiresAt
- usedAt
- createdAt

### Work

- id
- name
- client
- address
- responsibleId
- startDate
- expectedEndDate
- status
- createdAt
- updatedAt

### ServiceOrder

- id
- number
- workId
- responsibleId
- description
- priority
- openedAt
- completedAt
- status
- createdAt
- updatedAt

### ServiceOrderNote

- id
- serviceOrderId
- userId
- text
- createdAt
- updatedAt

### Photo

- id
- workId
- serviceOrderId
- uploadedById
- storageProvider
- path
- originalName
- mimeType
- size
- description
- takenAt
- latitude
- longitude
- metadata
- createdAt
- updatedAt

### Activity

- id
- userId
- entity
- entityId
- action
- summary
- payload
- createdAt

## Enums

### UserRole

- ADMIN
- ENGINEER
- FIELD_TECHNICIAN

### UserStatus

- ACTIVE
- INACTIVE

### WorkStatus

- PLANNING
- IN_PROGRESS
- PAUSED
- COMPLETED

### ServiceOrderStatus

- OPEN
- IN_EXECUTION
- WAITING_APPROVAL
- FINISHED

### ServiceOrderPriority

- A definir antes da implementacao.

### StorageProvider

- LOCAL
- S3

## Relacionamentos

- User 1:N RefreshToken
- User 1:N PasswordResetToken
- User 1:N Work como responsavel
- User 1:N ServiceOrder como responsavel
- User 1:N Photo como autor do upload
- User 1:N Activity
- Work 1:N ServiceOrder
- Work 1:N Photo
- ServiceOrder 1:N ServiceOrderNote
- ServiceOrder 1:N Photo

## Diagrama ER Mermaid

```mermaid
erDiagram
  USER ||--o{ REFRESH_TOKEN : has
  USER ||--o{ PASSWORD_RESET_TOKEN : has
  USER ||--o{ WORK : responsible_for
  USER ||--o{ SERVICE_ORDER : responsible_for
  USER ||--o{ SERVICE_ORDER_NOTE : writes
  USER ||--o{ PHOTO : uploads
  USER ||--o{ ACTIVITY : performs

  WORK ||--o{ SERVICE_ORDER : contains
  WORK ||--o{ PHOTO : has
  SERVICE_ORDER ||--o{ SERVICE_ORDER_NOTE : has
  SERVICE_ORDER ||--o{ PHOTO : has

  USER {
    uuid id PK
    string name
    string email
    string passwordHash
    UserRole role
    UserStatus status
    datetime createdAt
    datetime updatedAt
  }

  REFRESH_TOKEN {
    uuid id PK
    uuid userId FK
    string tokenHash
    datetime expiresAt
    datetime revokedAt
    datetime createdAt
    datetime updatedAt
  }

  PASSWORD_RESET_TOKEN {
    uuid id PK
    uuid userId FK
    string tokenHash
    datetime expiresAt
    datetime usedAt
    datetime createdAt
  }

  WORK {
    uuid id PK
    string name
    string client
    string address
    uuid responsibleId FK
    date startDate
    date expectedEndDate
    WorkStatus status
    datetime createdAt
    datetime updatedAt
  }

  SERVICE_ORDER {
    uuid id PK
    string number
    uuid workId FK
    uuid responsibleId FK
    string description
    ServiceOrderPriority priority
    datetime openedAt
    datetime completedAt
    ServiceOrderStatus status
    datetime createdAt
    datetime updatedAt
  }

  SERVICE_ORDER_NOTE {
    uuid id PK
    uuid serviceOrderId FK
    uuid userId FK
    string text
    datetime createdAt
    datetime updatedAt
  }

  PHOTO {
    uuid id PK
    uuid workId FK
    uuid serviceOrderId FK
    uuid uploadedById FK
    StorageProvider storageProvider
    string path
    string originalName
    string mimeType
    int size
    string description
    datetime takenAt
    decimal latitude
    decimal longitude
    json metadata
    datetime createdAt
    datetime updatedAt
  }

  ACTIVITY {
    uuid id PK
    uuid userId FK
    string entity
    string entityId
    string action
    string summary
    json payload
    datetime createdAt
  }
```
