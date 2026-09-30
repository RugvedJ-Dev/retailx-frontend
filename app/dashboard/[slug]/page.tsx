type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ThreadRoute({ params }: Props) {
  const resolvedParams = await params;
  //Now preparing to work on it after merging Dashboard_logic_uptil_thread_creation_and_slug with main
  return (
    <div>Params are {resolvedParams.slug}</div>
  );
}
