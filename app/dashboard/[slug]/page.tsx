type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ThreadRoute({ params }: Props) {
  const resolvedParams = await params;

  return (
    <div>Params are {resolvedParams.slug}</div>
  );
}
