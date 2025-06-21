import { LibrarySquare } from 'lucide-react';

export function AppLogo() {
  return (
    <div className="flex items-center gap-2 text-xl font-bold text-primary">
      <LibrarySquare className="h-7 w-7" />
      <span>ANSWERS</span>
    </div>
  );
}
