import { questionSchema } from '../../entities/Question.entity';
import { CustomResponse } from '../../entities/custom-response.entity';
import { ErrorRepository } from '../../repositories/error-repository';
import { EntityError } from '../../entities/entity-error';
import { DeleteQuestionRepository } from '../../repositories/question/delete-question.repository';

/**
 * Props for delete-by-uuid use case
 * @property metadata - Metadata for the request
 * @property data - Data containing the uuid to delete
 */
/**
 * Props for deleting a question by uuid
 */
export interface DeleteByUuidProps {
    /**
     * Metadata for the request
     */
    metadata: {
        timestamp: Date;
    };
    /**
     * Data containing the uuid to delete
     */
    data: {
        uuid: string;
    };
}

/**
 * Use case for deleting a question by uuid
 */
export class DeleteByUuidQuestionUseCase {
    private readonly repository: DeleteQuestionRepository;

    constructor(repository: DeleteQuestionRepository) {
        this.repository = repository;
    }

    /**
     * Deletes a question by uuid
     * @param props - DeleteByUuidProps
     * @returns Promise<CustomResponse<boolean>>
     */
    async run(props: DeleteByUuidProps): Promise<CustomResponse<boolean | null>> {
        try {

            // Validate input
            const uuidSchema = questionSchema.shape.uuid;
            const parseResult = uuidSchema.safeParse(props.data.uuid);
            if (!parseResult.success) {
                return EntityError.getMessage(parseResult.error);
            }

            // Execute repository delete
            const uuid = parseResult.data;
            const result = await this.repository.run(uuid);
 
            if (!result) {
                return CustomResponse.notFound({
                    userMessage: 'Question not found.',
                    developerMessage: 'No question found for the provided uuid.',
                });
            }

            return CustomResponse.ok(true, {
                userMessage: 'Question deleted successfully.',
                developerMessage: 'Delete operation completed successfully for the given uuid.',
            });
        } catch (error) {
            if (error instanceof EntityError) return EntityError.getMessage(error);
            if (error instanceof ErrorRepository) return ErrorRepository.getMessage(error);
            return CustomResponse.internalServerError();
        }
    }
}
