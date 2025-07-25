-- SQLite table for Category schema
CREATE TABLE IF NOT EXISTS category (
  id TEXT PRIMARY KEY NOT NULL, -- UUID
  name TEXT NOT NULL,
  description TEXT,
  color_hex TEXT NOT NULL CHECK (color_hex GLOB '#[A-Fa-f0-9][A-Fa-f0-9][A-Fa-f0-9][A-Fa-f0-9][A-Fa-f0-9][A-Fa-f0-9]')
);
