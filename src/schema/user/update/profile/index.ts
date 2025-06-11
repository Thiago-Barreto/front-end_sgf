import { z } from "zod";

export const UpdateProfileSchema = z.object({
  UserID: z.string(),
  CompleteName: z.string().nonempty(),
  AccessPassword: z.string().nonempty(),
  email: z.string().nonempty().email(),
  profile: z.string().nonempty(),
});

export type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;
