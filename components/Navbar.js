import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        borderBottom: "1px solid #ddd"
      }}
    >
      <h1>My App</h1>

      <LanguageSwitcher userEmail="gk4973897@gmail.com" />
    </nav>
  );
}