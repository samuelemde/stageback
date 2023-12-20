import PageContent from "~/components/page-content";
import Search from "~/components/search";

export default async function Page() {
  return (
    <PageContent className="gap-10">
      <Search />
    </PageContent>
  );
}
