import { Button } from '@/components/ui/button';

import { LayoutDashboard } from 'lucide-react';

export default function Home() {
  return (
    <main className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <Button variant="outline" size="sm">
          <LayoutDashboard /> Click me
        </Button>
      </div>
    </main>
  );
}
