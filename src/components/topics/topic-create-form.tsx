'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import * as actions from '@/actions';
import { useActionState, startTransition } from 'react';
import { CreateTopicFormState } from '@/actions/create-topic';
import { FormEvent } from 'react';
import FormButton from '../common/form-button';
import { CirclePlus } from 'lucide-react';

export default function TopicCreateForm() {
  const [formState, action, isPending] = useActionState<CreateTopicFormState, FormData>(
    actions.createTopic,
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
          Create Topic
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4">
            <h3 className="text-lg font-semibold">Create a new topic</h3>
            <Label htmlFor="name" className="-mb-2">
              Name
            </Label>
            <Input id="name" placeholder="Name" name="name" />
            <span className="text-destructive text-xs -mt-2">
              {!formState.errors._form && formState.errors.name?.join(', ')}
            </span>

            <Label htmlFor="description" className="-mb-2">
              Description
            </Label>
            <Textarea placeholder="Describe your topic" id="description" name="description" />
            <span className="text-destructive text-xs -mt-2">
              {!formState.errors._form && formState.errors.description?.join(', ')}
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
