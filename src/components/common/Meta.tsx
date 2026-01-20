import { Helmet } from "react-helmet-async";

type MetaProps = {
  title: string;
  description?: string;
};

export default function Meta({ title, description }: MetaProps) {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
}
