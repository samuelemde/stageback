import PageWithAuth from "~/components/page-with-auth";
import ComingSoon from "~/components/coming-soon";
import { Sidebar } from "~/components/sidebar";

export default function Page() {
  return (
    <Sidebar>
      <PageWithAuth>
        <ComingSoon />
      </PageWithAuth>
    </Sidebar>
  );
}
