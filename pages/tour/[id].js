import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabase'
import LoadingScreen from '../../components/LoadingScreen'
import Head from 'next/head'

export default function TourPage() {
  const router = useRouter()
  const { id } = router.query
  const [listing, setListing] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'auto'
    document.body.style.position = 'relative'

    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
    }
  }, [])

  useEffect(() => {
    if (id) fetchListingDetails()
  }, [id])

  const fetchListingDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('virtual_tours')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setListing(data)
      setIsLoading(false)
    } catch (err) {
      console.error('Error fetching listing', err)
      router.push('/')
    }
  }

  const handleIframeLoad = (e) => {
    try {
      const iframeDoc = e.target.contentDocument || e.target.contentWindow.document;

      // Remove potential interfering styles
      const styleElements = iframeDoc.getElementsByTagName('style');
      while (styleElements.length > 0) {
        styleElements[0].parentNode.removeChild(styleElements[0]);
      }

      // Remove inline styles from body and other elements
      const removeInlineStyles = (element) => {
        if (element) {
          element.removeAttribute('style');
          const children = element.getElementsByTagName('*');
          for (let child of children) {
            child.removeAttribute('style');
          }
        }
      };

      removeInlineStyles(iframeDoc.body);
    } catch (error) {
      console.error('Error modifying iframe content:', error);
    }
  }

  if (isLoading) return <LoadingScreen />
  if (!listing) return null

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'calc(100vh - 56px)', // Adjust height to leave space for bottom nav
          margin: 0,
          padding: 0,
          zIndex: 9999
        }}
      >
        <iframe
          src={listing.virtual_tour_url}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
            margin: 0,
            padding: 0,
            overflow: 'hidden'
          }}
          onLoad={handleIframeLoad}
          title="Virtual Tour"
          allowFullScreen
          frameBorder="0"
        />
      </div>
    </>
  )
}
