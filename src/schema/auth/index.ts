import z from "zod";

export const authSchema = z.object({
  UserID: z.string().nonempty(),
  AccessPassword: z.string().nonempty(),
});

export type authType = z.infer<typeof authSchema>;
