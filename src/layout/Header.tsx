import { HelpCircle, LockKeyhole } from 'lucide-react';

const Header = ({ setShowModal }) => {
    return ( 
        <header className="py-6 px-4 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <LockKeyhole className="h-8 w-8 text-orange mr-2" />
            <h1 className="text-2xl md:text-3xl font-bold">Secret Note Scribe</h1>
          </div>
            <button
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-green-600 focus:outline-none"
            aria-label="Help"
            onClick={() => setShowModal(true)}
            >
            <HelpCircle className="h-5 w-5" />
            </button>
        </div>
      </header>
     );
}
 
export default Header;