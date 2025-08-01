import { QuestionCreate, QuestionToCreate, Question } from "../entities/Question.entity";
import { CustomResponse } from "../entities/custom-response.entity";
import { EntityError } from "../entities/entity-error";
import { ErrorRepository } from "../repositories/error-repository";
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

    async run(props: CreateQuestionUseCaseProps): Promise<CustomResponse<Question | null>> {
        try {

            const { metadata, data } = props;

            // Validate input data using QuestionToCreate schema
            const parseResult = QuestionToCreate.safeParse(data.QuestionCreate);
            if (!parseResult.success) return EntityError.getMessage(parseResult.error);

            console.log(`[metadata] -> `, metadata);

            // Create the question using the repository
            const validatedData = parseResult.data;
            const createdQuestion = await this.repository.run(validatedData);

            console.log(`[validatedData] -> `, validatedData)

            return CustomResponse.created(createdQuestion);
        } catch (error) {
            if (error instanceof EntityError) return EntityError.getMessage(error);
            if (error instanceof ErrorRepository) return ErrorRepository.getMessage(error);
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error(`[CreateQuestionUseCase Error] -> `, errorMessage);
            return CustomResponse.internalServerError();
        }
    }
}


export interface CreateQuestionUseCaseProps {
    data: {
        QuestionCreate: { [key: string]: any }
    };
    metadata: {
        timestamp: Date;
    };
}