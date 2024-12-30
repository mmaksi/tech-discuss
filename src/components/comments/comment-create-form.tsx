'use client';

import { useActionState } from 'react';
import { useEffect, useRef, useState } from 'react';
import * as actions from '@/actions';
import { Textarea } from '../ui/textarea';
import FormButton from '../common/form-button';
import { CreateCommentFormState } from '@/actions/create-comment';
import { Button } from '../ui/button';
import { MessageCircle } from 'lucide-react';

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({ postId, parentId, startOpen }: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);

  const [formState, action, isPending] = useActionState<CreateCommentFormState, FormData>(
    actions.createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (
    <form action={action} ref={ref}>
      <div className="space-y-2 px-12 -mt-2">
        <Textarea name="content" placeholder="Leave a comment" />
        <span className="text-destructive text-xs -mt-2">
          {!formState.errors._form && formState.errors.content?.join(', ')}
        </span>

        {formState.errors._form ? (
          <div className="p-2 bg-red-200 border rounded border-red-400">
            {formState.errors._form?.join(', ')}
          </div>
        ) : null}

        <div>
          {formState.errors._form && (
            <span className="text-destructive text-xs text-center">
              {formState.errors._form.join(', ')}
            </span>
          )}
          <FormButton pending={isPending} cta="Submit" />
        </div>
      </div>
    </form>
  );

  return (
    <>
      <div className="flex items-center gap-1 mx-12">
        <MessageCircle width={15} height={15} className="text-primary" />
        <Button size="sm" variant="link" className="p-0" onClick={() => setOpen(!open)}>
          reply
        </Button>
      </div>
      {open && form}
    </>
  );
}
