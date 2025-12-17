
import { z } from "zod";

export const uploadFilesSchema = z.object({
  body: z.object({}).optional()
});

export const shareWithUserSchema = z.object({
  body: z.object({
    userIds: z.array(z.string()).min(1),
    expiresAt: z.string().datetime().optional()
  }),
  params: z.object({
    fileId: z.string()
  })
});

export const shareViaLinkSchema = z.object({
  body: z.object({
    expiresAt: z.string().datetime().optional()
  }),
  params: z.object({
    fileId: z.string()
  })
});

export const fileIdParamSchema = z.object({
  params: z.object({
    fileId: z.string()
  })
});
