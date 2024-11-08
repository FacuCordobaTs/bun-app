import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { api } from "./api";
import { useQuery } from "@tanstack/react-query";

async function getTotalSpent() {
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) {
    throw new Error('server error')
  }
  const data = await res.json();
  return data;
}

function App() {
  const { isPending, error, data  } = useQuery({ queryKey: ['get-total-pent'], queryFn: getTotalSpent});

  if (isPending) return 'loading...';

  if (error) return "An error has ocurred: " + error.message;

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Total spent</CardTitle>
        <CardDescription>The total amount you 've spent</CardDescription>
      </CardHeader>
      <CardContent>
        {
        isPending
        ? "..."
        : data.total
        }
      </CardContent>
    </Card>
  )
}

export default App
