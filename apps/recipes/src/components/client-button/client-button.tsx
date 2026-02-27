'use client';

import { deleteRecipe } from '@actions/delete';
import { useRouter } from 'next/navigation';

const ClientButton = (props: {
  children: React.ReactNode;
  mode: 'delete' | 'edit' | 'create';
  recordId: string;
  rerender?: boolean;
  className?: string;
}) => {
  const router = useRouter();

  const action =
    props.mode === 'delete'
      ? deleteRecipe
      : // TODO: implement edit and create actions if needed or refactor client button
        (id: string) => {
          console.log(`Action ${props.mode} on record ${id}`);
        };

  const handleClick = () => {
    action(props.recordId);
    if (props.rerender ?? false) {
      router.refresh();
    }
  };
  return (
    <div className={props.className} onClick={handleClick}>
      {props.children}
    </div>
  );
};

export default ClientButton;
