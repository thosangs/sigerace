"use client";

import Link from "next/link";
import {
  IconFlagCheckered,
  CalendarIcon,
  ChevronRightIcon,
  BookIcon,
  QrCodeIcon,
  IconGift,
  IconYoutube,
} from "@/components/ui/icons";
import Image from "next/image";
import logo_text_image from "@/public/logo-text.webp";
import qr_image from "@/public/qr.webp";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function Home() {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      <Image
        src={logo_text_image}
        placeholder="blur"
        className="m-0 py-5 mt-5 sm:mt-11 pb-2 sm:w-10/12 md:w-3/12"
        alt="sigerace"
      />
      <nav className="w-full max-w-md grid gap-2 px-4 mt-6">
        <Link
          href="/livescore"
          className="bg-gradient-to-r from-background via-background to-background/90 text-secondary-foreground rounded-lg p-4 flex items-center justify-between hover:from-primary/10 hover:via-accent/20 hover:to-accent/10 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-all duration-300"
          prefetch={true}
        >
          <div className="flex items-center gap-2">
            <IconFlagCheckered className="w-6 h-6" />
            <div className="flex flex-col">Live Hasil Race</div>
          </div>
          <div className="relative">
            <ChevronRightIcon className="w-6 h-6" />
            <span className="absolute -top-3 -right-4 transform -translate-x-1/2 flex h-3 w-3 z-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          </div>
        </Link>
        <Link
          href="https://www.youtube.com/@PLABandarLampung"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-background via-background to-background/90 text-secondary-foreground rounded-lg p-4 flex items-center justify-between hover:from-primary/10 hover:via-accent/20 hover:to-accent/10 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <IconYoutube className="w-6 h-6" />
            <span>Live Streaming</span>
          </div>
          <div className="relative">
            <ChevronRightIcon className="w-6 h-6" />
            <span className="absolute -top-3 -right-4 transform -translate-x-1/2 flex h-3 w-3 z-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          </div>
        </Link>
        <Link
          href="/peraturan"
          className="bg-gradient-to-r from-background via-background to-background/90 text-secondary-foreground rounded-lg p-4 flex items-center justify-between hover:from-primary/10 hover:via-accent/20 hover:to-accent/10 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-all duration-300"
          prefetch={false}
        >
          <div className="flex items-center gap-2">
            <BookIcon className="w-6 h-6" />
            <span>Peraturan</span>
          </div>
          <ChevronRightIcon className="w-6 h-6" />
        </Link>
        <Link
          href="/jadwal"
          className="bg-gradient-to-r from-background via-background to-background/90 text-secondary-foreground rounded-lg p-4 flex items-center justify-between hover:from-primary/10 hover:via-accent/20 hover:to-accent/10 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-all duration-300"
          prefetch={false}
        >
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-6 h-6" />
            <span>Jadwal & Lokasi Race</span>
          </div>
          <ChevronRightIcon className="w-6 h-6" />
        </Link>
        <Link
          href="/sponsor"
          className="bg-background text-secondary-foreground rounded-lg p-4 flex items-center justify-between hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          prefetch={false}
        >
          <div className="flex items-center gap-2">
            <IconGift className="w-6 h-6" />
            <span>Sponsor</span>
          </div>
          <ChevronRightIcon className="w-6 h-6" />
        </Link>
        <button
          onClick={() => setShowQR(true)}
          className="bg-gradient-to-r from-background via-background to-background/90 text-secondary-foreground rounded-lg p-4 flex items-center justify-between hover:from-primary/10 hover:via-accent/20 hover:to-accent/10 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <QrCodeIcon className="w-6 h-6" />
            <span>QR Code</span>
          </div>
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </nav>

      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="sm:max-w-md bg-gray-300">
          <div className="">
            <Image
              src={qr_image}
              alt="QR Code"
              className="w-full h-auto"
              placeholder="blur"
            />
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowQR(false)}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Tutup
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
