const Sidebar = () => {
  return (
    <div className="w-auto px-5 py-10 sm:px-0 sm:w-44 space-x-2 sm:space-x-0  sm:mx-24">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <ul>
        <li className="mb-2">
          <a href="#section1" className="text-blue-500">
            Section 1
          </a>
        </li>
        <li className="mb-2">
          <a href="#section2" className="text-blue-500">
            Section 2
          </a>
        </li>
        <li className="mb-2">
          <a href="#section3" className="text-blue-500">
            Section 3
          </a>
        </li>
        <li className="mb-2">
          <a href="#section4" className="text-blue-500">
            Section 4
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
