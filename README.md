## Racketo API

List of badminton rackets API

## API Documentation

- Local: `http://localhost:3000`
- Production: `https://racketo.rudihe.com`

| Endpoint          | HTTP     | Description       | Available |
| ----------------- | -------- | ----------------- | --------- |
| `/rackets`        | `GET`    | Get all items     | ✅        |
| `/rackets/{slug}` | `GET`    | Get item by slug  | ✅        |
| `/rackets`        | `POST`   | Add new item      | ✅        |
| `/rackets`        | `DELETE` | Delete all items  | ✅        |
| `/rackets/{slug}` | `DELETE` | Delete item by id | ✅        |
| `/rackets/{slug}` | `PATCH`  | Patch item by id  | ✅        |
| `/rackets/{slug}` | `PUT`    | Update item by id | ✅        |
