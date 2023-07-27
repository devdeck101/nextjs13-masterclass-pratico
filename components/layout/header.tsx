import CartButton from "./cart-button";
import Logo from "./logo";
import UserNav from "./user-nav";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 shadow">
      <div className="container ms-auto p-4 flex items-center justify-between">
        <Logo />
        <div className="flex items-center justify-center space-x-4">
          <CartButton />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
