import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 pt-20 lg:pt-8 overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
