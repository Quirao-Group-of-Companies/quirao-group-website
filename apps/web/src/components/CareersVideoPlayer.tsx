'use client';

import { useState } from 'react';

interface Props {
  url: string;
}

export default function CareersVideoPlayer({ url }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  const getEmbedUrl = (videoUrl: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = videoUrl.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return videoUrl;
  };

  if (isPlaying) {
    return (
      <section className="relative aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-black">
        <iframe
          src={getEmbedUrl(url)}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </section>
    );
  }

  return (
    <button
      type="button"
      aria-label="Play Video"
      className="relative w-full aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden bg-gray-200 shadow-2xl group cursor-pointer border-none p-0 block"
      onClick={() => {
        setIsPlaying(true);
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
        <div className="w-20 h-14 bg-[#FF0000] rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
        </div>
      </div>
    </button>
  );
}
