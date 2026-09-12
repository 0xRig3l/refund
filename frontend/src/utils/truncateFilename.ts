export function truncateFilename(filename: string, maxLength = 15) {
  const extIndex = filename.lastIndexOf(".");

  if (extIndex === -1) {
    return filename.length > maxLength
      ? filename.slice(0, maxLength - 3) + "..."
      : filename;
  }

  const name = filename.slice(0, extIndex);
  const ext = filename.slice(extIndex);
  const allowedNameLength = maxLength - ext.length;

  if (name.length <= allowedNameLength) {
    return filename;
  }

  return name.slice(0, allowedNameLength - 3) + "..." + ext;
}
