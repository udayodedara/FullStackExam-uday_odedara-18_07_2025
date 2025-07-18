import Navbar from '@/components/Navbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <main style={{ padding: '1rem', flex: 1 }}>{children}</main>
      </div>
    </div>
  );
}
