"use server";

import { verifyLoginSession } from "@/lib/login/manage-login";
import { mkdir, writeFile } from "fs/promises";
import { extname, resolve } from "path";

const imageUploadDirectory =
  process.env.NEXT_PUBLIC_IMAGE_UPLOAD_DIRECTORY || "images";
const imageServerUrl = process.env.IMAGE_SERVER_URL;
type uploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData,
): Promise<uploadImageActionResult> {
  const makeResult = ({ url = "", error = "" }) => ({ url, error });

  const isAuthenticated = await verifyLoginSession();

  if (!isAuthenticated) {
    return makeResult({
      error: "Faça login em outra pagina e tente novamente",
    });
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return makeResult({ error: "Arquivo invalidos" });
  }

  // if (!(file.size > IMAGE_UPLOAD_MAX_SIZE)) {
  //   return makeResult({ error: "Arquivo muito grande" });
  // }
  const uploadFullPAth = resolve(process.cwd(), "public", imageUploadDirectory);
  await mkdir(uploadFullPAth, { recursive: true });

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;

  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const fileFullPath = resolve(uploadFullPAth, uniqueImageName);

  await writeFile(fileFullPath, buffer);

  const url = `${imageServerUrl}/${uniqueImageName}`;

  return makeResult({ url });
}
