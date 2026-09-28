"use client";

import { uploadImageAction } from "@/actions/upload/upload-image-action";
import { Button } from "@/components/Button";
import { Copy, ImageUpIcon } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";

type ImageUploaderProps = {
  disabled?: boolean;
};

export function ImageUploader({ disabled = false }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState("");

  function copyToClipboard() {
    if (!imageUrl) return;
    navigator.clipboard.writeText(imageUrl);
    toast.success("Link copiado para a área de transferência");
  }

  function handleChooseFile() {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  }
  function handleChange() {
    toast.dismiss();
    if (!fileInputRef.current) {
      setImageUrl("");
      return;
    }

    const fileInput = fileInputRef.current;
    const file = fileInput.files?.[0];

    if (!file) {
      setImageUrl("");
      return;
    }

    // if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
    //   const readableFileSize = IMAGE_UPLOAD_MAX_SIZE / 1024;
    //   toast.error(`Tamanho da imagem excede o limite de ${readableFileSize}KB`);
    // setImageUrl("");
    //   fileInput.value = "";
    //   return;
    // }
    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        fileInput.value = "";
        setImageUrl("");
        return;
      }
      setImageUrl(result.url);
      toast.success("Imagem enviada com sucesso");
    });

    fileInput.value = "";
  }
  return (
    <div className="flex flex-col gap-4 py-4">
      <Button
        variant="default"
        onClick={handleChooseFile}
        type="button"
        className="self-start"
        disabled={isUploading || disabled}
      >
        <ImageUpIcon />
        Subir imagem
      </Button>

      {!!imageUrl && (
        <div className="flex flex-col gap-4 size-6/12 self-center">
          <div>
            <p
              className="text-center hover:underline hover:cursor-pointer hover:text-blue-500"
              onClick={copyToClipboard}
            >
              {imageUrl}
              <Copy className="inline py-0.5  self-end" />
            </p>
          </div>
          {/* eslint-disable-next-line  */}
          <img className="rounded-lg " src={imageUrl} alt="Imagem" />
        </div>
      )}

      <input
        onChange={handleChange}
        ref={fileInputRef}
        className="hidden"
        name="file"
        type="file"
        accept="image/*"
        disabled={isUploading || disabled}
      />
    </div>
  );
}
