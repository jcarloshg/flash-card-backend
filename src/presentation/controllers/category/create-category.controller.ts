import { Request, Response } from "express";
import { CategoryToCreate } from "../../../domain/entities/Category.entity";
import z from "zod";

export const createCategoryController = (req: Request, res: Response): void => {
    try {
        const body: unknown = req.body ?? {};
        let parsedBody;
        try {
            parsedBody = CategoryToCreate.parse(body);
        } catch (parseError) {
            if (Array.isArray(parseError)) {
                console.log(`[parseError] -> `, parseError[0]);
            }

            if (parseError instanceof z.ZodError) {
                console.log(`[ZodError] -> `, parseError.issues[0].message);
            }

            const errorMessage: string = parseError instanceof Error
                ? parseError.message
                : "Invalid category data";
            res.status(400).json({
                message: `Invalid category data: {${errorMessage}}`,
            });
            return;
        }

        // TODO: Implement category creation logic here (e.g., save to database)

        res.status(201).json({
            message: "Category created successfully",
            category: parsedBody,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("[error] ->", error);
        const errorMessage: string =
            error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({
            message: `Internal server error: {${errorMessage}}`,
        });
    }
};
