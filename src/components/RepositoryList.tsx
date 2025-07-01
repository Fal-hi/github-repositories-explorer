import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getUserRepos } from "@/hooks/useGithubApi";
import { useState } from "react";
import { GithubRepo, UserProps } from "@/interface/RepoList";
import { Star } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export function UserAccordionList({ users }: UserProps) {
  const [repoMap, setRepoMap] = useState<Record<string, GithubRepo[]>>({});
  const [loading, setLoading] = useState(false);
  const handleAccordionOpen = async (username: string) => {
    if (repoMap[username]) return;
    setLoading(true);
    try {
      const repos = await getUserRepos(username);
      setRepoMap((prev) => ({ ...prev, [username]: repos }));
    } catch (err) {
      console.error("Failed to fetch repos:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Accordion type="single" collapsible onValueChange={handleAccordionOpen}>
      {users.map((user) => (
        <AccordionItem key={user.id} value={user.login}>
          <AccordionTrigger>
            <div className="flex gap-2 items-center">
              <img
                className="w-6 h-auto rounded-full shadow-2xl"
                src={user.avatar_url}
                loading="lazy"
              />
              <p>{user.login}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {loading ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5" />
                <Skeleton className="h-16" />
              </div>
            ) : repoMap[user.login]?.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {repoMap[user.login].map((repo) => (
                  <li
                    key={repo.id}
                    className="w-full py-2 px-3 border shadow-2xs rounded"
                  >
                    <div className="flex justify-between items-center">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        className="underline font-medium"
                      >
                        {repo.name}
                      </a>
                      <div className="flex gap-2 items-center">
                        <p>{repo.stargazers_count}</p>
                        <Star className="w-4 h-auto text-black" />
                      </div>
                    </div>
                    <p className="mt-2">{repo.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No repositories found.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
