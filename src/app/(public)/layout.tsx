 
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavigationProgress from "@/components/ui/NavigationProgress";
import WhatsAppButton from "@/components/public/WhatsAppButton";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col scroll-smooth">
      <NavigationProgress />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
