// pages/index.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import ListingCard from '../components/ListingCard'// pages/index.js
import Navvv from '../components/Navvv'  // Change to default import
import 'bootstrap/dist/css/bootstrap.min.css' // Important: Import Bootstrap CSS

export default function Home() {
  const [listings, setListings] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('virtual_tours')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      setListings(data)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCopyLink = async (url) => {
    try {
      await navigator.clipboard.writeText(url)
    } catch (err) {
      console.error('Failed to copy link', err)
    }
  }

  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <Navvv />
      <br />
      <div className="container">
        {listings.map(listing => (
          <ListingCard
            key={listing.id}
            listing={listing}
            onCopyLink={handleCopyLink}
          />
        ))}
      </div>
    </div>
  )
}
