import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Input } from "@/components/Input/Input";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2">
        <Card className="text-center" title="Find a family tree" titleLevel={1}>
          <Input placeholder="Enter KC dog ID" />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Card>
      </main>
    </div>
  );
}
