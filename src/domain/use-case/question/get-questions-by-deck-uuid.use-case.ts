import { z } from 'zod';
import { CustomResponse } from '../../entities/custom-response.entity';
import { ErrorRepository } from '../../repositories/error-repository';
import { EntityError } from '../../entities/entity-error';
import { ReadAllQuestionsByDeckUuidRepository } from '../../repositories/question/read-all-by-deck-uuid-question.repository';

/**
 * Props for get-questions-by-deck-uuid use case
 */
export interface GetQuestionsByDeckUuidProps {
    metadata: {
        timestamp: Date;
    };
    data: {
        deck_uuid: string;
    };
}

/**
 * Use case: Get all questions related to a specific deck by deck_uuid
 */
export class GetQuestionsByDeckUuidUseCase {

    private readonly _ReadAllQuestionsByDeckUuidRepository: ReadAllQuestionsByDeckUuidRepository;

    constructor(_ReadAllQuestionsByDeckUuidRepository: ReadAllQuestionsByDeckUuidRepository) {
        this._ReadAllQuestionsByDeckUuidRepository = _ReadAllQuestionsByDeckUuidRepository;
    }

    public async run(props: GetQuestionsByDeckUuidProps): Promise<CustomResponse<any>> {
        try {
            // Validate input using zod
            const deckUuidSchema = z.string().uuid({ message: 'Invalid deck_uuid' });
            const parseResult = deckUuidSchema.safeParse(props.data.deck_uuid);
            if (!parseResult.success) {
                return CustomResponse.badRequest(
                    'Invalid deck_uuid',
                    parseResult.error.issues.map((e: any) => e.message).join(', ')
                );
            }
            // Fetch questions by deck_uuid
            const questions = await this._ReadAllQuestionsByDeckUuidRepository.run(props.data.deck_uuid);
            return CustomResponse.ok(questions);
        } catch (error) {
            if (error instanceof EntityError) return EntityError.getMessage(error);
            if (error instanceof ErrorRepository) return ErrorRepository.getMessage(error);
            return CustomResponse.internalServerError(error);
        }
    }
}
