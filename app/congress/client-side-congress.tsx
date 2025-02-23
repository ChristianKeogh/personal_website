"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export interface Member {
  bioguideId: string;
  name: string;
  partyName: string;
  state: string;
  terms: { item: { chamber: string; startYear: number; endYear?: number }[] };
  depiction?: { imageUrl?: string };
  url: string;
}

export default function ClientSideCongress({ members }: { members: Member[] }) {
  const [displayedMembers, setDisplayedMembers] = useState<Member[]>([]);

  useEffect(() => {
    console.log(members);
    setDisplayedMembers(members);
  }, [members]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold mb-4">United States Congress</h1>
        {displayedMembers.length === 0 ? (
          <p>No members found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedMembers.map((member) => (
              <MemberCard key={member.bioguideId} member={member} />
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
}

function MemberCard({ member }: { member: Member }) {
  const { name, partyName, state, terms, depiction, url } = member;
  const chamber = terms?.item?.[0]?.chamber || "Unknown";
  const startYear = terms?.item?.[0]?.startYear || "N/A";
  const endYear = terms?.item?.[0]?.endYear
    ? ` - ${terms.item[0].endYear}`
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className=" p-4 rounded-xl shadow-md flex items-center space-x-4"
    >
      <img
        src={depiction?.imageUrl || "/placeholder.png"}
        alt={name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="text-left">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-gray-500">
          {partyName} - {state}
        </p>
        <p className="text-xs">
          {chamber}: {startYear} {endYear}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-xs underline"
        >
          View Profile
        </a>
      </div>
    </motion.div>
  );
}
