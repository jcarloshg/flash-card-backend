import { Seeder } from './database-seeder';

/**
 * Sample development data seeder
 */
export const developmentDataSeeder: Seeder = {
  name: 'Development Data Seeder',
  
  async run(): Promise<void> {
    console.log('Seeding development data...');
    
    // This will be implemented with actual database instance
    // Example seeding logic:
    
    // 1. Create sample users
    const sampleUsers = [
      {
        email: 'john.doe@example.com',
        name: 'John Doe'
      },
      {
        email: 'jane.smith@example.com',
        name: 'Jane Smith'
      },
      {
        email: 'admin@example.com',
        name: 'Administrator'
      }
    ];

    // 2. Create sample decks
    const sampleDecks = [
      {
        title: 'JavaScript Fundamentals',
        description: 'Basic JavaScript concepts and syntax',
        user_id: 1
      },
      {
        title: 'TypeScript Advanced',
        description: 'Advanced TypeScript features and patterns',
        user_id: 1
      },
      {
        title: 'Node.js Essentials',
        description: 'Core Node.js concepts and APIs',
        user_id: 2
      }
    ];

    // 3. Create sample questions
    const sampleQuestions = [
      {
        deck_id: 1,
        question_text: 'What is the difference between let and var in JavaScript?',
        answer_text: 'let has block scope while var has function scope. let also prevents hoisting issues.',
        difficulty: 2
      },
      {
        deck_id: 1,
        question_text: 'What is a closure in JavaScript?',
        answer_text: 'A closure is a function that has access to variables in its outer scope even after the outer function has returned.',
        difficulty: 3
      },
      {
        deck_id: 2,
        question_text: 'What is a generic in TypeScript?',
        answer_text: 'Generics allow you to create reusable components that work with multiple types while maintaining type safety.',
        difficulty: 3
      },
      {
        deck_id: 3,
        question_text: 'What is the Event Loop in Node.js?',
        answer_text: 'The Event Loop is what allows Node.js to perform non-blocking I/O operations by offloading operations to the system kernel.',
        difficulty: 4
      }
    ];

    // Insert sample data (will be implemented with actual database operations)
    /*
    for (const user of sampleUsers) {
      await db.run(
        'INSERT INTO users (email, name) VALUES (?, ?)',
        [user.email, user.name]
      );
    }

    for (const deck of sampleDecks) {
      await db.run(
        'INSERT INTO decks (title, description, user_id) VALUES (?, ?, ?)',
        [deck.title, deck.description, deck.user_id]
      );
    }

    for (const question of sampleQuestions) {
      await db.run(
        'INSERT INTO questions (deck_id, question_text, answer_text, difficulty) VALUES (?, ?, ?, ?)',
        [question.deck_id, question.question_text, question.answer_text, question.difficulty]
      );
    }
    */

    console.log('Development data seeded successfully');
  }
};
