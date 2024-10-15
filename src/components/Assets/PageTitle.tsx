type Props = {
  title: string;
};

export default function PageTitle({ title }: Props) {
  return <h1 className="text-2xl font-bold text-hgray-500 dark:text-text-dark-2 lg:text-4xl">{title}</h1>;
}
