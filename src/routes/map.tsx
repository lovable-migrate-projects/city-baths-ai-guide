import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import { useMemo, useState } from "react";
import { Header } from "../components/layout/Header";
import { ClientOnly } from "../components/ClientOnly";
import { CompaniesMap } from "../components/map/CompaniesMap";
import { CompanyCard } from "../components/catalog/CompanyCard";
import { companies as ALL } from "../data/companies";
import { Search } from "lucide-react";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Карта бань и саун — Городские бани" },
      { name: "description", content: "Интерактивная карта общественных бань и саун России. Найдите ближайшее заведение." },
    ],
  }),
  component: MapPage,
});

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  height: calc(100vh - 70px);
  @media (min-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: 380px 1fr;
  }
`;

const Sidebar = styled.aside`
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  display: flex; flex-direction: column;
  max-height: 50vh;
  @media (min-width: ${({ theme }) => theme.bp.md}) { max-height: none; }
`;

const SearchBox = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  input {
    width: 100%;
    padding: 12px 14px 12px 40px;
    border-radius: ${({ theme }) => theme.radii.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    font-family: inherit;
    font-size: 14px;
    background: ${({ theme }) => theme.colors.surface};
    &:focus { outline: none; border-color: ${({ theme }) => theme.colors.primary}; }
  }
  svg { position: absolute; left: 30px; top: 50%; transform: translateY(-50%); color: ${({ theme }) => theme.colors.muted}; }
`;

const List = styled.div`
  overflow-y: auto;
  padding: 12px;
  display: flex; flex-direction: column; gap: 10px;
`;

const MapPane = styled.div`
  position: relative;
  min-height: 400px;
  .leaflet-container { height: 100% !important; min-height: 400px; }
`;

function MapPage() {
  const [q, setQ] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!q.trim()) return ALL;
    const lower = q.toLowerCase();
    return ALL.filter((c) =>
      c.name.toLowerCase().includes(lower) ||
      c.city.toLowerCase().includes(lower) ||
      c.address.toLowerCase().includes(lower)
    );
  }, [q]);

  return (
    <>
      <Header />
      <Wrap>
        <Sidebar>
          <SearchBox>
            <Search size={16} />
            <input
              placeholder="Поиск по названию или адресу"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </SearchBox>
          <List>
            {filtered.map((c) => (
              <CompanyCard
                key={c.id}
                company={c}
                highlighted={hovered === c.id}
                onHover={setHovered}
              />
            ))}
            {filtered.length === 0 && (
              <p style={{ padding: 20, color: "#64748b", textAlign: "center" }}>
                Ничего не найдено
              </p>
            )}
          </List>
        </Sidebar>
        <MapPane>
          <ClientOnly fallback={<div style={{ height: "100%", background: "#f7f9fc" }} />}>
            <CompaniesMap companies={filtered} highlightedId={hovered} />
          </ClientOnly>
        </MapPane>
      </Wrap>
    </>
  );
}
