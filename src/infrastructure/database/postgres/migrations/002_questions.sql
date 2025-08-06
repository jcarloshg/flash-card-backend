-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
    uuid UUID PRIMARY KEY,
    question TEXT NOT NULL,
    answers TEXT NOT NULL,
    answers_type VARCHAR(50) NOT NULL CHECK (answers_type IN ('text/plain', 'text/csv', 'text/x-code', 'image/png', 'image/jpeg')),
    active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for questions table
CREATE INDEX IF NOT EXISTS idx_questions_active ON questions (active);
CREATE INDEX IF NOT EXISTS idx_questions_answers_type ON questions (answers_type);
CREATE INDEX IF NOT EXISTS idx_questions_created_at ON questions (created_at);

-- Create full-text search index for question content
CREATE INDEX IF NOT EXISTS idx_questions_question_fts ON questions USING gin(to_tsvector('english', question));
CREATE INDEX IF NOT EXISTS idx_questions_answers_fts ON questions USING gin(to_tsvector('english', answers));

-- Create trigger for automatic updated_at updates
CREATE TRIGGER update_questions_updated_at 
    BEFORE UPDATE ON questions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create deck_questions junction table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS deck_questions (
    deck_uuid UUID NOT NULL,
    question_uuid UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    PRIMARY KEY (deck_uuid, question_uuid),
    FOREIGN KEY (deck_uuid) REFERENCES decks(uuid) ON DELETE CASCADE,
    FOREIGN KEY (question_uuid) REFERENCES questions(uuid) ON DELETE CASCADE
);

-- Create indexes for deck_questions junction table
CREATE INDEX IF NOT EXISTS idx_deck_questions_deck_uuid ON deck_questions (deck_uuid);
CREATE INDEX IF NOT EXISTS idx_deck_questions_question_uuid ON deck_questions (question_uuid);
CREATE INDEX IF NOT EXISTS idx_deck_questions_created_at ON deck_questions (created_at);