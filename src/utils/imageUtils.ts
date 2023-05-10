function dataURLToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(";base64,");
  const contentType = parts[0].split(":")[1];
  const b64 = atob(parts[1]);
  let n = b64.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = b64.charCodeAt(n);
  }
  return new Blob([u8arr], { type: contentType });
}

export { dataURLToBlob };
