# Racketo API

Badminton rackets API.

## API Documentation

- Local: `http://localhost:3000`
- Production: `https://racketo.rudihe.com`

| Endpoint          | HTTP     | Description         | Available |
| ----------------- | -------- | ------------------- | --------- |
| `/rackets`        | `GET`    | Get all rackets     | ✅        |
| `/rackets/{slug}` | `GET`    | Get racket by slug  | ✅        |
| `/rackets`        | `POST`   | Add new racket      |           |
| `/rackets`        | `DELETE` | Delete all rackets  |           |
| `/rackets/{id}`   | `DELETE` | Delete racket by id |           |
| `/rackets/{id}`   | `PATCH`  | Patch racket by id  |           |
| `/rackets/{id}`   | `PUT`    | Update racket by id |           |
