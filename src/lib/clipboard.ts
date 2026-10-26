/**
 * Copia texto al portapapeles. Si la Clipboard API no está disponible
 * (sitio servido sin HTTPS), usa un método alternativo compatible.
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Continúa con el método alternativo.
  }

  const previouslyFocused = document.activeElement as HTMLElement | null;
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch {
    copied = false;
  }
  area.remove();
  previouslyFocused?.focus({ preventScroll: true });
  return copied;
}
