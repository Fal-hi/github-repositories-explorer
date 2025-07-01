import "./App.css";
import { SearchBar } from "@/components/SearchBar";
import { searchUsers } from "@/hooks/useGithubApi";
import { useState } from "react";
import { UserAccordionList } from "@/components/RepositoryList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  const [users, setUsers] = useState([]);
  const [queryName, setQueryName] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const result = await searchUsers(query);
      if (result.total_count === 0) {
        setUserNotFound(true);
      } else {
        setQueryName(query);
        setUsers(result.items || []);
        setUserNotFound(false);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen flex items-center justify-center overflow-hidden bg-gray-100 px-4">
      <Card className="w-full max-w-xl max-h-2/3 overflow-y-scroll shadow scrollbar-hide relative p-0">
        <CardHeader className="sticky z-[9999] top-0 bg-white py-4 shadow">
          <CardTitle>GitHub Repositories Explorer</CardTitle>
          <CardDescription>
            Search for GitHub users and view their repositories.
          </CardDescription>
          <SearchBar onSearch={handleSearch} />
          {users.length > 0 && (
            <CardDescription>Showing users for "{queryName}"</CardDescription>
          )}
        </CardHeader>
        <CardContent className="-mt-6 px-7">
          {userNotFound ? (
            <CardDescription className="text-center my-10">
              User not found
            </CardDescription>
          ) : loading ? (
            <div className="flex flex-col gap-2 my-6">
              <Skeleton className="h-6" />
              <Skeleton className="h-6" />
            </div>
          ) : (
            users.length > 0 && <UserAccordionList users={users} />
          )}
        </CardContent>
      </Card>
    </main>
  );
}

export default App;
