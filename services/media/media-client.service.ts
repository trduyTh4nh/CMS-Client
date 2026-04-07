import { clientFetcher } from "@/lib/clientFetcher";

export async function uploadMedia(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/media/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload media");
  }

  const data = await res.json();
  return data.metadata.url;
}
