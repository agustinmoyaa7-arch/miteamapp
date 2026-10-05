"use client"

import { LogoMark } from "@/components/logo"
import { MENU, useActiveSection } from "@/components/use-active-section"
import BranchedMenu from "@/components/ui/branched-menu"
import { goToSection } from "@/lib/section-nav"
import { SITE_NAME } from "@/lib/site"

export function SideNav() {
  const [active, setActive] = useActiveSection()

  return (
    <div className="sticky top-24 flex flex-col gap-10">
      <a
        href="#top"
        onClick={(event) => {
          event.preventDefault()
          goToSection("top")
        }}
        aria-label={`${SITE_NAME}: volver arriba`}
        className="intro block w-fit rounded-xl transition-transform duration-500 hover:rotate-[-6deg] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-4"
      >
        <LogoMark className="size-16" />
      </a>
      <div className="intro" style={{ "--d": "200ms" } as React.CSSProperties}>
        <BranchedMenu
          items={MENU}
          defaultOpen={[0, 1]}
          value={active}
          onSelect={(id) => {
            setActive(id)
            goToSection(id)
          }}
          color="#0A0A0A"
          accentColor="#2f9e5f"
          lineColor="rgb(0 0 0 / 0.12)"
          width={200}
          rowHeight={34}
          indent={38}
          fontSize={13}
        />
      </div>
    </div>
  )
}
