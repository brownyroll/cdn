export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
        {children}
    </section>
  );
}
