"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/common/search-bar";

const searchSchema = z.object({
  query: z.string().min(2, "Enter at least 2 characters.")
});

type SearchFormValues = z.infer<typeof searchSchema>;

type SearchFormProps = {
  onSubmit?: (values: SearchFormValues) => void;
};

export function SearchForm({ onSubmit }: SearchFormProps) {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: ""
    }
  });

  return (
    <form
      className="flex w-full flex-col gap-2 sm:flex-row"
      onSubmit={form.handleSubmit((values) => onSubmit?.(values))}
    >
      <SearchBar
        aria-label="Search website intelligence"
        containerClassName="flex-1"
        placeholder="Search insights, reports, suggestions..."
        {...form.register("query")}
      />
      <Button className="sm:self-start" type="submit">
        <Search className="size-4" />
        Search
      </Button>
    </form>
  );
}
