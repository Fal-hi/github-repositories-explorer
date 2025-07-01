import { FormValues, SearchBarProps } from "@/interface/Components";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export function SearchBar({ onSearch }: SearchBarProps) {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    onSearch(data.username);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="username"
          rules={{ required: "Username is required" }}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter GitHub Username"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      form.handleSubmit(onSubmit)();
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Search</Button>
      </form>
    </Form>
  );
}
