import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "../components/Dashboard/Dashboard";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Dashboard />;
}
