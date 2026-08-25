"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { founders, type FounderId } from "@/data/partnership";
import { track } from "@/lib/analytics";

export function FounderGateway() {
  const [active, setActive] = useState<FounderId | null>(null);

  const select = (id: FounderId) => {
    setActive(id);
    track("partner_profile_opened", { partner: id });
  };

  return (
    <div className="founder-gateway" data-active={active ?? "shared"}>
      <div className="founder-choices">
        {founders.map((founder) => {
          const expanded = active === founder.id;
          return (
            <button
              className={`founder-choice founder-choice-${founder.id}`}
              type="button"
              key={founder.id}
              aria-expanded={expanded}
              aria-controls={`founder-profile-${founder.id}`}
              onPointerEnter={() => select(founder.id)}
              onFocus={() => select(founder.id)}
              onClick={() => select(founder.id)}
            >
              <span className="founder-choice-image">
                <Image src={founder.portrait} alt={`${founder.name}, Studio Admiral partner and ${founder.id === "david" ? "strategist" : "visual storyteller"}`} fill sizes="(max-width: 760px) 94vw, 42vw" />
              </span>
              <span className="founder-choice-copy">
                <small>Meet</small><strong>{founder.name}</strong><span>{founder.role}</span><i aria-hidden="true">{expanded ? "−" : "+"}</i>
              </span>
            </button>
          );
        })}
      </div>
      {founders.map((founder) => (
        <section
          className={`founder-profile founder-profile-${founder.id}`}
          id={`founder-profile-${founder.id}`}
          key={founder.id}
          hidden={active !== founder.id}
          aria-label={`${founder.name}'s profile`}
        >
          <div className="founder-profile-art">
            <Image src={founder.panel} alt={`${founder.name}'s Studio Admiral profile`} fill sizes="(max-width: 900px) 94vw, 42vw" />
          </div>
          <div className="founder-profile-copy">
            <p className="eyebrow"><span /> {founder.role}</p>
            <h3>{founder.name}</h3>
            <p className="founder-biography">{founder.biography}</p>
            <h4>Core strengths</h4>
            <ul>{founder.strengths.map((strength) => <li key={strength}>{strength}</li>)}</ul>
            <div className="founder-profile-actions">
              <Link className="button" href={`/contact?partner=${founder.id}`}>Work with {founder.name} <span aria-hidden="true">↗</span></Link>
              <a className="text-link" data-track="email_clicked" href={`mailto:${founder.email}`}>{founder.email} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>
      ))}
      {!active && <p className="founder-gateway-hint">Choose either founder to explore their background, strengths, portfolio lead, and direct contact route.</p>}
    </div>
  );
}
