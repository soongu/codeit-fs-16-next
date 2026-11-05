// ~/next-lab/app/p3-14/practice2/GuestbookForm.jsx
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function addEntry(text) {
  const response = await fetch("/p3-15/practice3/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (response.status === 400) {
    const { message } = await response.json();
    throw new Error(message);
  }

  if (!response.ok) {
    throw new Error("글을 남기지 못했어요. 잠시 뒤에 다시 남겨 주세요.");
  }

  return response.json();
}

export default function GuestbookForm() {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: addEntry,
    onMutate: async (text) => {
      await queryClient.cancelQueries({ queryKey: ['guestbook'] });
      const previousEntries = queryClient.getQueryData(['guestbook']);

      queryClient.setQueryData(['guestbook'], (entries) => [
        ...entries,
        { id: Date.now(), text, pending: true },
      ]);

      return { previousEntries };
    },
    onError: (error, text, onMutateResult) => {
      queryClient.setQueryData(['guestbook'], onMutateResult.previousEntries);
    },
    onSuccess: () => {
      setText('');
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['guestbook'] });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(text);
  };

  const handleChange = (event) => {
    setText(event.target.value);
    reset();
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <input className="rounded border px-2" value={text} onChange={handleChange} />
        <button type="submit" className="rounded border px-2" disabled={isPending || text.trim() === ""}>
          {isPending ? "남기는 중…" : "남기기"}
        </button>
      </div>
      {error && <p className="mt-2 text-red-500">{error.message}</p>}
    </form>
  );
}
