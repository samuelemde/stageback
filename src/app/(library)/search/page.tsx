import Search from "~/components/search";
import PageWithAuth from "~/components/page-with-auth";

export default async function Page() {
  return (
    <PageWithAuth>
      <Search />
    </PageWithAuth>
  );
}
