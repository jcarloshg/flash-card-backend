CREATE TABLE IF NOT EXISTS question (
    uuid TEXT PRIMARY KEY NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    question TEXT NOT NULL,
    answers TEXT NOT NULL,
    answers_type TEXT NOT NULL CHECK (answers_type IN (
        'text/plain',
        'text/csv',
        'text/x-code',
        'image/png',
        'image/jpeg'
    ))
);