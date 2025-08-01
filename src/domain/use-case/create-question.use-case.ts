import { QuestionCreate, QuestionToCreate, Question } from "../entities/Question.entity";
import { CustomResponse } from "../entities/custom-response.entity";
import { EntityError } from "../entities/entity-error";
import { CreateQuestionRepository } from "../repositories/question/create-question.repository";


/**
 * Use case for creating a new Question.
 * Objective: Create a record of the question.
 */
export class CreateQuestionUseCase {
    private readonly repository: CreateQuestionRepository;

    /**
     * Initializes the use case with the required repository.
     * @param repository - Instance of CreateQuestionRepository
     */
    constructor(repository: CreateQuestionRepository) {
        this.repository = repository;
    }

    /**
     * Executes the use case to create a new Question.
     * Validates input data and handles errors according to domain instructions.
     * @param questionData - The question data to create
     * @returns Promise<CustomResponse> - Custom response with created question or error
     */
    async run(props: CreateQuestionUseCaseProps): Promise<CustomResponse<Question | null>> {
        try {

            const { metadata, data } = props;

            console.log(`[metadata] -> `, metadata)

            // Validate input data using QuestionToCreate schema
            const parseResult = QuestionToCreate.safeParse(data.QuestionCreate);
            if (!parseResult.success) return EntityError.getMessage(parseResult.error);

            const validatedData = parseResult.data;
            const createdQuestion = await this.repository.run(validatedData);

            return CustomResponse.created(createdQuestion);
        } catch (error) {
            if (error instanceof EntityError) return EntityError.getMessage(error);
            return CustomResponse.internalServerError();
        }
    }
}


export interface CreateQuestionUseCaseProps {
    metadata: { [key: string]: any };
    data: {
        QuestionCreate: { [key: string]: any }
    };
}