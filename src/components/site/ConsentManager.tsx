import { useId, useLayoutEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  GA_MEASUREMENT_ID,
  META_PIXEL_ID,
  OPTIONAL_TRACKING_CONFIGURED,
  applyConsent,
} from "@/lib/analytics";
import {
  NO_CONSENT,
  onOpenCookieSettings,
  readConsent,
  saveConsent,
  type ConsentChoice,
} from "@/lib/consent";

const ALL: ConsentChoice = { analytics: true, marketing: true };

/**
 * Cookie banner + settings dialog. Rendered client-side only (choices live in
 * localStorage). The banner appears only when an optional tool is configured;
 * Cookie Settings can always be reopened from the footer.
 */
export function ConsentManager() {
  const [mounted, setMounted] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [draft, setDraft] = useState<ConsentChoice>(NO_CONSENT);
  const [announcement, setAnnouncement] = useState("");
  const returnFocus = useRef<HTMLElement | null>(null);
  const bannerTitle = useId();

  // Layout effect: stored consent must be applied before any page's passive
  // effects try to send events (e.g. the order confirmation).
  useLayoutEffect(() => {
    const stored = readConsent();
    if (stored) applyConsent(stored);
    setDraft(stored ?? NO_CONSENT);
    setBannerOpen(!stored && OPTIONAL_TRACKING_CONFIGURED);
    setMounted(true);
    return onOpenCookieSettings(() => {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setDraft(readConsent() ?? NO_CONSENT);
      setPanelOpen(true);
    });
  }, []);

  function commit(choice: ConsentChoice) {
    saveConsent(choice);
    applyConsent(choice, { sendPageView: true });
    setDraft(choice);
    setBannerOpen(false);
    setPanelOpen(false);
    setAnnouncement(
      choice.analytics || choice.marketing
        ? "Your cookie choices have been saved."
        : "Non-essential cookies are off. Your choice has been saved.",
    );
  }

  function openPanel() {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setPanelOpen(true);
  }

  if (!mounted) return null;

  const tools = [
    GA_MEASUREMENT_ID && "Google Analytics to understand how the site is used",
    META_PIXEL_ID && "the Meta Pixel to measure our advertising",
  ].filter(Boolean);

  return (
    <>
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      {bannerOpen && !panelOpen && (
        <section
          aria-labelledby={bannerTitle}
          className="fixed inset-x-0 bottom-0 z-[55] border-t border-cream/15 bg-forest-deep text-cream shadow-[0_-18px_40px_-24px_oklch(0_0_0/0.8)] print:hidden"
        >
          <div className="container-site flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-3xl text-sm leading-relaxed">
              <p id={bannerTitle} className="font-semibold text-cream">
                Your privacy choices
              </p>
              <p className="mt-1 text-cream/80">
                We use strictly necessary storage to run this site. With your
                permission we&rsquo;d also use {tools.join(" and ")}. These load
                only if you allow them, and you can change your choice any time
                under Cookie Settings in the footer.{" "}
                <Link to="/cookies" className="link-inline">
                  Cookie Policy
                </Link>
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2.5">
              <Button variant="outline" size="sm" onClick={() => commit(ALL)}>
                Accept all
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => commit(NO_CONSENT)}
              >
                Reject non-essential
              </Button>
              <Button variant="outline" size="sm" onClick={openPanel}>
                Customize
              </Button>
            </div>
          </div>
        </section>
      )}

      <Dialog.Root open={panelOpen} onOpenChange={setPanelOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[70] bg-ink/70 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content
            onCloseAutoFocus={(e) => {
              if (returnFocus.current?.isConnected) {
                e.preventDefault();
                returnFocus.current.focus();
              }
            }}
            className="fixed left-1/2 top-1/2 z-[71] flex max-h-[min(92svh,44rem)] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto rounded-[var(--radius-xl)] border border-cream/12 bg-forest-deep text-cream shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0"
          >
            <div className="flex items-start justify-between gap-4 px-6 pt-6 sm:px-8 sm:pt-8">
              <div>
                <Dialog.Title className="type-h3">Cookie settings</Dialog.Title>
                <Dialog.Description className="mt-2 text-sm text-cream/80">
                  Choose which optional tools we may use. Strictly necessary
                  storage is always on because the site needs it to work.
                </Dialog.Description>
              </div>
              <Dialog.Close
                className="-mr-2 -mt-2 grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-md)] hover:bg-cream/[0.06]"
                aria-label="Close cookie settings"
              >
                <X aria-hidden className="h-5 w-5" />
              </Dialog.Close>
            </div>

            <ul className="mt-6 divide-y divide-cream/10 border-y border-cream/10 px-6 sm:px-8">
              <Category
                title="Strictly necessary"
                description="Remembers your cookie choice. Payment pages are run by Stripe on its own site."
              />
              <Category
                title="Analytics"
                description={
                  GA_MEASUREMENT_ID
                    ? "Google Analytics 4: anonymous usage statistics such as pages viewed and form steps reached."
                    : "Google Analytics 4. Not currently active on this site."
                }
                checked={draft.analytics}
                onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
              />
              <Category
                title="Marketing"
                description={
                  META_PIXEL_ID
                    ? "Meta Pixel: measures whether our Facebook and Instagram ads lead to quote requests or orders."
                    : "Meta Pixel. Not currently active on this site."
                }
                checked={draft.marketing}
                onChange={(v) => setDraft((d) => ({ ...d, marketing: v }))}
              />
            </ul>

            <div className="flex flex-col gap-2.5 px-6 py-6 sm:flex-row sm:flex-wrap sm:px-8 sm:pb-8">
              <Button size="sm" onClick={() => commit(draft)}>
                Save my choices
              </Button>
              <Button variant="outline" size="sm" onClick={() => commit(ALL)}>
                Accept all
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => commit(NO_CONSENT)}
              >
                Reject non-essential
              </Button>
            </div>
            <p className="px-6 pb-6 text-sm text-cream/75 sm:px-8 sm:pb-8 -mt-2">
              Details in our{" "}
              <Link
                to="/cookies"
                className="link-inline"
                onClick={() => setPanelOpen(false)}
              >
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="link-inline"
                onClick={() => setPanelOpen(false)}
              >
                Privacy Policy
              </Link>
              .
            </p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function Category({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
}) {
  const id = useId();
  const locked = onChange === undefined;
  return (
    <li className="flex items-start justify-between gap-6 py-5">
      <div>
        <label
          htmlFor={locked ? undefined : id}
          id={`${id}-label`}
          className="font-semibold"
        >
          {title}
        </label>
        <p id={`${id}-desc`} className="mt-1 text-sm text-cream/75">
          {description}
        </p>
      </div>
      {locked ? (
        <span className="mt-0.5 shrink-0 text-sm font-semibold text-gold">
          Always on
        </span>
      ) : (
        <span className="relative mt-0.5 inline-flex shrink-0">
          <input
            id={id}
            type="checkbox"
            role="switch"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            aria-describedby={`${id}-desc`}
            className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          />
          <span
            aria-hidden
            className="flex h-7 w-12 items-center rounded-full border border-cream/35 bg-cream/10 px-0.5 transition-colors peer-checked:border-gold peer-checked:bg-gold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-gold [&>span]:transition-transform peer-checked:[&>span]:translate-x-5 peer-checked:[&>span]:bg-forest-deep"
          >
            <span className="h-5 w-5 rounded-full bg-cream" />
          </span>
        </span>
      )}
    </li>
  );
}
