"use client";

import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../primitives/Button/Button";
import { Card } from "../primitives/Card/Card";
import { Input } from "../primitives/Input/Input";

export const IDCaptureCard = () => {
  const router = useRouter();

  const [dogId, setDogId] = useState("");

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    router.push(`/tree/${dogId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="text-center" title="Find a family tree" titleLevel={1}>
        <Input
          onChange={setDogId}
          maxLength={36}
          placeholder="Enter KC dog ID"
          value={dogId}
        />
        <Button variant="primary" type="submit" disabled={dogId.length === 0}>
          Submit
        </Button>
      </Card>
    </form>
  );
};
