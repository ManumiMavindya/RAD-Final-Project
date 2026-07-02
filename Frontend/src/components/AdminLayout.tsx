import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ children }: any) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="max-w-7xl mx-auto p-8">
        {children}
      </main>
    </div>
  );
};
export default AdminLayout;