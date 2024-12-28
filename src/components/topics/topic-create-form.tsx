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
import { Loader2 } from 'lucide-react';

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
        <Button variant="default">Create Post</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4">
            <h3 className="text-lg font-semibold">Create a new topic</h3>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name" name="name" />
            <span className="text-destructive text-xs -mt-2">
              {!formState.errors._form && formState.errors.name?.join(', ')}
            </span>

            <Label htmlFor="description">Description</Label>
            <Textarea placeholder="Describe your topic" id="description" name="description" />
            <span className="text-destructive text-xs -mt-2">
              {!formState.errors._form && formState.errors.description?.join(', ')}
            </span>

            {formState.errors._form && (
              <span className="text-destructive text-xs text-center">
                {formState.errors._form.join(', ')}
              </span>
            )}
            <Button type="submit" className="w-full">
              <>
                {!isPending && 'Create'}
                {isPending && (
                  <>
                    <Loader2 className="animate-spin text-primary-foreground w-4 h-4" />
                    Creating...
                  </>
                )}
              </>
            </Button>
            {/* add a loading spinner */}
            {isPending && (
              <div className="flex items-center justify-center mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            )}
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
