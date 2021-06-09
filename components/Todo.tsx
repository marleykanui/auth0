// React Types
import { FC } from 'react';

// Component Level Types
// Component Level Types
interface FieldsProps {
  description: string;
  completed: boolean;
}

interface TodosProps {
  id: string;
  fields: FieldsProps;
}

const Todo: FC<TodosProps> = ({ id, fields }) => {
  return (
    <li className="flex items-center bg-white shadow-lg rounded-lg flex-row justify-between my-2 p-4">
      <p
        className={`flex flex-row items-start text-grey-800 ${
          fields.completed ? 'line-through' : ''
        }`}
      >
        <div>
          <input
            type="checkbox"
            name="completed"
            id="completed"
            checked={fields.completed}
            className="mr-2 form-checkbox h-5 w-5"
          />
        </div>
        <div>{fields.description}</div>
      </p>

      <button
        type="button"
        className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
      >
        Delete
      </button>
    </li>
  );
};

export default Todo;
