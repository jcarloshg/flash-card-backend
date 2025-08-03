import { v4 as uuidv4 } from "uuid";

import { CreateQuestionRepository } from "@/domain/repositories/question/create-question.repository";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import {
    QuestionCreateToRepository,
    questionSchemaToCreate,
    QuestionToRepository,
} from "@/domain/entities/Question.entity";
import { EntityError } from "@/domain/entities/entity-error";
import { ErrorRepository } from "@/domain/repositories/error-repository";

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

    async run(
        props: CreateQuestionUseCaseProps
    ): Promise<CustomResponse<QuestionToRepository | null>> {
        try {
            const { metadata, data } = props;

            // Validate input data using QuestionToCreate schema
            const parseResult = questionSchemaToCreate.safeParse(data.QuestionCreate);
            if (!parseResult.success)
                return EntityError.getMessage(parseResult.error);

            console.log(`[metadata] -> `, metadata);

            // Create the question using the repository
            const validatedData = parseResult.data;
            const questionCreateToRepository: QuestionCreateToRepository = {
                uuid: uuidv4(),
                active: true,
                answers: validatedData.answers,
                answers_type: validatedData.answers_type,
                question: validatedData.question,
                createdAt: metadata.timestamp,
                updatedAt: metadata.timestamp,
            };
            const createdQuestion = await this.repository.run(
                questionCreateToRepository
            );

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
        QuestionCreate: { [key: string]: any };
    };
    metadata: {
        timestamp: Date;
    };
}
