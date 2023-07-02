export function getRandomElement<T>(arr: T[]): T | undefined {
  if (arr.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export function isUrl(input: string): boolean {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(input);
}

export function normalizeUrl(input: string): string | undefined {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  if (!urlRegex.test(input)) {
    if (/^[^:\/?#.]+:/.test(input)) {
      return undefined; // Invalid URL with protocol prefix
    }
    input = "https://" + input;
  }

  return input;
}


export function isNewCollection(createdAt: string | Date) {
  const thresholdDuration = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
  const currentDate = new Date().getTime();
  const collectionDate = new Date(createdAt).getTime();

  return currentDate - collectionDate < thresholdDuration;
}
export function isUpdatedCollection(updatedAt: string | Date) {
  const thresholdDuration = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
  const currentDate = new Date().getTime();
  const collectionDate = new Date(updatedAt).getTime();

  return currentDate - collectionDate < thresholdDuration;
}


export function checkVideoUrl(url: string): { url: string, type: 'youtube' | 'vimeo' | 'normal' } | undefined {
  // Check if it is a YouTube video URL
  if (url.match(/^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=.+/)) {
    return { url, type: 'youtube' };
  }

  // Check if it is a Vimeo video URL
  if (url.match(/^(https?:\/\/)?(www\.)?vimeo\.com\/\d+/)) {
    return { url, type: 'vimeo' };
  }

  // Check if it is a normal video URL (file extension)
  const fileExtension = url.split('.').pop();
  const videoExtensions = ['mp4', 'avi', 'mov']; // Add more extensions if needed
  if (fileExtension && videoExtensions.includes(fileExtension.toLowerCase())) {
    return { url, type: 'normal' };
  }

  return undefined;
}

export function extractYouTubeVideoId(url: string): string | undefined {
  const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})$/;
  const match = url.match(regex);

  if (match && match.length === 2) {
    return match[1];
  }

  return undefined;
}


export function numFormat(num: number|bigint) {
  return Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(num)
}
