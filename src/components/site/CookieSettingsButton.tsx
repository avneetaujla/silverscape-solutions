import { Button } from "@/components/ui/button";
import { openCookieSettings } from "@/lib/consent";

export function CookieSettingsButton({ inline = false }: { inline?: boolean }) {
  if (inline) {
    return (
      <button
        type="button"
        onClick={openCookieSettings}
        className="link-inline font-medium"
      >
        Cookie Settings
      </button>
    );
  }
  return (
    <Button type="button" variant="lightOutline" onClick={openCookieSettings}>
      Open Cookie Settings
    </Button>
  );
}
