import BottomNav from "@/components/patient/BottomNav";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <main>{children}</main>
      <BottomNav />
    </div>
  );
}
