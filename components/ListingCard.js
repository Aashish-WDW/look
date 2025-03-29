import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Card, Button } from 'react-bootstrap'

// Dynamically import client-side only icons
const Copy = dynamic(() => import('lucide-react').then(mod => mod.Copy), { ssr: false })
const MapPin = dynamic(() => import('lucide-react').then(mod => mod.MapPin), { ssr: false })
const Calendar = dynamic(() => import('lucide-react').then(mod => mod.Calendar), { ssr: false })
const ArrowRightCircle = dynamic(() => import('lucide-react').then(mod => mod.ArrowRightCircle), { ssr: false })

export default function ListingCard({ listing, onCopyLink }) {
  const [copied, setCopied] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleCopyLink = () => {
    if (!isClient) return

    const localTourUrl = `${window.location.origin}/tour/${listing.id}`

    navigator.clipboard.writeText(localTourUrl).then(() => {
      setCopied(true)
      if (onCopyLink) {
        onCopyLink(localTourUrl)
      }
      setTimeout(() => setCopied(false), 2000)
    }).catch(err => {
      console.error('Failed to copy: ', err)
    })
  }

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <Card.Title className="mb-0 text-truncate" style={{ maxWidth: '70%' }}>
            {listing.title}
          </Card.Title>
          <span className="badge bg-primary">
            {listing.bhk}BHK | {listing.type}
          </span>
        </div>

        <Card.Text className="text-muted">
          <div className="d-flex align-items-center mb-2">
            {isClient && <MapPin className="me-2 text-primary" size={20} />}
            <span className="text-truncate">{listing.landmark}</span>
          </div>
          <div className="d-flex align-items-center">
            {isClient && <Calendar className="me-2 text-success" size={20} />}
            <span>Posted: {new Date(listing.created_at).toLocaleDateString()}</span>
          </div>
        </Card.Text>

        <div className="d-flex gap-3">
          <Button
            variant={copied ? "success" : "outline-primary"}
            className="w-100 d-flex align-items-center justify-content-center"
            onClick={handleCopyLink}
            disabled={!isClient}
          >
            {isClient && <Copy className="me-2" size={20} />}
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>

          <Button
            variant="outline-secondary"
            className="w-100 d-flex align-items-center justify-content-center"
            href={`/tour/${listing.id}`}
          >
            {isClient && <ArrowRightCircle className="me-2" size={20} />}
            View Tour
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
