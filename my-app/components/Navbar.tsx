import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-800">
      <h1 className="text-xl font-bold">Doctor Appointment System</h1>
      <DarkModeToggle />
    </nav>
  );
};

export default Navbar;
