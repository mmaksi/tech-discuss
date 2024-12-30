import React from 'react';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

type Props = {
  pending: boolean;
  loadingText?: string;
  cta: string;
  className?: string;
};

const FormButton = (props: Props) => {
  const { className, pending, cta, loadingText = '' } = props;
  return (
    <Button className={className} disabled={pending}>
      <>
        {!pending && cta}
        {pending && (
          <>
            <Loader2 className="animate-spin text-primary-foreground w-4 h-4" />
            {loadingText}
          </>
        )}
      </>
    </Button>
  );
};

export default FormButton;
