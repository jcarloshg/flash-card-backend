-- Create the 'question' table if it does not already exist
CREATE TABLE IF NOT EXISTS question (
    uuid TEXT PRIMARY KEY NOT NULL, -- Unique identifier for the question
    active BOOLEAN NOT NULL DEFAULT 1, -- Indicates if the question is active
    question TEXT NOT NULL, -- The question text
    answers TEXT NOT NULL, -- Serialized answers (e.g., JSON string)
    answers_type TEXT NOT NULL CHECK (
        answers_type IN (
            'text/plain', -- Plain text answer
            'text/csv', -- CSV formatted answer
            'text/x-code', -- Code snippet answer
            'image/png', -- PNG image answer
            'image/jpeg' -- JPEG image answer
        )
    ), -- The MIME type of the answers
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the question was created
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP -- Timestamp when the question was last updated
);