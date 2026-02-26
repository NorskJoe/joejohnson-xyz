'use client';

import { deleteRecipe } from '@actions/delete';
import { useRouter } from 'next/navigation';

const ClientButton = (props: {
  buttonText: string;
  action: 'delete' | 'edit' | 'create';
  recordId: string;
  rerender?: boolean;
}) => {
  const router = useRouter();

  const action =
    props.action === 'delete'
      ? deleteRecipe
      : // TODO: implement edit and create actions if needed or refactor client button
        (id: string) => {
          console.log(`Action ${props.action} on record ${id}`);
        };

  const handleClick = () => {
    action(props.recordId);
    if (props.rerender ?? false) {
      router.refresh();
    }
  };
  return <button onClick={handleClick}>{props.buttonText}</button>;
};

export default ClientButton;
