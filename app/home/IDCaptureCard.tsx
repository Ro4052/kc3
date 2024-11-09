"use client";

import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Input } from "@/components/Input/Input";

export const IDCaptureCard = () => {
  const router = useRouter();

  const [dogId, setDogId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    setSubmitting(true);
    router.push(`/tree/${dogId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card title="Find a family tree" titleLevel={1}>
        <Input
          onChange={setDogId}
          maxLength={36}
          placeholder="Enter KC dog ID"
          value={dogId}
        />
        <Button
          variant="primary"
          type="submit"
          disabled={dogId.length === 0}
          loading={submitting}
        >
          Submit
        </Button>
      </Card>
    </form>
  );
};
