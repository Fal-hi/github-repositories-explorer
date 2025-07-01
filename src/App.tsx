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

function App() {
  const [users, setUsers] = useState([]);
  const [queryName, setQueryName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const result = await searchUsers(query);
      console.log(query, "query");
      setQueryName(query);
      setUsers(result.items || []);
      if (!result.items || result.items.length === 0) {
        alert(`No GitHub users matched "${query}"`);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen flex items-center justify-center overflow-hidden bg-gray-100 px-10">
      <Card className="w-full max-w-xl max-h-2/3 overflow-y-scroll shadow scrollbar-hide relative p-0">
        <CardHeader className="sticky z-[9999] top-0 bg-white py-4 shadow">
          <CardTitle>GitHub User Explorer</CardTitle>
          <CardDescription>
            Search for GitHub users and view their repositories.
          </CardDescription>
          <SearchBar onSearch={handleSearch} />
          <CardDescription>Showing users for "{queryName}"</CardDescription>
        </CardHeader>
        <CardContent className="-mt-6 px-7">
          {users.length > 0 && <UserAccordionList users={users} />}
        </CardContent>
      </Card>
    </main>
  );
}

export default App;
