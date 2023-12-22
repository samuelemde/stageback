import CardPage from "~/components/card-page";

export default async function Page() {
  return (
    <CardPage>
      <div className="text-4xl font-bold text-accent-foreground">
        Check your email
      </div>
      <p>A sign in link has been sent to your email address.</p>
    </CardPage>
  );
}
