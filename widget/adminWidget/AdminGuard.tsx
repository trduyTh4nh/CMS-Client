import { redirect } from "next/navigation";

export default function AdminGuard({ user, children }: any) {
    if (!user) redirect("/login");
    if (user.role !== "ADMIN") redirect("/unauthorized");

    return children;
}
