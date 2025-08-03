import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { EntityError } from "@/domain/entities/entity-error";
import { QuestionToRepository } from "@/domain/entities/Question.entity";
import { ErrorRepository } from "@/domain/repositories/error-repository";
import { ReadAllQuestionRepository } from "@/domain/repositories/question/read-all-question.repository";

/**
 * Props for read-all-questions use case
 * @interface ReadAllQuestionsProps
 */
export interface ReadAllQuestionsProps {
    /**
     * Metadata for the request
     */
    metadata: {
        timestamp: Date;
    };
    /**
     * Data for the request (can be empty for this use case)
     */
    data: {};
}

/**
 * Use case to obtain a list of all questions created
 */
export class ReadAllQuestionsUseCase {
    private repository: ReadAllQuestionRepository;

    constructor(repository: ReadAllQuestionRepository) {
        this.repository = repository;
    }

    /**
     * Executes the use case to read all questions
     * @param props - ReadAllQuestionsProps
     * @returns Promise<CustomResponse>
     */
    public async run(
        props: ReadAllQuestionsProps
    ): Promise<CustomResponse<QuestionToRepository[] | null>> {
        try {
            // No input data to validate for this use case
            const questions = await this.repository.run();
            // Return questions directly
            return CustomResponse.ok(questions, {
                userMessage: "Questions retrieved successfully",
                developerMessage: "All questions fetched and validated",
            });
        } catch (error) {
            if (error instanceof EntityError) return EntityError.getMessage(error);
            if (error instanceof ErrorRepository) return ErrorRepository.getMessage(error);
            return CustomResponse.internalServerError();
        }
    }
}
