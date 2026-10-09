import { MapPin } from "lucide-react";
import { Img } from "@/components/site/Img";
import { media } from "@/content/mediaCatalog";
import {
  HAS_COMPLETED_PROJECTS,
  type PortfolioProject,
} from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { typeset } from "@/lib/typeset";

export function ProjectCard({
  project,
  onOpen,
  className,
}: {
  project: PortfolioProject;
  onOpen?: () => void;
  className?: string;
}) {
  const Body = (
    <>
      <div className="media-frame aspect-[4/3] rounded-none">
        <Img
          image={media(project.images[0])}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="media-zoom"
        />
        <div className="absolute left-4 top-4">
          <span className="badge badge-dark">
            {project.division === "outdoor" ? "Outdoor" : "Interior"} ·{" "}
            {project.category}
            {project.isPlaceholder &&
              HAS_COMPLETED_PROJECTS &&
              " · Project type"}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6 text-left">
        {project.location && (
          <p className="mb-2 flex items-center gap-2 text-sm text-cream/75">
            <MapPin aria-hidden className="h-4 w-4 text-gold" />
            {project.location}
          </p>
        )}
        <h3 className="type-h4 text-[1.45rem]">
          {typeset(project.title, { phrasesFrom: "lg" })}
        </h3>
        <p className="mt-2 text-[0.9375rem] text-muted-dark">
          {project.outcome}
        </p>
      </div>
    </>
  );
  const cls = cn(
    "group card-dark card-interactive flex h-full flex-col overflow-hidden",
    className,
  );
  if (onOpen) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className={cls}
        aria-haspopup="dialog"
      >
        {Body}
        <span className="sr-only">View project details</span>
      </button>
    );
  }
  return <article className={cls}>{Body}</article>;
}
