
"use client";

import { useState } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { Camera } from "lucide-react";

interface ProfilePhotoProps {
  initialPhoto?: string;
  name?: string;
  size?: number;
}

export default function ProfilePhoto({
  initialPhoto,
  name = "Usuário",
  size = 42,
}: ProfilePhotoProps) {
  const [photo, setPhoto] = useState(initialPhoto);
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);
    setCrop({ x: 0, y: 0 });
    setZoom(1);

    event.target.value = "";
  }
  function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
  event.preventDefault();
  setIsDragging(false);

  const file = event.dataTransfer.files?.[0];

  if (!file) return;

  handleFileChange({
    target: {
      files: [file],
      value: "",
    },
  } as unknown as React.ChangeEvent<HTMLInputElement>);
}

function handleDragOver(event: React.DragEvent<HTMLLabelElement>) {
  event.preventDefault();
  setIsDragging(true);
}

  async function handleSave() {
    if (!image || !croppedArea) return;

    const result = await getCroppedImage(image, croppedArea);

    setPhoto(result);
    URL.revokeObjectURL(image);
    setImage(null);
  }

  function handleCancel() {
    if (image) URL.revokeObjectURL(image);

    setImage(null);
  }

  function handleRemove() {
    setPhoto(undefined);
    handleCancel();
  }

  return (
    <>
      <label
        className={`relative block cursor-pointer overflow-hidden rounded-full border border-slate-600 hover:opacity-80 ${isDragging ? "ring-2 ring-emerald-500" : ""}`}
        style={{ width: size, height: size }}
        title="Alterar foto de perfil"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={() => setIsDragging(false)}
      >
        {photo ? (
          <Image
            src={photo}
            alt={`Foto de ${name}`}
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-slate-700 text-white">
            <Camera className="h-5 w-5" aria-hidden="true" />
          </span>
        )}

        <input
          type="file"
          accept="image/*"
          className="hidden"
            onChange={handleFileChange}
        />
      </label>

      {image && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-sm rounded-xl bg-slate-900 p-5 text-white">
            <h2 className="mb-4 text-lg font-semibold">
              Ajustar foto de perfil
            </h2>

            <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-xl bg-black">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, area) =>
                  setCroppedArea(area)
                }
              />
            </div>

            <label className="mt-5 block text-sm text-slate-300">
              Ajustar enquadramento
            </label>

            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(event) =>
                setZoom(Number(event.target.value))
              }
              className="mt-2 w-full"
            />

            <div className="mt-5 flex justify-between gap-3">
              <button
                onClick={handleCancel}
                className="rounded-lg bg-slate-700 px-4 py-2 text-sm"
              >
                Cancelar
              </button>

              {photo && (
                <button
                  onClick={handleRemove}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm"
                >
                  Remover
                </button>
              )}

              <button
                onClick={handleSave}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

async function getCroppedImage(
  imageSrc: string,
  area: Area
): Promise<string> {
  const image = new window.Image();
  image.src = imageSrc;

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) throw new Error("Não foi possível recortar a imagem.");

  canvas.width = area.width;
  canvas.height = area.height;

  context.drawImage(
    image,
    area.x,
    area.y,
    area.width,
    area.height,
    0,
    0,
    area.width,
    area.height
  );

  return canvas.toDataURL("image/jpeg", 0.9);
}
