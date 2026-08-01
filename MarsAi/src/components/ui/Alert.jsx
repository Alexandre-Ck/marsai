import { GrValidate } from 'react-icons/gr';
import { MdError } from 'react-icons/md';
import { FiLoader } from 'react-icons/fi';

export function SuccessMessage({ message }) {
  return (
    <section className="bg-green-50 border border-green-300 rounded-3xl p-6 text-center my-5">
      <h2 className="text-xl font-bold text-green-900 flex items-center gap-3">
        <GrValidate /> {message}
      </h2>
    </section>
  );
}

export function ErrorMessage({ message }) {
  return (
    <section className="bg-red-50 border border-red-300 rounded-3xl p-6 text-center my-5">
      <h2 className="text-xl font-bold text-red-900 flex items-center gap-3">
        <MdError /> {message}
      </h2>
    </section>
  );
}

export function LoadingMessage({ message }) {
  return (
    <section className="bg-orange-50 border border-orange-300 rounded-3xl p-6 text-center my-5">
      <h2 className="text-xl font-bold text-orange-900 flex items-center gap-3">
        <FiLoader /> {message}
      </h2>
    </section>
  );
}
