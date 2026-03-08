// Header.tsx (SERVER COMPONENT)
import HeaderNavClient from "./HeaderNavClient";
import Logo from "./Logo";

export default function Header({
  user,
  headerType,
}: {
  user: any;
  headerType?: string;
}) {
  const isAdmin = headerType === "admin";
  const isAuthenticated = !!user;


  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between glass">

      <Logo />
      <HeaderNavClient
        isAdmin={isAdmin}
        isAuthenticated={isAuthenticated}
      // role={user?.role}
      />
    </header>
  );
}
