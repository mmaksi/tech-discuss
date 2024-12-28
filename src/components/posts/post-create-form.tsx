'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import * as actions from '@/actions';
import { useActionState, startTransition } from 'react';
import { CreatePostFormState } from '@/actions/create-post';
import { FormEvent } from 'react';
import FormButton from '../common/form-button';
import { CirclePlus } from 'lucide-react';

interface Props {
  slug: string;
}

export default function PostCreateForm({ slug }: Props) {
  const [formState, action, isPending] = useActionState<CreatePostFormState, FormData>(
    actions.createPost.bind(null, slug),
    {
      errors: {},
    }
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="mx-auto" variant="default">
          <CirclePlus />
          Create Post
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4">
            <h3 className="text-lg font-semibold">Create a new post</h3>
            <Label htmlFor="title" className="-mb-2">
              Title
            </Label>
            <Input id="title" placeholder="Title" name="title" />
            <span className="text-destructive text-xs -mt-2">
              {!formState.errors._form && formState.errors.title?.join(', ')}
            </span>

            <Label htmlFor="content" className="-mb-2">
              Content
            </Label>
            <Textarea placeholder="Content" id="content" name="content" />
            <span className="text-destructive text-xs -mt-2">
              {!formState.errors._form && formState.errors.content?.join(', ')}
            </span>

            {formState.errors._form && (
              <span className="text-destructive text-xs text-center">
                {formState.errors._form.join(', ')}
              </span>
            )}
            <FormButton
              className="w-[50%]"
              pending={isPending}
              cta="Create"
              loadingText="Creating..."
            />
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
