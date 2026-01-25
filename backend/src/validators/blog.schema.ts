import { z } from "zod";

const blogSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 5 characters")
        .max(50, "Title must be at most 50 characters"),

    body: z
        .string()
        .min(50, "Content must be at least 50 characters")
        .max(1000, "Content must be at most 1000 characters")
});

const blogSchemaWithId = blogSchema.extend({
    id: z.string()
});


export {
    blogSchema,
    blogSchemaWithId
}