'use server';
import { auth } from '@/auth';
import { z } from 'zod';
import type { Topic } from '@prisma/client';
import { db } from '@/db';
import paths from '@/paths';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Too short' })
    .regex(/^[a-z-]+$/, { message: 'Must be lowercase letters and hyphens only' }),
  description: z.string().min(1, { message: 'Description is required' }),
});

export interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const result = createTopicSchema.safeParse({
    name: formData.get('name') as string,
    description: formData.get('description') as string,
  });

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to create a topic.'],
      },
    };
  }

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong. Please try again.'],
        },
      };
    }
  }

  revalidatePath('/');
  redirect(paths.topicShow(topic.slug));
}
