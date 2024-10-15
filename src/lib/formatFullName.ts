export default function formatFullName(fullName: string | null | undefined) {
  return fullName && fullName !== ',' ? fullName.replaceAll(',', ' ') : 'بدون نام';
}
