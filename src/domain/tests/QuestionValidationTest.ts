import { Question } from '../entities/Question';
import { ValidationError } from '../../shared/errors/CustomErrors';

/**
 * Simple test functions to verify Zod validation is working
 * Run these manually to test the implementation
 */

export function testQuestionValidation() {
  console.log('🧪 Testing Question validation with Zod...\n');

  // Test 1: Valid question creation
  try {
    const validQuestion = Question.create(
      'q1',
      'What is the capital of France?',
      'The capital of France is Paris.'
    );
    console.log('✅ Valid question created successfully');
    console.log('Question:', validQuestion.toPlainObject());
  } catch (error) {
    console.log('❌ Unexpected error creating valid question:', error);
  }

  // Test 2: Empty question should fail
  try {
    Question.create('q2', '', 'Some answer');
    console.log('❌ Empty question should have failed validation');
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log('✅ Empty question validation failed as expected:', error.message);
    } else {
      console.log('❌ Unexpected error type:', error);
    }
  }

  // Test 3: Empty answer should fail
  try {
    Question.create('q3', 'Some question?', '');
    console.log('❌ Empty answer should have failed validation');
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log('✅ Empty answer validation failed as expected:', error.message);
    } else {
      console.log('❌ Unexpected error type:', error);
    }
  }

  // Test 4: Question too long should fail
  try {
    const longQuestion = 'A'.repeat(1001);
    Question.create('q4', longQuestion, 'Some answer');
    console.log('❌ Long question should have failed validation');
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log('✅ Long question validation failed as expected:', error.message);
    } else {
      console.log('❌ Unexpected error type:', error);
    }
  }

  // Test 5: Update question
  try {
    const question = Question.create('q5', 'Original question?', 'Original answer');
    question.update({ question: 'Updated question?' });
    console.log('✅ Question updated successfully');
    console.log('Updated question:', question.toPlainObject());
  } catch (error) {
    console.log('❌ Unexpected error updating question:', error);
  }

  // Test 6: Invalid update should fail
  try {
    const question = Question.create('q6', 'Some question?', 'Some answer');
    question.update({ question: '' });
    console.log('❌ Invalid update should have failed validation');
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log('✅ Invalid update validation failed as expected:', error.message);
    } else {
      console.log('❌ Unexpected error type:', error);
    }
  }

  console.log('\n🎉 All tests completed!');
}

// Uncomment the line below to run tests
// testQuestionValidation();
