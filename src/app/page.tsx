import { Connect } from "@/components/connect/Connect";
import { AppLayout } from "@/components/layout/AppLayout";
import { Header } from "@/components/layout/Header";


export default function Home() {
  return (
    <AppLayout>
      <Header />
      <Connect />
    </AppLayout>
  );
}
