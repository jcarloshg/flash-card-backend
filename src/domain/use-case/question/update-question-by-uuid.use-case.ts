import { z } from "zod";
import {
    questionSchemaToUpdate,
    QuestionUpdate,
    QuestionToRepository,
} from "@/domain/entities/Question.entity";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { ErrorRepository } from "@/domain/repositories/error-repository";
import { EntityError } from "@/domain/entities/entity-error";
import { UpdateQuestionRepository } from "@/domain/repositories/question/update-question.repository";

/**
 * Props for updating a question by uuid.
 * @property metadata - Metadata for the request.
 * @property data - Data to update the question.
 */
export interface UpdateQuestionByUuidProps {
    metadata: {
        timestamp: Date;
    };
    data: {
        uuid: string;
        update: { [key: string]: any };
    };
}

/**
 * Use case for updating a question by uuid.
 */
export class UpdateQuestionByUuidUseCase {
    private readonly repository: UpdateQuestionRepository;

    constructor(repository: UpdateQuestionRepository) {
        this.repository = repository;
    }

    /**
     * Updates a question by uuid.
     * @param props - Props for updating the question.
     * @returns Promise<CustomResponse<QuestionToRepository | null>>
     */
    async run(
        props: UpdateQuestionByUuidProps
    ): Promise<CustomResponse<QuestionToRepository | null>> {
        try {

            // Validate input data
            const { uuid, update } = props.data;
            const parseResult = questionSchemaToUpdate.safeParse(update);
            if (!parseResult.success) return EntityError.getMessage(parseResult.error);


            // Call repository to update
            const parsedBody: QuestionUpdate = parseResult.data;
            const result = await this.repository.run(uuid, update);
            if (!result) {
                return CustomResponse.notFound({
                    userMessage: "Question not found",
                    developerMessage: `No question found with uuid: ${uuid}`,
                });
            }

            return CustomResponse.ok(result, {
                userMessage: "Question updated successfully",
                developerMessage: `Question with uuid ${uuid} updated successfully`,
            });

        } catch (error) {
            if (error instanceof EntityError) return EntityError.getMessage(error);
            if (error instanceof ErrorRepository) return ErrorRepository.getMessage(error);
            return CustomResponse.internalServerError();
        }
    }
}
