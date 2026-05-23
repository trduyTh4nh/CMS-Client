import { getAllTopic } from "@/services/topic/topic-sever.service";
import HeaderClient from "./HeaderClient";

export default async function Header({ user, headerType }: any) {
  const topics = await getAllTopic();

  return (
    <HeaderClient
      topics={topics}
      user={user}
      headerType={headerType}
    />
  );
}