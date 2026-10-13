# This is just a personal website for me to explore

Planning notes: [Education → Basic Economics](docs/education-basic-economics.md)

## Art gallery manifest

The `/art` gallery reads a public JSON file at
`https://images-ch.s3.eu-north-1.amazonaws.com/manifest.json`.

The manifest is a JSON **array**. Array order is display order. Each entry:

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `key` | string | yes | Full S3 object path, e.g. `professional-animation/TLS/TLS_BG_SH0320_V03.jpg` |
| `description` | string | yes | Caption shown under the image (use `""` if none) |
| `tags` | string[] | no | Optional labels; not used for grouping |

There is no `title` field. Alt text is the description, or the filename if the description is empty.

Category and heading come from the path, not from extra fields:

- first folder `personal` → **Personal**
- first folder `professional-animation` → **Production**
- second folder → group heading (`TLS`, `vikingskool`, …)

See [app/art/manifest.example.json](app/art/manifest.example.json). Descriptions are empty there because the live captions live in S3. Replace the `<tls-file-N>` placeholders with the remaining keys under `professional-animation/TLS/`.
