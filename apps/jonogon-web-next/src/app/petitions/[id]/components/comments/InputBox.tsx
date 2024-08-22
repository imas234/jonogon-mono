import {useState} from 'react';
import {InputProps} from './types.js';
import {useParams} from 'next/navigation';
import {trpc} from '@/trpc';

export default function InputBox({parentId, refetch}: InputProps) {
    const [inputBody, setInputBody] = useState('');

    const {id} = useParams() as {id: string};

    const createComment = trpc.comments.create.useMutation();

    const onEnter = async () => {
        await createComment.mutateAsync({
            body: inputBody,
            petition_id: id,
            parent_id: parentId,
        });
        setInputBody('');
        refetch();
    };

    return (
        <div className="border p-2">
            <div className="flex flex-row gap-2">
                <input
                    className="w-3/4 p-4"
                    value={inputBody}
                    onChange={(event) => setInputBody(event.target.value)}
                    onKeyDown={(event) => {
                        event.key == 'Enter' ? onEnter() : null;
                    }}
                />
                <button
                    className="border bg-white p-2 px-6 rounded flex-grow"
                    onClick={onEnter}>
                    Comment
                </button>
            </div>
        </div>
    );
}
