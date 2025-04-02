import ResetPasswordComp from "@/components/auth-components/ResetPasswordComp";

export default async function Page({ params }: { params: { token: string } }) {
  return (
    <section className="py-12">
      <ResetPasswordComp token={params.token} />
    </section>
  );
}
