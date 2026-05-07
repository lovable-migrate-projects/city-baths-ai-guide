import { useEffect } from 'react'
import styled from 'styled-components'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Company } from '../../types'

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  min-height: 480px;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  .leaflet-container {
    width: 100%;
    height: 100%;
    min-height: 480px;
  }
`

const PopupBody = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  min-width: 200px;
  strong {
    display: block;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 14px;
    margin-bottom: 4px;
  }
  p {
    margin: 0;
    font-size: 12.5px;
    color: ${({ theme }) => theme.colors.muted};
  }
  a {
    display: inline-block;
    margin-top: 6px;
    font-size: 13px;
    font-weight: 600;
  }
`

const makeIcon = (highlighted: boolean) =>
  L.divIcon({
    className: 'city-bani-marker',
    html: `<div style="
      width:${highlighted ? 36 : 28}px;height:${highlighted ? 36 : 28}px;
      background:${highlighted ? '#125ea8' : '#1976d2'};
      border:3px solid white;border-radius:50%;
      box-shadow:0 4px 14px rgba(25,118,210,.45);
      display:grid;place-items:center;color:white;font-weight:700;font-size:13px;
      transition:all .15s;
    ">♨</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  })

function FitBounds({ companies }: { companies: Company[] }) {
  const map = useMap()
  useEffect(() => {
    if (companies.length === 0) return
    const bounds = L.latLngBounds(
      companies.map((c) => [c.lat, c.lng] as [number, number]),
    )
    map.fitBounds(bounds, { padding: [40, 40] })
  }, [companies, map])
  return null
}

type Props = {
  companies: Company[]
  highlightedId?: string | null
}

export function CompaniesMap({ companies, highlightedId }: Props) {
  return (
    <Wrap>
      <MapContainer center={[55.75, 37.62]} zoom={10} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds companies={companies} />
        {companies.map((c) => (
          <Marker
            key={c.id}
            position={[c.lat, c.lng]}
            icon={makeIcon(highlightedId === c.id)}
          >
            <Popup>
              <PopupBody>
                <strong>{c.name}</strong>
                <p>{c.address}</p>
                <p>
                  ★ {c.rating.toFixed(1)} •{' '}
                  {c.isOpenNow ? 'Открыто' : 'Закрыто'}
                </p>
                <a href={`/companies/${c.id}/`}>Подробнее →</a>
              </PopupBody>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Wrap>
  )
}
