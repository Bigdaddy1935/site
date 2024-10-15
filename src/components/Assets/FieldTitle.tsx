export default function FieldTitle({
  title,
  required,
}: {
  title: string;
  required?: boolean;
}) {
  return (
    <p className="text-hgray-600 dark:text-text-dark-3 mb-1">
      {title}
      {required ? <span className="text-rose-500">*</span> : null}
    </p>
  );
}
