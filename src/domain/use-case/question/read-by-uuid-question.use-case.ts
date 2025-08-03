import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { EntityError } from "@/domain/entities/entity-error";
import {
    questionSchema,
    QuestionToRepository,
} from "@/domain/entities/Question.entity";
import { ErrorRepository } from "@/domain/repositories/error-repository";
import { ReadByIdQuestionRepository } from "@/domain/repositories/question/read-by-id-question.repository";

/**
 * Props for read-by-uuid-question use case
 * @property metadata - Metadata for the request
 * @property data - Data containing the uuid
 */
export interface ReadByUuidQuestionProps {
    metadata: {
        timestamp: Date;
    };
    data: {
        uuid: string;
    };
}

/**
 * Use case to obtain one question by uuid
 */
export class ReadByUuidQuestionUseCase {
    private repository: ReadByIdQuestionRepository;

    constructor(repository: ReadByIdQuestionRepository) {
        this.repository = repository;
    }

    /**
     * Executes the use case to obtain a question by uuid
     * @param props - Props containing metadata and uuid
     * @returns Promise<CustomResponse>
     */
    async run(
        props: ReadByUuidQuestionProps
    ): Promise<CustomResponse<QuestionToRepository | null>> {
        try {
            // Validate input
            const uuidResult = questionSchema.shape.uuid.safeParse(props.data.uuid);
            if (!uuidResult.success) {
                return EntityError.getMessage(uuidResult.error);
            }
            // Query repository
            const questionFound = await this.repository.findById(props.data.uuid);
            if (!questionFound) {
                return CustomResponse.notFound({
                    userMessage: "Question not found",
                    developerMessage: `No question found with uuid: ${props.data.uuid}`,
                });
            }

            return CustomResponse.ok(questionFound);
        } catch (error) {
            if (error instanceof EntityError) return EntityError.getMessage(error);
            if (error instanceof ErrorRepository)
                return ErrorRepository.getMessage(error);
            return CustomResponse.internalServerError();
        }
    }
}
